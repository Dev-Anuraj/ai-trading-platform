"use client";

import { useEffect, useRef } from "react";
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickData } from "lightweight-charts";

function generateMockData(): CandlestickData[] {
    const data: CandlestickData[] = [];
    let price = 45000;
    const now = Math.floor(Date.now() / 1000);

    for (let i = 200; i >= 0; i--) {
        const time = now - i * 3600;
        const open = price;
        const change = (Math.random() - 0.48) * 800;
        const close = open + change;
        const high = Math.max(open, close) + Math.random() * 300;
        const low = Math.min(open, close) - Math.random() * 300;
        price = close;
        data.push({ time: time as any, open, high, low, close });
    }
    return data;
}

export default function Chart() {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const chart = createChart(containerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "#0d1424" },
                textColor: "#9ca3af",
            },
            grid: {
                vertLines: { color: "#ffffff08" },
                horzLines: { color: "#ffffff08" },
            },
            crosshair: {
                mode: 1,
            },
            rightPriceScale: {
                borderColor: "#ffffff10",
            },
            timeScale: {
                borderColor: "#ffffff10",
                timeVisible: true,
            },
            width: containerRef.current.clientWidth,
            height: 400,
        });

        const series = chart.addCandlestickSeries({
            upColor: "#22d3ee",
            downColor: "#f87171",
            borderUpColor: "#22d3ee",
            borderDownColor: "#f87171",
            wickUpColor: "#22d3ee",
            wickDownColor: "#f87171",
        });

        series.setData(generateMockData());
        chart.timeScale().fitContent();
        chartRef.current = chart;

        const handleResize = () => {
            if (containerRef.current) {
                chart.applyOptions({ width: containerRef.current.clientWidth });
            }
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, []);

    return (
        <div className="w-full rounded-xl overflow-hidden border border-white/5 bg-[#0d1424]">
            <div ref={containerRef} className="w-full" />
        </div>
    );
}
