"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import MistakeInput from "@/components/MistakeInput";
import RepairAnalysisComponent from "@/components/RepairAnalysis";
import LoadingAnimation from "@/components/LoadingAnimation";
import Reflection from "@/components/Reflection";
import { useAppState } from "@/lib/store";
import { generateRepairAnalysis } from "@/lib/ai-service";
import { MistakeInput as MistakeInputType, RepairAnalysis } from "@/lib/types";

export default function WorkspacePage() {
  const router = useRouter();
  const { state, addRepair, updateRepairStatus } = useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<RepairAnalysis | null>(null);

  const handleSubmit = async (input: MistakeInputType) => {
    setIsLoading(true);
    setCurrentAnalysis(null);

    try {
      const analysis = await generateRepairAnalysis(input);
      setCurrentAnalysis(analysis);
      addRepair(analysis);
      toast.success("Repair analysis complete!", {
        description: `Fracture detected in ${analysis.subject}`,
      });
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

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-8">
          {/* Page header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">
              Learning Workspace
            </h1>
            <p className="text-zinc-500 mt-1">
              Submit a mistake, wrong answer, or confusing topic to begin your repair.
            </p>
          </div>

          {/* Input section */}
          <MistakeInput onSubmit={handleSubmit} isLoading={isLoading} />

          {/* Loading state */}
          {isLoading && <LoadingAnimation />}

          {/* Analysis result */}
          {currentAnalysis && !isLoading && (
            <RepairAnalysisComponent
              analysis={currentAnalysis}
              onStartPractice={handleStartPractice}
              onAddToDashboard={handleAddToDashboard}
            />
          )}

          {/* Reflection */}
          {state.repairs.length > 0 && (
            <Reflection repairsToday={state.repairs.length} />
          )}
        </div>
      </main>
    </div>
  );
}
