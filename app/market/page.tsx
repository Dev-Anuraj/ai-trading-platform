"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";

const Chart = dynamic(() => import("@/components/Chart"), { ssr: false });

const watchlist = [
    { asset: "BTC/USD", price: "$46,820", change: "+2.3%", up: true },
    { asset: "ETH/USD", price: "$3,240", change: "+1.8%", up: true },
    { asset: "SOL/USD", price: "$142", change: "-0.5%", up: false },
    { asset: "EUR/USD", price: "1.0912", change: "+0.2%", up: true },
    { asset: "GBP/USD", price: "1.2654", change: "-0.1%", up: false },
];

const assets = ["BTC/USD", "ETH/USD", "SOL/USD", "EUR/USD", "GBP/USD", "AAPL", "NVDA"];

export default function MarketPage() {
    const [selected, setSelected] = useState("BTC/USD");
    const [search, setSearch] = useState("");

    const filtered = assets.filter((a) => a.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="flex min-h-screen bg-[#060b17]">
            <Sidebar />
            <main className="flex-1 ml-60 pt-16 p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-white">Market</h1>
                    <p className="text-gray-400 text-sm mt-1">Live charts and asset overview</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Chart Area */}
                    <div className="lg:col-span-3 space-y-4">
                        {/* Asset Selector */}
                        <div className="bg-[#0d1424] border border-white/5 rounded-xl p-4 flex items-center gap-3">
                            <input
                                type="text"
                                placeholder="Search assets..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 w-48"
                            />
                            <div className="flex gap-2 flex-wrap">
                                {filtered.map((a) => (
                                    <button
                                        key={a}
                                        onClick={() => setSelected(a)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selected === a
                                                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                                : "bg-white/5 text-gray-400 hover:text-white border border-white/5"
                                            }`}
                                    >
                                        {a}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selected Asset Info */}
                        <div className="bg-[#0d1424] border border-white/5 rounded-xl p-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white">{selected}</h2>
                                <p className="text-3xl font-bold text-white mt-1">$46,820</p>
                            </div>
                            <div className="text-right">
                                <span className="text-green-400 text-lg font-semibold">+2.34%</span>
                                <p className="text-gray-400 text-xs mt-1">24h change</p>
                            </div>
                        </div>

                        {/* Chart */}
                        <Chart />
                    </div>

                    {/* Watchlist */}
                    <div className="bg-[#0d1424] border border-white/5 rounded-xl p-5">
                        <h2 className="text-lg font-bold text-white mb-4">Watchlist</h2>
                        <div className="space-y-1">
                            {watchlist.map((item) => (
                                <button
                                    key={item.asset}
                                    onClick={() => setSelected(item.asset)}
                                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-white">{item.asset}</p>
                                        <p className="text-xs text-gray-400">{item.price}</p>
                                    </div>
                                    <span className={`text-xs font-semibold ${item.up ? "text-green-400" : "text-red-400"}`}>
                                        {item.change}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
