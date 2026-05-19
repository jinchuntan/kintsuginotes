"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, Lightbulb, LayoutDashboard, Trophy, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourStep {
  target: string; // data-tour-step value
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const tourSteps: TourStep[] = [
  {
    target: "input",
    title: "Submit a Mistake",
    description:
      "Describe what you got wrong — a test question, homework problem, or confusing topic. The AI will analyze your mistake and create a golden repair path.",
    icon: PenTool,
    color: "text-kintsugi-400",
  },
  {
    target: "examples",
    title: "Try an Example First",
    description:
      "Not sure what to write? Click one of these example buttons to see how it works with a pre-filled mistake in Math, Biology, or Coding.",
    icon: Lightbulb,
    color: "text-amber-400",
  },
  {
    target: "dashboard",
    title: "Track Your Progress",
    description:
      "All your repaired concepts appear on the Repair Path. Watch your mastery grow as you practice and learn from each mistake.",
    icon: LayoutDashboard,
    color: "text-emerald-400",
  },
  {
    target: "practice",
    title: "Practice & Master",
    description:
      "Each repair comes with practice questions. Answer them to turn your fractures into golden mastery. Score 70%+ to mark a concept as repaired!",
    icon: Trophy,
    color: "text-purple-400",
  },
];

interface OnboardingTourProps {
  onComplete: () => void;
}

export default function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const step = tourSteps[currentStep];

  const updateTargetRect = useCallback(() => {
    const el = document.querySelector(`[data-tour-step="${step.target}"]`);
    if (el) {
      setTargetRect(el.getBoundingClientRect());
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      setTargetRect(null);
    }
  }, [step.target]);

  useEffect(() => {
    // Small delay to let scroll finish
    const timeout = setTimeout(updateTargetRect, 300);
    window.addEventListener("resize", updateTargetRect);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateTargetRect);
    };
  }, [updateTargetRect]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      onComplete();
    }
  };

  const isLast = currentStep === tourSteps.length - 1;
  const Icon = step.icon;

  // Calculate tooltip position relative to target
  const padding = 12;
  const spotlightPadding = 8;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Dark overlay with spotlight cutout */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
        <defs>
          <mask id="tour-spotlight">
            <rect width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left - spotlightPadding}
                y={targetRect.top - spotlightPadding}
                width={targetRect.width + spotlightPadding * 2}
                height={targetRect.height + spotlightPadding * 2}
                rx="12"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.75)"
          mask="url(#tour-spotlight)"
        />
      </svg>

      {/* Spotlight border glow */}
      {targetRect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute rounded-xl border-2 border-kintsugi-400/40 shadow-[0_0_20px_rgba(212,165,116,0.15)]"
          style={{
            left: targetRect.left - spotlightPadding,
            top: targetRect.top - spotlightPadding,
            width: targetRect.width + spotlightPadding * 2,
            height: targetRect.height + spotlightPadding * 2,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Click blocker (allows clicking skip/next but blocks page interaction) */}
      <div className="absolute inset-0" onClick={(e) => e.stopPropagation()} />

      {/* Tooltip card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="absolute z-10 w-80 sm:w-96"
          style={getTooltipPosition(targetRect, padding)}
        >
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/50 overflow-hidden">
            {/* Gold accent */}
            <div className="h-0.5 bg-gradient-to-r from-transparent via-kintsugi-400/60 to-transparent" />

            <div className="p-5">
              {/* Step header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-800">
                    <Icon className={`h-5 w-5 ${step.color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-500">
                      Step {currentStep + 1} of {tourSteps.length}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onComplete}
                  className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                {step.description}
              </p>

              {/* Step dots + actions */}
              <div className="flex items-center justify-between">
                {/* Dots */}
                <div className="flex gap-1.5">
                  {tourSteps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentStep
                          ? "w-6 bg-kintsugi-400"
                          : i < currentStep
                            ? "w-1.5 bg-kintsugi-400/40"
                            : "w-1.5 bg-zinc-700"
                      }`}
                    />
                  ))}
                </div>

                {/* Next button */}
                <Button
                  variant="gold"
                  size="sm"
                  onClick={handleNext}
                  className="text-xs"
                >
                  {isLast ? "Finish" : "Next"}
                  {!isLast && <ArrowRight className="h-3 w-3 ml-1" />}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function getTooltipPosition(
  rect: DOMRect | null,
  padding: number
): React.CSSProperties {
  if (!rect) {
    // Center on screen if no target found
    return {
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    };
  }

  const tooltipWidth = 384; // max-w-96 = 24rem = 384px
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  // Prefer placing below the target
  const spaceBelow = viewportHeight - rect.bottom;
  const spaceAbove = rect.top;

  let top: number;
  if (spaceBelow > 200) {
    top = rect.bottom + padding;
  } else if (spaceAbove > 200) {
    top = rect.top - padding - 200;
  } else {
    top = Math.max(padding, rect.top + rect.height / 2 - 100);
  }

  // Horizontal: align to left of target, but keep within viewport
  let left = rect.left;
  if (left + tooltipWidth > viewportWidth - padding) {
    left = viewportWidth - tooltipWidth - padding;
  }
  if (left < padding) {
    left = padding;
  }

  return { top, left };
}
