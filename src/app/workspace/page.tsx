"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import MistakeInput from "@/components/MistakeInput";
import RepairAnalysisComponent from "@/components/RepairAnalysis";
import LoadingAnimation from "@/components/LoadingAnimation";
import Reflection from "@/components/Reflection";
import KintsugiCard from "@/components/KintsugiCard";
import { useAppState } from "@/lib/store";
import { MistakeInput as MistakeInputType, RepairAnalysis } from "@/lib/types";
import { Sparkles, History } from "lucide-react";

export default function WorkspacePage() {
  const router = useRouter();
  const { state, addRepair, updateRepairStatus } = useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<RepairAnalysis | null>(null);
  const analysisRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (input: MistakeInputType) => {
    setIsLoading(true);
    setCurrentAnalysis(null);

    try {
      // Call the API route (keeps AI keys server-side)
      const response = await fetch("/api/repair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Failed to generate analysis");
      }

      const analysis: RepairAnalysis = await response.json();
      setCurrentAnalysis(analysis);
      addRepair(analysis);

      toast.success("Repair analysis complete!", {
        description: `Fracture detected in ${analysis.subject}`,
      });

      // Scroll to analysis after a short delay
      setTimeout(() => {
        analysisRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartPractice = () => {
    if (currentAnalysis) {
      updateRepairStatus(currentAnalysis.id, "repairing", 40);
      router.push("/practice");
    }
  };

  const handleAddToDashboard = () => {
    if (currentAnalysis) {
      updateRepairStatus(currentAnalysis.id, "repairing", 30);
      toast.success("Added to your Repair Path!", {
        description: "Track your progress on the dashboard.",
      });
      router.push("/dashboard");
    }
  };

  // Previous repairs for sidebar
  const recentRepairs = state.repairs.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Main content area */}
          <div className="space-y-8">
            {/* Page header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                Learning Workspace
              </h1>
              <p className="text-zinc-500 mt-1">
                Submit a mistake, wrong answer, or confusing topic to begin your golden repair.
              </p>
            </div>

            {/* Input section */}
            <MistakeInput onSubmit={handleSubmit} isLoading={isLoading} />

            {/* Loading state */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <LoadingAnimation />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Analysis result */}
            <div ref={analysisRef}>
              <AnimatePresence>
                {currentAnalysis && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <RepairAnalysisComponent
                      analysis={currentAnalysis}
                      onStartPractice={handleStartPractice}
                      onAddToDashboard={handleAddToDashboard}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Reflection */}
            {state.repairs.length > 0 && !isLoading && (
              <Reflection repairsToday={state.repairs.length} />
            )}
          </div>

          {/* Sidebar — recent repairs */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <History className="h-4 w-4" />
                <span>Recent Repairs</span>
              </div>

              {recentRepairs.length > 0 ? (
                <div className="space-y-3">
                  {recentRepairs.map((repair) => (
                    <KintsugiCard
                      key={repair.id}
                      repair={repair}
                      compact
                      onClick={() => {
                        setCurrentAnalysis(repair);
                        analysisRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 px-4 rounded-xl border border-zinc-800/50 bg-zinc-900/30">
                  <Sparkles className="h-6 w-6 text-zinc-700 mx-auto mb-2" />
                  <p className="text-xs text-zinc-600">
                    Your repaired concepts will appear here
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
