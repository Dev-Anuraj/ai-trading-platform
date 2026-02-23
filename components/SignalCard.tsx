interface AISignal {
    asset: string;
    signal: "BUY" | "SELL";
    confidence: number;
    risk: "Low" | "Medium" | "High";
    entryPrice: number;
    stopLoss: number;
    takeProfit: number;
}

const riskColors = {
    Low: "text-green-400 bg-green-400/10",
    Medium: "text-yellow-400 bg-yellow-400/10",
    High: "text-red-400 bg-red-400/10",
};

export default function SignalCard({ signal }: { signal: AISignal }) {
    const isBuy = signal.signal === "BUY";

    return (
        <div className="bg-[#0d1424] border border-white/5 rounded-xl p-5 hover:border-cyan-500/20 transition-all group">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="font-bold text-white text-lg">{signal.asset}</h3>
                    <p className="text-xs text-gray-500">AI Generated Signal</p>
                </div>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${isBuy
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                >
                    {signal.signal}
                </span>
            </div>

            {/* Confidence Bar */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-400">Confidence</span>
                    <span className="text-xs font-bold text-cyan-400">{signal.confidence}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all"
                        style={{ width: `${signal.confidence}%` }}
                    />
                </div>
            </div>

            {/* Price Details */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-lg p-2.5 text-center">
                    <p className="text-gray-500 text-xs mb-1">Entry</p>
                    <p className="text-white text-sm font-semibold">${signal.entryPrice.toLocaleString()}</p>
                </div>
                <div className="bg-red-500/5 rounded-lg p-2.5 text-center">
                    <p className="text-red-400 text-xs mb-1">Stop Loss</p>
                    <p className="text-white text-sm font-semibold">${signal.stopLoss.toLocaleString()}</p>
                </div>
                <div className="bg-green-500/5 rounded-lg p-2.5 text-center">
                    <p className="text-green-400 text-xs mb-1">Take Profit</p>
                    <p className="text-white text-sm font-semibold">${signal.takeProfit.toLocaleString()}</p>
                </div>
            </div>

            {/* Risk Badge */}
            <div className="mt-3 flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-md font-medium ${riskColors[signal.risk]}`}>
                    {signal.risk} Risk
                </span>
                <span className="text-xs text-gray-500 ml-auto">
                    {new Date().toLocaleTimeString()}
                </span>
            </div>
        </div>
    );
}
