"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const plans = [
    {
        name: "Free",
        price: 0,
        period: "forever",
        description: "Great for getting started",
        features: [
            "2 AI signals per day",
            "Basic market charts",
            "Community support",
            "Email notifications",
        ],
        cta: "Get Started Free",
        highlight: false,
    },
    {
        name: "Pro",
        price: 49,
        period: "month",
        description: "For serious traders",
        features: [
            "Unlimited AI signals",
            "Advanced charts & indicators",
            "Priority support",
            "Portfolio analytics",
            "Backtesting access",
            "API access",
        ],
        cta: "Go Pro",
        highlight: true,
        plan: "PRO",
    },
    {
        name: "Enterprise",
        price: 199,
        period: "month",
        description: "For trading firms",
        features: [
            "Everything in Pro",
            "Custom AI models",
            "Dedicated account manager",
            "White-label options",
            "Custom integrations",
            "SLA guarantee",
        ],
        cta: "Contact Sales",
        highlight: false,
        plan: "ENTERPRISE",
    },
];

export default function PricingTable() {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null);

    const handleSubscribe = async (plan: typeof plans[0]) => {
        if (!session) {
            router.push("/register");
            return;
        }
        if (!plan.plan) return;

        setLoading(plan.plan);
        try {
            const res = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan: plan.plan }),
            });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
            else toast.error("Failed to start checkout");
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
                <div
                    key={plan.name}
                    className={`relative rounded-2xl p-6 border transition-all ${plan.highlight
                            ? "bg-gradient-to-b from-cyan-500/10 to-blue-600/5 border-cyan-500/30 shadow-xl shadow-cyan-500/10"
                            : "bg-[#0d1424] border-white/5 hover:border-white/10"
                        }`}
                >
                    {plan.highlight && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                                MOST POPULAR
                            </span>
                        </div>
                    )}

                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                        <p className="text-sm text-gray-400 mt-1">{plan.description}</p>
                        <div className="mt-4 flex items-end gap-1">
                            <span className="text-4xl font-bold text-white">${plan.price}</span>
                            <span className="text-gray-400 mb-1">/{plan.period}</span>
                        </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                        {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="text-cyan-400 flex-shrink-0">✓</span>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => handleSubscribe(plan)}
                        disabled={loading === plan.plan}
                        className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all ${plan.highlight
                                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 shadow-lg shadow-cyan-500/20"
                                : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {loading === plan.plan ? "Loading..." : plan.cta}
                    </button>
                </div>
            ))}
        </div>
    );
}
