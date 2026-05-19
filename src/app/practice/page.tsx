"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, ArrowLeft, Sparkles, Trophy } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import PracticeMode from "@/components/PracticeMode";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppState } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function PracticePage() {
  return (
    <Suspense>
      <PracticePageContent />
    </Suspense>
  );
}

function PracticePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, updateRepairStatus, updatePractice } = useAppState();
  const [selectedRepairId, setSelectedRepairId] = useState<string | null>(null);

  // Auto-select repair from URL query param (from dashboard click)
  useEffect(() => {
    const id = searchParams.get("id");
    if (id && state.repairs.find((r) => r.id === id)) {
      setSelectedRepairId(id);
    }
  }, [searchParams, state.repairs]);

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
    if (score >= 70) {
      updateRepairStatus(selectedRepairId, "repaired", 100);
      toast.success("Concept mastered!", {
        description: "This fracture has been beautifully repaired with gold.",
      });
    } else if (score >= 40) {
      updateRepairStatus(selectedRepairId, "repairing", Math.max(50, score));
      toast.info("Making progress!", {
        description: "Try again to strengthen the repair.",
      });
    } else {
      updateRepairStatus(selectedRepairId, "repairing", 30);
      toast.info("Keep practicing!", {
        description: "Each attempt makes the repair stronger.",
      });
    }
  };

  const handleBack = () => {
    setSelectedRepairId(null);
    // Clear the URL param
    router.replace("/practice");
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
                onClick={handleBack}
                className="shrink-0"
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
                  ? "Answer questions to strengthen your golden repair."
                  : "Choose a concept to practice and reinforce your learning."}
              </p>
            </div>
          </div>

          {/* Practice view */}
          {selectedRepair ? (
            <PracticeMode
              key={selectedRepairId}
              repair={selectedRepair}
              onComplete={handlePracticeComplete}
            />
          ) : repairsWithQuestions.length > 0 ? (
            /* Topic selection */
            <div className="space-y-6">
              {/* Overall practice stats */}
              {Object.keys(state.practiceProgress).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="border-kintsugi-400/20">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-kintsugi-400/10">
                          <Trophy className="h-5 w-5 text-kintsugi-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-zinc-300 font-medium">
                            Practice Progress
                          </p>
                          <p className="text-xs text-zinc-500">
                            {Object.values(state.practiceProgress).filter((p) => p.completed).length}{" "}
                            of {repairsWithQuestions.length} topics practiced
                          </p>
                        </div>
                        <div className="w-32">
                          <Progress
                            value={
                              (Object.values(state.practiceProgress).filter((p) => p.completed).length /
                                repairsWithQuestions.length) *
                              100
                            }
                            className="h-2"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                {repairsWithQuestions.map((repair, i) => {
                  const progress = state.practiceProgress[repair.id];
                  const hasCompleted = progress?.completed;
                  const score = hasCompleted
                    ? Math.round(
                        (progress.questionsCorrect / progress.questionsAnswered) * 100
                      )
                    : 0;

                  return (
                    <motion.div
                      key={repair.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card
                        className={cn(
                          "cursor-pointer transition-all duration-300 hover:border-kintsugi-400/30 hover:shadow-lg hover:shadow-kintsugi-400/5 group",
                          hasCompleted && score >= 70 && "border-emerald-500/20",
                          hasCompleted && score < 70 && "border-amber-500/20"
                        )}
                        onClick={() => setSelectedRepairId(repair.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="p-2.5 rounded-lg bg-kintsugi-400/10 group-hover:bg-kintsugi-400/15 transition-colors">
                              <BookOpen className="h-5 w-5 text-kintsugi-400" />
                            </div>
                            {hasCompleted && (
                              <Badge
                                variant={score >= 70 ? "success" : "warning"}
                              >
                                {progress.questionsCorrect}/
                                {progress.questionsAnswered} ({score}%)
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-zinc-100 mb-1">
                            {repair.subject}
                          </h3>
                          <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
                            &ldquo;{repair.originalMistake}&rdquo;
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-zinc-500">
                              {repair.practiceQuestions.length} questions
                            </span>
                            <Button
                              variant={hasCompleted ? "outline" : "gold"}
                              size="sm"
                              className="text-xs"
                            >
                              {hasCompleted ? "Practice Again" : "Start Practice"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Empty state */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-kintsugi-400/10 rounded-full blur-xl" />
                <div className="relative inline-flex p-5 rounded-full bg-zinc-900 border border-zinc-800">
                  <Sparkles className="h-10 w-10 text-zinc-600" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-zinc-300 mb-2">
                No practice available yet
              </h3>
              <p className="text-sm text-zinc-500 max-w-md mx-auto mb-8">
                Submit a mistake in the workspace first. Each repair comes
                with practice questions to reinforce your understanding.
              </p>
              <Button
                variant="gold"
                size="lg"
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
