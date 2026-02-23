import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateSignals } from "@/lib/ai";

// Simple in-memory rate limiter (use Redis in production)
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string, limit: number): boolean {
    const now = Date.now();
    const entry = requestCounts.get(ip);

    if (!entry || entry.resetAt < now) {
        requestCounts.set(ip, { count: 1, resetAt: now + 60_000 });
        return true;
    }

    if (entry.count >= limit) return false;
    entry.count++;
    return true;
}

export async function GET(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isPro =
        (session.user as any).subscriptionStatus === "PRO" ||
        (session.user as any).subscriptionStatus === "ENTERPRISE";

    const limit = isPro ? 100 : 10;
    if (!rateLimit(ip, limit)) {
        return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const signals = generateSignals();
    const data = isPro ? signals : signals.slice(0, 2);

    return NextResponse.json({ signals: data, isPro });
}
