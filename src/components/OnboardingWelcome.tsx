"use client";

import { motion } from "framer-motion";
import { Sparkles, PenTool, Brain, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OnboardingWelcomeProps {
  onGetStarted: () => void;
  onSkip: () => void;
}

const steps = [
  {
    icon: PenTool,
    label: "Submit",
    description: "Share your mistake or confusion",
    color: "text-kintsugi-400",
    bg: "bg-kintsugi-400/10",
  },
  {
    icon: Brain,
    label: "AI Repair",
    description: "Get a personalized golden repair",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    icon: Trophy,
    label: "Master",
    description: "Practice until you truly understand",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
];

export default function OnboardingWelcome({
  onGetStarted,
  onSkip,
}: OnboardingWelcomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
        className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-kintsugi-400/5 overflow-hidden"
      >
        {/* Gold accent bar */}
        <div className="h-1 bg-gradient-to-r from-kintsugi-600 via-gold-glow to-kintsugi-600" />

        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="inline-flex p-4 rounded-full bg-kintsugi-400/10 mb-4"
            >
              <Sparkles className="h-8 w-8 text-kintsugi-400" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-zinc-100 mb-2"
            >
              Welcome to Kintsugi Notes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-zinc-400 max-w-sm mx-auto"
            >
              Turn your mistakes into golden learning paths. Just like the
              Japanese art of kintsugi repairs broken pottery with gold.
            </motion.p>
          </div>

          {/* 3-step flow */}
          <div className="flex items-start justify-center gap-3 sm:gap-4 mb-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="flex flex-col items-center text-center flex-1"
              >
                {/* Icon */}
                <div className={`p-3 rounded-xl ${step.bg} mb-3`}>
                  <step.icon className={`h-6 w-6 ${step.color}`} />
                </div>
                {/* Label */}
                <p className="text-sm font-semibold text-zinc-200 mb-1">
                  {step.label}
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow connector (except last) */}
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="absolute hidden sm:block"
                    style={{
                      left: `${33 + i * 33}%`,
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <ArrowRight className="h-4 w-4 text-zinc-600" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Tip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center mb-6 px-4 py-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50"
          >
            <p className="text-xs text-zinc-400">
              <span className="text-kintsugi-400 font-medium">Pro tip:</span>{" "}
              Try one of our examples to see how it works before submitting your
              own mistake.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col gap-3"
          >
            <Button
              variant="gold"
              size="lg"
              className="w-full"
              onClick={onGetStarted}
            >
              Take a Quick Tour
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <button
              onClick={onSkip}
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Skip, I&apos;ll explore on my own
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
