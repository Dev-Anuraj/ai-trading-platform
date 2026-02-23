import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AntigravityAI – AI-Powered Trading Platform",
  description:
    "Make smarter trading decisions with AI-generated signals, real-time charts, and advanced analytics. Join thousands of traders using AntigravityAI.",
  keywords: "AI trading, crypto signals, trading platform, algorithmic trading",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#060b17] text-white antialiased`}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#0d1424",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
