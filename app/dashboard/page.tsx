import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import SignalCard from "@/components/SignalCard";
import { generateSignals } from "@/lib/ai";

const mockTrades = [
    { id: "1", asset: "BTC/USD", type: "BUY", amount: 0.5, entry: 44200, current: 46800, pnl: "+$1,300", status: "OPEN" },
    { id: "2", asset: "ETH/USD", type: "SELL", amount: 2.0, entry: 3100, current: 2890, pnl: "+$420", status: "OPEN" },
    { id: "3", asset: "EUR/USD", type: "BUY", amount: 1000, entry: 1.085, current: 1.091, pnl: "+$60", status: "CLOSED" },
];

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    const signals = generateSignals().slice(0, 3);
    const subStatus = (session.user as any)?.subscriptionStatus ?? "FREE";

    return (
        <div className="flex min-h-screen bg-[#060b17]">
            <Sidebar />
            <main className="flex-1 ml-60 pt-16 p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white">
                        Welcome back, {session.user?.name?.split(" ")[0]} 👋
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Here&apos;s your portfolio overview for today
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Portfolio Value", value: "$48,320.50", change: "+3.2%", up: true },
                        { label: "Active Trades", value: "2", change: "Open positions", up: true },
                        { label: "Today's P&L", value: "+$1,720", change: "+3.7%", up: true },
                        { label: "Win Rate", value: "76%", change: "Last 30 days", up: true },
                    ].map((s) => (
                        <div key={s.label} className="bg-[#0d1424] border border-white/5 rounded-xl p-5">
                            <p className="text-gray-400 text-xs mb-1">{s.label}</p>
                            <p className="text-2xl font-bold text-white">{s.value}</p>
                            <p className={`text-xs mt-1 ${s.up ? "text-green-400" : "text-red-400"}`}>
                                {s.change}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Active Trades */}
                    <div className="lg:col-span-2 bg-[#0d1424] border border-white/5 rounded-xl p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Active Trades</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-gray-400 border-b border-white/5">
                                        <th className="pb-3 text-left">Asset</th>
                                        <th className="pb-3 text-left">Type</th>
                                        <th className="pb-3 text-right">Entry</th>
                                        <th className="pb-3 text-right">P&L</th>
                                        <th className="pb-3 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {mockTrades.map((trade) => (
                                        <tr key={trade.id} className="hover:bg-white/2 transition-colors">
                                            <td className="py-3 font-medium text-white">{trade.asset}</td>
                                            <td className="py-3">
                                                <span className={`text-xs px-2 py-1 rounded-md font-bold ${trade.type === "BUY" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                                                    {trade.type}
                                                </span>
                                            </td>
                                            <td className="py-3 text-right text-gray-300">{trade.entry}</td>
                                            <td className="py-3 text-right text-green-400 font-semibold">{trade.pnl}</td>
                                            <td className="py-3 text-right">
                                                <span className={`text-xs ${trade.status === "OPEN" ? "text-cyan-400" : "text-gray-400"}`}>
                                                    {trade.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* AI Signals Preview */}
                    <div className="bg-[#0d1424] border border-white/5 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-white">AI Signals</h2>
                            <a href="/signals" className="text-xs text-cyan-400 hover:text-cyan-300">
                                View all →
                            </a>
                        </div>
                        <div className="space-y-3">
                            {signals.map((s, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                    <div>
                                        <p className="text-sm text-white font-medium">{s.asset}</p>
                                        <p className="text-xs text-gray-400">{s.confidence}% confidence</p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-md font-bold ${s.signal === "BUY" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                                        {s.signal}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {subStatus === "FREE" && (
                            <div className="mt-4 p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                                <p className="text-xs text-cyan-400">Upgrade to Pro for unlimited signals</p>
                                <a href="/#pricing" className="text-xs text-blue-400 hover:text-blue-300 mt-1 block">
                                    Upgrade now →
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
