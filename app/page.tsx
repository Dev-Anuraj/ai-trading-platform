import Link from "next/link";
import Navbar from "@/components/Navbar";
import PricingTable from "@/components/PricingTable";

const features = [
  {
    icon: "🤖",
    title: "AI-Powered Signals",
    desc: "Our AI analyzes markets 24/7 and generates high-confidence BUY/SELL signals across crypto, forex, and stocks.",
  },
  {
    icon: "📈",
    title: "Live Market Charts",
    desc: "Professional-grade candlestick charts with technical indicators like RSI, MACD, and moving averages.",
  },
  {
    icon: "🔐",
    title: "Bank-Level Security",
    desc: "JWT authentication, bcrypt hashing, and role-based access control keep your account and data safe.",
  },
  {
    icon: "⚡",
    title: "Real-Time Alerts",
    desc: "Get instant notifications when high-confidence signals are generated for assets on your watchlist.",
  },
  {
    icon: "📊",
    title: "Portfolio Analytics",
    desc: "Track performance, analyze trade history, and optimize your strategy with detailed analytics.",
  },
  {
    icon: "🌍",
    title: "Multi-Asset Support",
    desc: "Trade signals across BTC, ETH, major Forex pairs, and top-performing stocks in one platform.",
  },
];

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Crypto Trader",
    avatar: "AR",
    quote: "AntigravityAI's signals have transformed my trading. Up 43% in 3 months using their Pro plan.",
  },
  {
    name: "Sarah Chen",
    role: "Forex Specialist",
    avatar: "SC",
    quote: "The AI accuracy is impressive. I've never had such consistent signals before. Absolutely worth it.",
  },
  {
    name: "Mike Thompson",
    role: "Portfolio Manager",
    avatar: "MT",
    quote: "We use the Enterprise plan for our firm. The custom signals and API access are game-changers.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#060b17]">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2 text-sm text-cyan-400 mb-8">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            AI Signals Live – Updated Every Hour
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Trade Smarter with{" "}
            <span className="gradient-text">Artificial Intelligence</span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            AntigravityAI analyzes global markets in real-time and delivers high-accuracy
            trading signals for crypto, forex, and stocks — powered by advanced ML models.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-2xl shadow-cyan-500/25 text-lg"
            >
              Start Free Today →
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-lg"
            >
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { val: "87%", label: "Signal Accuracy" },
              { val: "12K+", label: "Active Traders" },
              { val: "$2.4B", label: "Volume Tracked" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold gradient-text">{stat.val}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="gradient-text">Trade with Confidence</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with professional trading tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-[#0d1424] border border-white/5 rounded-2xl p-6 hover:border-cyan-500/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-[#080d1a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Start free. Upgrade when you&apos;re ready to unleash full power.
            </p>
          </div>
          <PricingTable />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Traders Worldwide</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-[#0d1424] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all"
              >
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-[#080d1a]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Trade with <span className="gradient-text">AI Edge</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join 12,000+ traders using AntigravityAI to outperform the market.
          </p>
          <Link
            href="/register"
            className="inline-flex px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-2xl shadow-cyan-500/25 text-lg"
          >
            Get Started for Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 text-center text-gray-500 text-sm">
        <p>© 2026 AntigravityAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
