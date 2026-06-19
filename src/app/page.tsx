// src/app/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      {/* Navbar simplificada */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Analytics SaaS
        </h1>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-20 text-center flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Modern Analytics Platform
          </h1>
          <p className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto">
            Track metrics, generate reports, and visualize your data in real-time
            with our enterprise-grade SaaS.
          </p>
          <Link href="/register">
            <Button size="lg" className="mt-8 text-lg px-8">
              Start Free Trial
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}