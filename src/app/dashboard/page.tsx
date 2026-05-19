"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, PenTool } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import ProgressSummary from "@/components/ProgressSummary";
import KintsugiCard from "@/components/KintsugiCard";
import Reflection from "@/components/Reflection";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/lib/store";
import { RepairStatus } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const { state, updateRepairStatus } = useAppState();

  const handleStatusChange = (id: string, status: RepairStatus) => {
    const confidenceMap: Record<RepairStatus, number> = {
      not_started: 15,
      repairing: 50,
      repaired: 100,
    };
    updateRepairStatus(id, status, confidenceMap[status]);

    if (status === "repaired") {
      toast.success("Concept repaired!", {
        description: "The golden repair is complete. Beautiful work!",
      });
    } else if (status === "repairing") {
      toast.info("Repair started", {
        description: "Keep working — you're building understanding!",
      });
    }
  };

  const handleCardClick = (repairId: string) => {
    const repair = state.repairs.find((r) => r.id === repairId);
    if (repair) {
      // Navigate to practice for this repair
      router.push("/practice");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                Repair Path
              </h1>
              <p className="text-zinc-500 mt-1">
                Your learning fractures, being repaired with gold.
              </p>
            </div>
            <Button
              variant="gold"
              onClick={() => router.push("/workspace")}
            >
              <PenTool className="h-4 w-4 mr-2" />
              New Repair
            </Button>
          </div>

          {/* Progress Summary */}
          <ProgressSummary repairs={state.repairs} />

          {/* Repair cards grid */}
          {state.repairs.length > 0 ? (
            <div>
              <h2 className="text-lg font-semibold text-zinc-200 mb-4">
                Your Concepts
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {state.repairs.map((repair) => (
                  <KintsugiCard
                    key={repair.id}
                    repair={repair}
                    onStatusChange={handleStatusChange}
                    onClick={() => handleCardClick(repair.id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Empty state */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="inline-flex p-4 rounded-full bg-zinc-900 mb-4">
                <Sparkles className="h-8 w-8 text-zinc-600" />
              </div>
              <h3 className="text-lg font-medium text-zinc-300 mb-2">
                No repairs yet
              </h3>
              <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">
                Start by submitting a mistake in the workspace. Each mistake
                becomes a beautiful repair card on your learning path.
              </p>
              <Button
                variant="outline"
                onClick={() => router.push("/workspace")}
              >
                <PenTool className="h-4 w-4 mr-2" />
                Go to Workspace
              </Button>
            </motion.div>
          )}

          {/* Reflection */}
          {state.repairs.length > 0 && (
            <Reflection
              repairsToday={state.repairs.length}
              practiceToday={
                Object.values(state.practiceProgress).reduce(
                  (sum, p) => sum + p.questionsAnswered,
                  0
                )
              }
            />
          )}
        </div>
      </main>
    </div>
  );
}
