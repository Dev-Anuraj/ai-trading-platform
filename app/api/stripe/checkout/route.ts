import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

const PLANS = {
    PRO: process.env.STRIPE_PRO_PRICE_ID ?? "price_pro",
    ENTERPRISE: process.env.STRIPE_ENTERPRISE_PRICE_ID ?? "price_enterprise",
};

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan } = await req.json();
    const priceId = PLANS[plan as keyof typeof PLANS];

    if (!priceId) {
        return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
    });

    const checkoutSession = await stripe.checkout.sessions.create({
        customer_email: session.user.email!,
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
        cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
        metadata: { userId: user?.id ?? "" },
    });

    return NextResponse.json({ url: checkoutSession.url });
}
