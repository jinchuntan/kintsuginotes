"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      {/* Animated kintsugi repair visual */}
      <div className="relative w-24 h-24">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-kintsugi-400/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-dashed border-gold-glow/40"
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-8 w-8 text-kintsugi-400" />
          </motion.div>
        </div>
        {/* Gold glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 20px rgba(212, 165, 116, 0.1)",
              "0 0 40px rgba(212, 165, 116, 0.3)",
              "0 0 20px rgba(212, 165, 116, 0.1)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Loading text */}
      <div className="text-center space-y-2">
        <motion.p
          className="text-lg font-medium text-kintsugi-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Analyzing your learning fracture...
        </motion.p>
        <p className="text-sm text-zinc-500">
          Preparing your golden repair path
        </p>
      </div>

      {/* Progress steps */}
      <div className="flex gap-4 mt-2">
        {["Detecting", "Analyzing", "Repairing"].map((step, i) => (
          <motion.div
            key={step}
            className="flex items-center gap-1.5"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-kintsugi-400" />
            <span className="text-xs text-zinc-500">{step}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
