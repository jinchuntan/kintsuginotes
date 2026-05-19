"use client";

import { motion } from "framer-motion";
import { Sparkles, Target, TrendingUp, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RepairAnalysis } from "@/lib/types";
import { calculateMasteryScore } from "@/lib/utils";

interface ProgressSummaryProps {
  repairs: RepairAnalysis[];
}

export default function ProgressSummary({ repairs }: ProgressSummaryProps) {
  const mastery = calculateMasteryScore(repairs);
  const totalRepaired = repairs.filter(
    (r) => r.repairStatus === "repaired"
  ).length;
  const totalRepairing = repairs.filter(
    (r) => r.repairStatus === "repairing"
  ).length;
  const totalNotStarted = repairs.filter(
    (r) => r.repairStatus === "not_started"
  ).length;

  const stats = [
    {
      label: "Mastery Score",
      value: `${mastery}%`,
      icon: Award,
      color: "text-kintsugi-400",
      bgColor: "bg-kintsugi-400/10",
    },
    {
      label: "Repaired",
      value: totalRepaired,
      icon: Sparkles,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
    },
    {
      label: "In Progress",
      value: totalRepairing,
      icon: TrendingUp,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
    },
    {
      label: "To Repair",
      value: totalNotStarted,
      icon: Target,
      color: "text-zinc-400",
      bgColor: "bg-zinc-400/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Mastery progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-kintsugi-400/20 gold-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">
                  Repair Progress
                </h3>
                <p className="text-sm text-zinc-500">
                  {repairs.length === 0
                    ? "Start by submitting a mistake to repair"
                    : `${totalRepaired} of ${repairs.length} concepts repaired`}
                </p>
              </div>
              <div className="text-3xl font-bold text-gold-gradient">
                {mastery}%
              </div>
            </div>
            <Progress value={mastery} className="h-3" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-zinc-800/50">
                <CardContent className="p-4 text-center">
                  <div
                    className={`inline-flex p-2 rounded-lg ${stat.bgColor} mb-2`}
                  >
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-zinc-100">
                    {stat.value}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
