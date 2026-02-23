"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1e]/90 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                            TX
                        </div>
                        <span className="text-white font-bold text-lg tracking-tight">
                            TradingX<span className="text-cyan-400">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/#features" className="text-gray-400 hover:text-white text-sm transition-colors">Features</Link>
                        <Link href="/#pricing" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</Link>
                        {session && (
                            <>
                                <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">Dashboard</Link>
                                <Link href="/market" className="text-gray-400 hover:text-white text-sm transition-colors">Market</Link>
                                <Link href="/signals" className="text-gray-400 hover:text-white text-sm transition-colors">Signals</Link>
                            </>
                        )}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {session ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                                        {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                                    </div>
                                    <span className="text-sm text-gray-300">{session.user?.name}</span>
                                </div>
                                <button
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg hover:border-white/20 transition-all"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-gray-400 hover:text-white"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden border-t border-white/5 py-4 space-y-2">
                        <Link href="/#features" className="block px-4 py-2 text-gray-400 hover:text-white text-sm">Features</Link>
                        <Link href="/#pricing" className="block px-4 py-2 text-gray-400 hover:text-white text-sm">Pricing</Link>
                        {session ? (
                            <>
                                <Link href="/dashboard" className="block px-4 py-2 text-gray-400 hover:text-white text-sm">Dashboard</Link>
                                <Link href="/market" className="block px-4 py-2 text-gray-400 hover:text-white text-sm">Market</Link>
                                <Link href="/signals" className="block px-4 py-2 text-gray-400 hover:text-white text-sm">Signals</Link>
                                <button onClick={() => signOut()} className="block px-4 py-2 text-red-400 text-sm">Sign Out</button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="block px-4 py-2 text-gray-400 hover:text-white text-sm">Sign In</Link>
                                <Link href="/register" className="block px-4 py-2 text-cyan-400 text-sm">Get Started</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
