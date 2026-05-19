"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const loadingSteps = [
  { label: "Detecting fracture", icon: "🔍" },
  { label: "Analyzing gap", icon: "🧠" },
  { label: "Crafting repair", icon: "✨" },
];

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-8">
      {/* Animated kintsugi visual — cracked bowl being repaired */}
      <div className="relative w-32 h-32">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-kintsugi-400/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        {/* Middle ring with dashes */}
        <motion.div
          className="absolute inset-3 rounded-full border-2 border-dashed border-kintsugi-400/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner solid ring */}
        <motion.div
          className="absolute inset-6 rounded-full border border-gold-glow/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Center sparkle icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-10 w-10 text-kintsugi-400 drop-shadow-[0_0_12px_rgba(212,165,116,0.5)]" />
          </motion.div>
        </div>

        {/* Orbiting gold dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-kintsugi-400"
            style={{
              left: "50%",
              top: "50%",
              marginLeft: -4,
              marginTop: -4,
            }}
            animate={{
              x: [
                Math.cos((i * Math.PI * 2) / 3) * 52,
                Math.cos((i * Math.PI * 2) / 3 + Math.PI * 2) * 52,
              ],
              y: [
                Math.sin((i * Math.PI * 2) / 3) * 52,
                Math.sin((i * Math.PI * 2) / 3 + Math.PI * 2) * 52,
              ],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Pulsing glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 20px rgba(212, 165, 116, 0.05), inset 0 0 20px rgba(212, 165, 116, 0.02)",
              "0 0 50px rgba(212, 165, 116, 0.2), inset 0 0 30px rgba(212, 165, 116, 0.05)",
              "0 0 20px rgba(212, 165, 116, 0.05), inset 0 0 20px rgba(212, 165, 116, 0.02)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Loading text */}
      <div className="text-center space-y-2">
        <motion.h3
          className="text-xl font-semibold text-kintsugi-300"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Analyzing your learning fracture...
        </motion.h3>
        <p className="text-sm text-zinc-500">
          Preparing your personalized golden repair path
        </p>
      </div>

      {/* Animated progress steps */}
      <div className="flex gap-6 mt-2">
        {loadingSteps.map((step, i) => (
          <motion.div
            key={step.label}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800/50"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          >
            <span className="text-sm">{step.icon}</span>
            <span className="text-xs text-zinc-400 font-medium">{step.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Bottom shimmer bar */}
      <div className="w-64 h-1 rounded-full overflow-hidden bg-zinc-800/50">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-kintsugi-400/60 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "50%" }}
        />
      </div>
    </div>
  );
}
