import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import SignalCard from "@/components/SignalCard";
import { generateSignals } from "@/lib/ai";
import Link from "next/link";

export default async function SignalsPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    const subStatus = (session.user as any)?.subscriptionStatus ?? "FREE";
    const isPro = subStatus === "PRO" || subStatus === "ENTERPRISE";
    const signals = generateSignals();
    const visibleSignals = isPro ? signals : signals.slice(0, 2);

    return (
        <div className="flex min-h-screen bg-[#060b17]">
            <Sidebar />
            <main className="flex-1 ml-60 pt-16 p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">AI Trading Signals</h1>
                        <p className="text-gray-400 text-sm mt-1">
                            Generated every hour by our AI engine
                            {!isPro && ` · Showing 2 of ${signals.length} signals`}
                        </p>
                    </div>
                    {!isPro && (
                        <Link
                            href="/#pricing"
                            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all"
                        >
                            Upgrade to Pro
                        </Link>
                    )}
                </div>

                {/* Signals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                    {visibleSignals.map((signal, i) => (
                        <SignalCard key={i} signal={signal} />
                    ))}
                </div>

                {/* Upgrade CTA for Free users */}
                {!isPro && (
                    <div className="relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 p-8 text-center overflow-hidden">
                        <div className="absolute inset-0 backdrop-blur-sm" />
                        <div className="relative z-10">
                            <div className="text-4xl mb-3">🔒</div>
                            <h2 className="text-xl font-bold text-white mb-2">
                                {signals.length - 2} More Signals Locked
                            </h2>
                            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                                Upgrade to Pro to unlock all AI signals, including high-confidence setups
                                across crypto, forex, and stocks.
                            </p>
                            <Link
                                href="/#pricing"
                                className="inline-flex px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
                            >
                                Unlock All Signals – $49/mo
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
