"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error ?? "Registration failed");
            } else {
                toast.success("Account created! Please sign in.");
                router.push("/login");
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#060b17] flex items-center justify-center p-4">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold">
                            TX
                        </div>
                        <span className="text-2xl font-bold text-white">
                            TradingX<span className="text-cyan-400">AI</span>
                        </span>
                    </Link>
                    <h1 className="text-2xl font-bold text-white mt-6 mb-2">Create your account</h1>
                    <p className="text-gray-400 text-sm">Start trading smarter with AI signals</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[#0d1424] border border-white/5 rounded-2xl p-8 space-y-5"
                >
                    {[
                        { name: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                        { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                        { name: "password", label: "Password", type: "password", placeholder: "Min. 8 characters" },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm text-gray-400 mb-2" htmlFor={field.name}>
                                {field.label}
                            </label>
                            <input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                value={(form as any)[field.name]}
                                onChange={handleChange}
                                required
                                minLength={field.name === "password" ? 8 : 1}
                                placeholder={field.placeholder}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all text-sm"
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating account..." : "Create Free Account"}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-sm mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
