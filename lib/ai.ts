export interface AISignal {
    asset: string;
    signal: "BUY" | "SELL";
    confidence: number;
    risk: "Low" | "Medium" | "High";
    entryPrice: number;
    stopLoss: number;
    takeProfit: number;
}

const ASSETS = [
    "BTC/USD",
    "ETH/USD",
    "SOL/USD",
    "EUR/USD",
    "GBP/USD",
    "AAPL",
    "TSLA",
    "NVDA",
];

function generateSignal(asset: string): AISignal {
    const signal = Math.random() > 0.5 ? "BUY" : "SELL";
    const confidence = Math.floor(Math.random() * 30) + 65; // 65–95
    const riskOptions: ("Low" | "Medium" | "High")[] = ["Low", "Medium", "High"];
    const risk = riskOptions[Math.floor(Math.random() * 3)];

    // Simple mock pricing
    const basePrice = Math.random() * 50000 + 100;
    const entryPrice = parseFloat(basePrice.toFixed(2));
    const stopLoss = parseFloat((entryPrice * (signal === "BUY" ? 0.95 : 1.05)).toFixed(2));
    const takeProfit = parseFloat((entryPrice * (signal === "BUY" ? 1.1 : 0.9)).toFixed(2));

    return { asset, signal, confidence, risk, entryPrice, stopLoss, takeProfit };
}

/**
 * Generate AI trading signals for all tracked assets.
 * In production, replace this logic with real ML model inference
 * or a third-party signal provider.
 */
export function generateSignals(): AISignal[] {
    return ASSETS.map((asset) => generateSignal(asset));
}
