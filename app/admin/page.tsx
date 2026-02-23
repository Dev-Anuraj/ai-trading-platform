import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const mockUsers = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "USER", plan: "PRO", joined: "Jan 5, 2026" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", role: "USER", plan: "FREE", joined: "Jan 12, 2026" },
    { id: "3", name: "Carol Davis", email: "carol@example.com", role: "ADMIN", plan: "ENTERPRISE", joined: "Dec 20, 2025" },
    { id: "4", name: "Dan Wilson", email: "dan@example.com", role: "USER", plan: "PRO", joined: "Feb 1, 2026" },
    { id: "5", name: "Eve Brown", email: "eve@example.com", role: "USER", plan: "FREE", joined: "Feb 8, 2026" },
];

const metrics = [
    { label: "Total Users", value: "12,483", icon: "👥" },
    { label: "Pro Subscribers", value: "3,241", icon: "⭐" },
    { label: "Revenue (MRR)", value: "$158,809", icon: "💰" },
    { label: "Signals Generated", value: "98,432", icon: "🤖" },
];

export default async function AdminPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");
    if ((session.user as any)?.role !== "ADMIN") redirect("/dashboard");

    return (
        <div className="flex min-h-screen bg-[#060b17]">
            <Sidebar />
            <main className="flex-1 ml-60 pt-16 p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                    <p className="text-gray-400 text-sm mt-1">System overview and user management</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {metrics.map((m) => (
                        <div key={m.label} className="bg-[#0d1424] border border-white/5 rounded-xl p-5">
                            <div className="text-2xl mb-2">{m.icon}</div>
                            <p className="text-2xl font-bold text-white">{m.value}</p>
                            <p className="text-gray-400 text-xs mt-1">{m.label}</p>
                        </div>
                    ))}
                </div>

                {/* User Table */}
                <div className="bg-[#0d1424] border border-white/5 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-white">User Management</h2>
                        <span className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                            {mockUsers.length} users shown (mock data)
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-gray-400 border-b border-white/5 text-left">
                                    <th className="pb-3 pr-4">Name</th>
                                    <th className="pb-3 pr-4">Email</th>
                                    <th className="pb-3 pr-4">Role</th>
                                    <th className="pb-3 pr-4">Plan</th>
                                    <th className="pb-3">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {mockUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/2 transition-colors">
                                        <td className="py-3 pr-4 font-medium text-white">{user.name}</td>
                                        <td className="py-3 pr-4 text-gray-400">{user.email}</td>
                                        <td className="py-3 pr-4">
                                            <span className={`text-xs px-2 py-1 rounded-md font-bold ${user.role === "ADMIN"
                                                    ? "bg-purple-500/10 text-purple-400"
                                                    : "bg-white/5 text-gray-400"
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 pr-4">
                                            <span className={`text-xs px-2 py-1 rounded-md font-bold ${user.plan === "ENTERPRISE"
                                                    ? "bg-yellow-500/10 text-yellow-400"
                                                    : user.plan === "PRO"
                                                        ? "bg-cyan-500/10 text-cyan-400"
                                                        : "bg-white/5 text-gray-400"
                                                }`}>
                                                {user.plan}
                                            </span>
                                        </td>
                                        <td className="py-3 text-gray-400">{user.joined}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
