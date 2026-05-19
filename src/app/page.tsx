"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Brain,
  Target,
  TrendingUp,
  Heart,
  Zap,
  BookOpen,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Hero cracked/repaired card visual component
function KintsugiHeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="relative max-w-sm mx-auto"
    >
      <div className="relative rounded-2xl border border-kintsugi-400/30 bg-zinc-900/60 p-6 overflow-hidden gold-glow">
        {/* Animated crack lines that turn gold */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 300 200"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 0 80 Q 50 70, 100 90 T 200 75 T 300 85"
            stroke="url(#goldGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M 80 0 Q 90 40, 75 80 T 95 160 T 85 200"
            stroke="url(#goldGradient)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1.3, duration: 1.2, ease: "easeInOut" }}
          />
          <motion.path
            d="M 200 0 Q 190 50, 210 100 T 195 200"
            stroke="url(#goldGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b8860b" />
              <stop offset="50%" stopColor="#d4a574" />
              <stop offset="100%" stopColor="#f5c842" />
            </linearGradient>
          </defs>
        </svg>

        {/* Card content */}
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/60" />
            <span className="text-xs text-zinc-500 line-through">
              (x + 3)² = x² + 9
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-kintsugi-400" />
              <span className="text-xs text-kintsugi-300 font-medium">
                Golden Repair Applied
              </span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              (x + 3)² = x² + <span className="text-gold-glow font-semibold">6x</span> + 9
            </p>
            <p className="text-xs text-zinc-500">
              The middle term comes from FOIL: 2 × x × 3 = 6x
            </p>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 2.5, duration: 1 }}
            className="h-1 rounded-full bg-gradient-to-r from-kintsugi-600 to-gold-glow"
          />
        </div>
      </div>
    </motion.div>
  );
}

const features = [
  {
    icon: Brain,
    title: "Smart Fracture Detection",
    description:
      "AI identifies the exact misconception behind your mistake — not just what's wrong, but why.",
  },
  {
    icon: Sparkles,
    title: "Golden Repair Paths",
    description:
      "Each mistake becomes a structured repair with explanations, mini lessons, and memory hooks.",
  },
  {
    icon: Target,
    title: "Practice & Mastery",
    description:
      "Targeted practice questions reinforce the corrected concepts until they stick.",
  },
  {
    icon: TrendingUp,
    title: "Visual Progress",
    description:
      "Track your repair journey with beautiful progress cards that glow gold as you master concepts.",
  },
];

const whyReasons = [
  {
    icon: Zap,
    title: "Mistakes become learning assets",
    description:
      "Every wrong answer contains clues about what to learn next. We extract those clues and turn them into targeted lessons.",
  },
  {
    icon: BookOpen,
    title: "Personalized repair paths",
    description:
      "No generic study guides. Your repair path is built from YOUR specific mistakes and knowledge gaps.",
  },
  {
    icon: TrendingUp,
    title: "Progress is visual and motivating",
    description:
      "Watch your cracked concepts heal with gold as you build understanding. Learning feels rewarding, not punishing.",
  },
  {
    icon: Heart,
    title: "Built for confidence",
    description:
      "Kintsugi teaches that repairs make things more beautiful. Your repaired knowledge is stronger than before.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-kintsugi-400" />
              <span className="text-lg font-bold text-gold-gradient">
                Kintsugi Notes
              </span>
            </div>
            <Link href="/workspace">
              <Button variant="outline" size="sm">
                Open App
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-kintsugi-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold-glow/5 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-kintsugi-400/20 bg-kintsugi-400/5 text-kintsugi-400 text-sm mb-6"
              >
                <Sparkles className="h-3.5 w-3.5" />
                AI-Powered Learning Companion
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="text-zinc-100">Turn every mistake</span>
                <br />
                <span className="text-gold-gradient">into a golden</span>
                <br />
                <span className="text-zinc-100">learning path.</span>
              </h1>

              <p className="text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Inspired by the Japanese art of kintsugi — where broken pottery
                is repaired with gold — Kintsugi Notes transforms your mistakes
                into your most valuable learning tool.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/workspace">
                  <Button variant="gold" size="xl" className="w-full sm:w-auto">
                    Start repairing my learning
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    Learn more
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right: Hero Card */}
            <div className="hidden lg:block">
              <KintsugiHeroCard />
            </div>
          </div>

          {/* Mobile hero card */}
          <div className="lg:hidden mt-12">
            <KintsugiHeroCard />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
              How it works
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Kintsugi Notes analyzes your mistakes with AI, identifies exactly
              where understanding broke, and creates a personalized golden repair
              path.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border-zinc-800/50 hover:border-kintsugi-400/20 transition-colors group">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex p-3 rounded-xl bg-kintsugi-400/10 mb-4 group-hover:bg-kintsugi-400/15 transition-colors">
                        <Icon className="h-6 w-6 text-kintsugi-400" />
                      </div>
                      <h3 className="font-semibold text-zinc-100 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Kintsugi Notes? Section */}
      <section className="py-20 sm:py-28 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
              Why Kintsugi Notes?
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Traditional learning punishes mistakes. We celebrate them — because
              they&apos;re the most valuable part of learning.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyReasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex gap-4 p-6 rounded-xl border border-zinc-800/50 bg-zinc-900/30 hover:border-kintsugi-400/20 transition-colors">
                    <div className="shrink-0">
                      <div className="p-2 rounded-lg bg-kintsugi-400/10">
                        <Icon className="h-5 w-5 text-kintsugi-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-100 mb-1">
                        {reason.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-10 w-10 text-kintsugi-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
              Ready to turn your mistakes into gold?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Start with any mistake — a wrong quiz answer, a confusing concept,
              or messy notes. Kintsugi Notes will guide you to understanding.
            </p>
            <Link href="/workspace">
              <Button variant="gold" size="xl">
                Start repairing my learning
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-kintsugi-400" />
              <span className="text-sm text-zinc-400">
                Kintsugi Notes — Built for HackMars 3.0
              </span>
            </div>
            <p className="text-xs text-zinc-600">
              Inspired by the Japanese art of kintsugi (金継ぎ)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
