"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/market", label: "Market", icon: "📈" },
    { href: "/signals", label: "AI Signals", icon: "🤖" },
    { href: "/admin", label: "Admin", icon: "⚙️", adminOnly: true },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "ADMIN";
    const subStatus = (session?.user as any)?.subscriptionStatus ?? "FREE";

    return (
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-60 bg-[#0a0f1e] border-r border-white/5 flex flex-col p-4 z-40">
            {/* Subscription Badge */}
            <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20">
                <p className="text-xs text-gray-400">Your Plan</p>
                <p className="text-sm font-bold text-cyan-400">{subStatus}</p>
                {subStatus === "FREE" && (
                    <Link href="/#pricing" className="text-xs text-blue-400 hover:text-blue-300 mt-1 block">
                        Upgrade →
                    </Link>
                )}
            </div>

            {/* Nav Links */}
            <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                    if (item.adminOnly && !isAdmin) return null;
                    const active = pathname === item.href || pathname?.startsWith(item.href + "/");
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${active
                                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-white border border-cyan-500/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <span className="text-base">{item.icon}</span>
                            {item.label}
                            {active && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom info */}
            <div className="border-t border-white/5 pt-4">
                <p className="text-xs text-gray-500 text-center">
                    AntigravityAI v1.0
                </p>
            </div>
        </aside>
    );
}
