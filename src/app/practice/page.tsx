"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import PracticeMode from "@/components/PracticeMode";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppState } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function PracticePage() {
  const router = useRouter();
  const { state, updateRepairStatus, updatePractice } = useAppState();
  const [selectedRepairId, setSelectedRepairId] = useState<string | null>(null);

  const selectedRepair = state.repairs.find((r) => r.id === selectedRepairId);
  const repairsWithQuestions = state.repairs.filter(
    (r) => r.practiceQuestions.length > 0
  );

  const handlePracticeComplete = (correct: number, total: number) => {
    if (!selectedRepairId) return;

    const score = Math.round((correct / total) * 100);
    updatePractice(selectedRepairId, {
      repairId: selectedRepairId,
      questionsAnswered: total,
      questionsCorrect: correct,
      completed: true,
    });

    // Update confidence based on practice performance
    const newConfidence = Math.min(100, score);
    if (score >= 70) {
      updateRepairStatus(selectedRepairId, "repaired", newConfidence);
      toast.success("Concept mastered!", {
        description: "This fracture has been beautifully repaired with gold.",
      });
    } else {
      updateRepairStatus(selectedRepairId, "repairing", Math.max(30, newConfidence));
      toast.info("Keep practicing!", {
        description: "You're making progress. Try again to strengthen the repair.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            {selectedRepair && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedRepairId(null)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                {selectedRepair
                  ? `Practice: ${selectedRepair.subject}`
                  : "Practice Mode"}
              </h1>
              <p className="text-zinc-500 mt-1">
                {selectedRepair
                  ? "Answer questions to strengthen your repair."
                  : "Choose a concept to practice and reinforce your learning."}
              </p>
            </div>
          </div>

          {/* Practice view */}
          {selectedRepair ? (
            <PracticeMode
              repair={selectedRepair}
              onComplete={handlePracticeComplete}
            />
          ) : repairsWithQuestions.length > 0 ? (
            /* Topic selection */
            <div className="grid sm:grid-cols-2 gap-4">
              {repairsWithQuestions.map((repair, i) => {
                const progress = state.practiceProgress[repair.id];
                const hasCompleted = progress?.completed;

                return (
                  <motion.div
                    key={repair.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card
                      className={cn(
                        "cursor-pointer transition-all hover:border-kintsugi-400/30",
                        hasCompleted && "border-emerald-500/20"
                      )}
                      onClick={() => setSelectedRepairId(repair.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2 rounded-lg bg-kintsugi-400/10">
                            <BookOpen className="h-5 w-5 text-kintsugi-400" />
                          </div>
                          {hasCompleted && (
                            <Badge variant="success">
                              {progress.questionsCorrect}/{progress.questionsAnswered} correct
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-zinc-100 mb-1">
                          {repair.subject}
                        </h3>
                        <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
                          {repair.originalMistake}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-500">
                            {repair.practiceQuestions.length} questions
                          </span>
                          <Button variant="outline" size="sm" className="text-xs">
                            {hasCompleted ? "Practice Again" : "Start Practice"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
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
                No practice available yet
              </h3>
              <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">
                Submit a mistake in the workspace first. Each repair comes
                with practice questions to reinforce your understanding.
              </p>
              <Button
                variant="outline"
                onClick={() => router.push("/workspace")}
              >
                Go to Workspace
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
