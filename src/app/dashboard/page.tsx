"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, PenTool, Filter } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import ProgressSummary from "@/components/ProgressSummary";
import KintsugiCard from "@/components/KintsugiCard";
import Reflection from "@/components/Reflection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
        description: "Keep working — you are building understanding!",
      });
    }
  };

  const handleCardClick = (repairId: string) => {
    router.push(`/practice?id=${repairId}`);
  };

  const fractured = state.repairs.filter((r) => r.repairStatus === "not_started");
  const repairing = state.repairs.filter((r) => r.repairStatus === "repairing");
  const repaired = state.repairs.filter((r) => r.repairStatus === "repaired");

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

          {/* Repair cards with tabs */}
          {state.repairs.length > 0 ? (
            <Tabs defaultValue="all" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-zinc-200">
                  Your Concepts
                </h2>
                <TabsList>
                  <TabsTrigger value="all">
                    All ({state.repairs.length})
                  </TabsTrigger>
                  <TabsTrigger value="fractured">
                    Fractured ({fractured.length})
                  </TabsTrigger>
                  <TabsTrigger value="repairing">
                    Repairing ({repairing.length})
                  </TabsTrigger>
                  <TabsTrigger value="repaired">
                    Repaired ({repaired.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {state.repairs.map((repair, i) => (
                    <KintsugiCard
                      key={repair.id}
                      repair={repair}
                      onStatusChange={handleStatusChange}
                      onClick={() => handleCardClick(repair.id)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="fractured">
                {fractured.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fractured.map((repair) => (
                      <KintsugiCard
                        key={repair.id}
                        repair={repair}
                        onStatusChange={handleStatusChange}
                        onClick={() => handleCardClick(repair.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyTab message="No fractured concepts. Great job!" />
                )}
              </TabsContent>

              <TabsContent value="repairing">
                {repairing.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {repairing.map((repair) => (
                      <KintsugiCard
                        key={repair.id}
                        repair={repair}
                        onStatusChange={handleStatusChange}
                        onClick={() => handleCardClick(repair.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyTab message="No concepts being repaired right now." />
                )}
              </TabsContent>

              <TabsContent value="repaired">
                {repaired.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {repaired.map((repair) => (
                      <KintsugiCard
                        key={repair.id}
                        repair={repair}
                        onStatusChange={handleStatusChange}
                        onClick={() => handleCardClick(repair.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyTab message="Complete practice sessions to repair concepts." />
                )}
              </TabsContent>
            </Tabs>
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
                No repairs yet
              </h3>
              <p className="text-sm text-zinc-500 max-w-md mx-auto mb-8">
                Start by submitting a mistake in the workspace. Each mistake
                becomes a beautiful repair card on your learning path.
              </p>
              <Button
                variant="gold"
                size="lg"
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

function EmptyTab({ message }: { message: string }) {
  return (
    <div className="text-center py-12">
      <Filter className="h-6 w-6 text-zinc-700 mx-auto mb-2" />
      <p className="text-sm text-zinc-500">{message}</p>
    </div>
  );
}
