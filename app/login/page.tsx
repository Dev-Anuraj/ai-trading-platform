"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        setLoading(false);

        if (result?.error) {
            toast.error("Invalid credentials. Please try again.");
        } else {
            toast.success("Welcome back!");
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-[#060b17] flex items-center justify-center p-4">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold">
                            TX
                        </div>
                        <span className="text-2xl font-bold text-white">
                            TradingX<span className="text-cyan-400">AI</span>
                        </span>
                    </Link>
                    <h1 className="text-2xl font-bold text-white mt-6 mb-2">Welcome back</h1>
                    <p className="text-gray-400 text-sm">Sign in to access your trading dashboard</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[#0d1424] border border-white/5 rounded-2xl p-8 space-y-5"
                >
                    <div>
                        <label className="block text-sm text-gray-400 mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-sm mt-6">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-cyan-400 hover:text-cyan-300 font-medium">
                        Create one free
                    </Link>
                </p>
            </div>
        </div>
    );
}
