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
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GoldParticles from "@/components/GoldParticles";

/* ---------- Step indicator showing the 4-step flow ---------- */
const steps = [
  { num: "01", label: "Input your mistake", desc: "Paste any wrong answer, confusing notes, or weak topic" },
  { num: "02", label: "AI analyzes the fracture", desc: "We detect exactly where and why understanding broke" },
  { num: "03", label: "Golden repair path", desc: "Get a corrected explanation, mini lesson, and memory hook" },
  { num: "04", label: "Practice & master", desc: "Reinforce with targeted questions until it sticks" },
];

/* ---------- Hero cracked/repaired card visual ---------- */
function KintsugiHeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: -8 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
      className="relative max-w-md mx-auto perspective-1000"
    >
      {/* Glow behind card */}
      <div className="absolute -inset-4 bg-kintsugi-400/10 rounded-3xl blur-2xl" />

      <div className="relative rounded-2xl border border-kintsugi-400/30 bg-zinc-900/80 backdrop-blur-sm p-8 overflow-hidden gold-glow">
        {/* Animated SVG crack lines that turn gold */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 300"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="heroGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b8860b" />
              <stop offset="50%" stopColor="#f5c842" />
              <stop offset="100%" stopColor="#d4a574" />
            </linearGradient>
            <filter id="heroGlow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
          </defs>
          {/* Primary horizontal crack */}
          <motion.path
            d="M 0 120 Q 60 100, 120 130 T 240 110 T 360 125 L 400 120"
            stroke="url(#heroGold)"
            strokeWidth="2.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 2, ease: "easeInOut" }}
          />
          {/* Glow duplicate */}
          <motion.path
            d="M 0 120 Q 60 100, 120 130 T 240 110 T 360 125 L 400 120"
            stroke="url(#heroGold)"
            strokeWidth="4"
            filter="url(#heroGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ delay: 1.2, duration: 2, ease: "easeInOut" }}
          />
          {/* Vertical branch */}
          <motion.path
            d="M 160 0 Q 150 50, 170 100 T 155 200 Q 160 250, 150 300"
            stroke="url(#heroGold)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ delay: 1.8, duration: 1.5, ease: "easeInOut" }}
          />
          {/* Diagonal crack */}
          <motion.path
            d="M 280 0 Q 270 60, 290 120 T 275 200"
            stroke="url(#heroGold)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ delay: 2, duration: 1.2, ease: "easeInOut" }}
          />
          {/* Gold spots at intersections */}
          <motion.circle
            cx="162" cy="118" r="4"
            fill="#f5c842"
            filter="url(#heroGlow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ delay: 2.8, duration: 0.5 }}
          />
          <motion.circle
            cx="282" cy="120" r="3"
            fill="#d4a574"
            filter="url(#heroGlow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ delay: 3, duration: 0.5 }}
          />
        </svg>

        {/* Card content */}
        <div className="relative z-10 space-y-4">
          {/* Wrong answer - struck through */}
          <div className="flex items-center gap-3">
            <motion.div
              className="w-3 h-3 rounded-full bg-red-400/70"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
            <span className="text-sm text-zinc-500 line-through font-mono">
              (x + 3)&sup2; = x&sup2; + 9
            </span>
          </div>

          {/* Arrow transition */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="flex items-center gap-2 pl-6"
          >
            <div className="w-8 h-px bg-gradient-to-r from-zinc-600 to-kintsugi-400" />
            <Sparkles className="w-4 h-4 text-kintsugi-400" />
          </motion.div>

          {/* Corrected answer with golden highlight */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="w-3 h-3 rounded-full bg-emerald-400/70"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.4, type: "spring" }}
              />
              <span className="text-sm text-kintsugi-300 font-medium">
                Golden Repair Applied
              </span>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-3 border border-kintsugi-400/20">
              <p className="text-base text-zinc-200 font-mono leading-relaxed">
                (x + 3)&sup2; = x&sup2; + <span className="text-gold-glow font-bold">6x</span> + 9
              </p>
            </div>
            <p className="text-xs text-zinc-500 pl-1">
              Missing term: 2 &times; x &times; 3 = 6x (FOIL method)
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="space-y-1.5 pt-2"
          >
            <div className="flex justify-between text-xs">
              <span className="text-zinc-500">Repair progress</span>
              <span className="text-kintsugi-400">100%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-kintsugi-600 via-kintsugi-400 to-gold-glow"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 3.2, duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
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
      "AI identifies the exact misconception behind your mistake — not just what is wrong, but why.",
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
              <div className="relative">
                <Sparkles className="h-6 w-6 text-kintsugi-400" />
                <div className="absolute inset-0 blur-md bg-kintsugi-400/30" />
              </div>
              <span className="text-lg font-bold text-gold-gradient">
                Kintsugi Notes
              </span>
            </div>
            <Link href="/workspace">
              <Button variant="gold" size="sm">
                Open App
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gold particle canvas background */}
        <GoldParticles count={40} />

        {/* Background glow orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-kintsugi-400/[0.04] rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] bg-gold-glow/[0.03] rounded-full blur-[80px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-28 sm:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-kintsugi-400/20 bg-kintsugi-400/5 text-kintsugi-400 text-sm mb-8"
              >
                <Sparkles className="h-3.5 w-3.5" />
                AI-Powered Learning Companion
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                <motion.span
                  className="block text-zinc-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Turn every mistake
                </motion.span>
                <motion.span
                  className="block text-gold-gradient"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  into a golden
                </motion.span>
                <motion.span
                  className="block text-zinc-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  learning path.
                </motion.span>
              </h1>

              <motion.p
                className="text-lg sm:text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Inspired by the Japanese art of kintsugi — where broken pottery
                is repaired with gold — Kintsugi Notes transforms your mistakes
                into your most valuable learning tool.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <Link href="/workspace">
                  <Button variant="gold" size="xl" className="w-full sm:w-auto text-base">
                    Start repairing my learning
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    See how it works
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Hero Card */}
            <div className="hidden lg:block">
              <KintsugiHeroCard />
            </div>
          </div>

          {/* Mobile hero card */}
          <div className="lg:hidden mt-16">
            <KintsugiHeroCard />
          </div>
        </div>
      </section>

      {/* How It Works — Step-by-step */}
      <section id="how-it-works" className="py-20 sm:py-28 relative">
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
              Four simple steps from confusion to clarity.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-px">
              <motion.div
                className="w-full h-full bg-gradient-to-r from-kintsugi-400/40 via-kintsugi-400/20 to-kintsugi-400/40"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </div>

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="text-center relative">
                  {/* Step number circle */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 border border-kintsugi-400/30 mb-4 relative z-10">
                    <span className="text-sm font-bold text-kintsugi-400 font-mono">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-semibold text-zinc-100 mb-2">{step.label}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 bg-zinc-900/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
              Powered by AI, designed for humans
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Every feature is designed to make learning feel rewarding, not punishing.
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
                  <Card className="h-full border-zinc-800/50 hover:border-kintsugi-400/20 transition-all duration-300 group hover:gold-glow">
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
      <section className="py-20 sm:py-28">
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
                  <div className="flex gap-4 p-6 rounded-xl border border-zinc-800/50 bg-zinc-900/30 hover:border-kintsugi-400/20 transition-all duration-300 hover:bg-zinc-900/50">
                    <div className="shrink-0">
                      <div className="p-2.5 rounded-lg bg-kintsugi-400/10">
                        <Icon className="h-5 w-5 text-kintsugi-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-100 mb-1.5">
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
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <GoldParticles count={25} />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <Sparkles className="h-12 w-12 text-kintsugi-400 mx-auto mb-6 drop-shadow-[0_0_12px_rgba(212,165,116,0.4)]" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
              Ready to turn your mistakes into gold?
            </h2>
            <p className="text-zinc-400 mb-10 max-w-xl mx-auto text-lg">
              Start with any mistake — a wrong quiz answer, a confusing concept,
              or messy notes. Your golden learning path awaits.
            </p>
            <Link href="/workspace">
              <Button variant="gold" size="xl" className="text-base">
                Start repairing my learning
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-kintsugi-400" />
              <span className="text-sm text-zinc-400">
                Kintsugi Notes — Built for HackMars 3.0: NEON
              </span>
            </div>
            <p className="text-xs text-zinc-600">
              Inspired by the Japanese art of kintsugi (金継ぎ) — repairing with gold
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
