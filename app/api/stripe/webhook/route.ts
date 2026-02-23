import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        return NextResponse.json({ error: "Webhook signature failed" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.CheckoutSession;
        const userId = session.metadata?.userId;
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );
        const priceId = subscription.items.data[0].price.id;
        const status =
            priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID ? "ENTERPRISE" : "PRO";

        if (userId) {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    subscriptionStatus: status as any,
                    stripeCustomerId: session.customer as string,
                },
            });
        }
    }

    if (event.type === "customer.subscription.deleted") {
        const sub = event.data.object as Stripe.Subscription;
        await prisma.user.updateMany({
            where: { stripeCustomerId: sub.customer as string },
            data: { subscriptionStatus: "FREE" },
        });
    }

    return NextResponse.json({ received: true });
}
