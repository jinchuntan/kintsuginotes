"use client";

import { motion } from "framer-motion";
import { RepairStatus } from "@/lib/types";

interface CrackPatternProps {
  status: RepairStatus;
  className?: string;
}

/**
 * SVG crack pattern overlay for KintsugiCards.
 * Cracks appear dark/subtle when unrepaired, and glow gold when repaired.
 */
export default function CrackPattern({ status, className = "" }: CrackPatternProps) {
  const isRepaired = status === "repaired";
  const isRepairing = status === "repairing";

  const crackColor = isRepaired
    ? "url(#goldRepairGradient)"
    : isRepairing
    ? "url(#partialRepairGradient)"
    : "rgba(63, 63, 70, 0.4)";

  const strokeWidth = isRepaired ? 2 : 1.5;
  const glowFilter = isRepaired ? "url(#goldGlow)" : undefined;

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 200 150"
      fill="none"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="goldRepairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b8860b" />
          <stop offset="40%" stopColor="#d4a574" />
          <stop offset="70%" stopColor="#f5c842" />
          <stop offset="100%" stopColor="#d4a574" />
        </linearGradient>
        <linearGradient id="partialRepairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(212, 165, 116, 0.3)" />
          <stop offset="50%" stopColor="rgba(212, 165, 116, 0.5)" />
          <stop offset="100%" stopColor="rgba(212, 165, 116, 0.3)" />
        </linearGradient>
        <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main diagonal crack */}
      <motion.path
        d="M 10 15 Q 30 25, 45 20 T 80 35 Q 95 40, 110 30 T 150 45 Q 165 50, 185 40"
        stroke={crackColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        filter={glowFilter}
        initial={isRepaired ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Vertical branch crack */}
      <motion.path
        d="M 75 5 Q 80 20, 70 35 T 85 65 Q 80 80, 90 100"
        stroke={crackColor}
        strokeWidth={strokeWidth * 0.7}
        strokeLinecap="round"
        filter={glowFilter}
        initial={isRepaired ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
      />

      {/* Small branch */}
      <motion.path
        d="M 140 10 Q 135 30, 145 50 T 135 80"
        stroke={crackColor}
        strokeWidth={strokeWidth * 0.5}
        strokeLinecap="round"
        filter={glowFilter}
        initial={isRepaired ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
      />

      {/* Lower horizontal crack */}
      <motion.path
        d="M 5 100 Q 25 95, 50 105 T 100 98 Q 120 102, 145 95 T 195 105"
        stroke={crackColor}
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        filter={glowFilter}
        initial={isRepaired ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.3, delay: 0.2, ease: "easeInOut" }}
      />

      {/* Gold fill spots at intersections (only when repaired) */}
      {isRepaired && (
        <>
          <motion.circle
            cx="78"
            cy="33"
            r="3"
            fill="#f5c842"
            filter="url(#goldGlow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ delay: 1, duration: 0.5 }}
          />
          <motion.circle
            cx="140"
            cy="50"
            r="2"
            fill="#d4a574"
            filter="url(#goldGlow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          />
        </>
      )}
    </svg>
  );
}
