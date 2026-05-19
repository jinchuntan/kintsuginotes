"use client";

import { motion } from "framer-motion";
import { Sparkles, AlertCircle, RotateCw, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RepairAnalysis, RepairStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface KintsugiCardProps {
  repair: RepairAnalysis;
  onStatusChange?: (id: string, status: RepairStatus) => void;
  onClick?: () => void;
  compact?: boolean;
}

const statusConfig: Record<
  RepairStatus,
  { label: string; icon: React.ElementType; variant: "outline" | "warning" | "gold" | "success"; color: string }
> = {
  not_started: {
    label: "Not Started",
    icon: AlertCircle,
    variant: "outline",
    color: "text-zinc-400",
  },
  repairing: {
    label: "Repairing",
    icon: RotateCw,
    variant: "warning",
    color: "text-amber-400",
  },
  repaired: {
    label: "Repaired",
    icon: CheckCircle2,
    variant: "success",
    color: "text-emerald-400",
  },
};

export default function KintsugiCard({
  repair,
  onStatusChange,
  onClick,
  compact = false,
}: KintsugiCardProps) {
  const status = statusConfig[repair.repairStatus];
  const StatusIcon = status.icon;
  const isRepaired = repair.repairStatus === "repaired";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "relative overflow-hidden cursor-pointer transition-all duration-300 group",
          isRepaired && "repaired-glow border-kintsugi-400/30",
          !isRepaired && "hover:border-zinc-700 kintsugi-crack"
        )}
        onClick={onClick}
      >
        {/* Gold repair line decorations */}
        {isRepaired && (
          <>
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-kintsugi-400/40 to-transparent" />
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-kintsugi-400/30 to-transparent" />
          </>
        )}

        {/* Crack decorations for unrepaired cards */}
        {!isRepaired && (
          <>
            <div className="absolute top-0 right-1/3 w-px h-2/3 bg-gradient-to-b from-zinc-600/30 via-zinc-600/20 to-transparent rotate-[15deg]" />
            <div className="absolute bottom-0 left-1/4 w-px h-1/2 bg-gradient-to-t from-zinc-600/30 via-zinc-600/20 to-transparent rotate-[-10deg]" />
          </>
        )}

        <CardContent className={cn("relative z-10", compact ? "p-4" : "p-6")}>
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={status.variant} className="text-xs">
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {status.label}
                </Badge>
              </div>
              <h3
                className={cn(
                  "font-semibold truncate",
                  compact ? "text-sm" : "text-base",
                  isRepaired ? "text-kintsugi-300" : "text-zinc-200"
                )}
              >
                {repair.subject}
              </h3>
            </div>
            {isRepaired && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <Sparkles className="h-5 w-5 text-gold-glow" />
              </motion.div>
            )}
          </div>

          {/* Mistake preview */}
          {!compact && (
            <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
              {repair.originalMistake}
            </p>
          )}

          {/* Confidence / Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500">Confidence</span>
              <span className={cn("font-medium", status.color)}>
                {repair.confidenceScore}%
              </span>
            </div>
            <Progress
              value={repair.confidenceScore}
              className="h-1.5"
              indicatorClassName={cn(
                isRepaired
                  ? "from-emerald-600 to-emerald-400"
                  : "from-kintsugi-600 to-gold-glow"
              )}
            />
          </div>

          {/* Quick action */}
          {onStatusChange && !compact && (
            <div className="mt-4 flex gap-2">
              {repair.repairStatus === "not_started" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(repair.id, "repairing");
                  }}
                >
                  Start Repair
                </Button>
              )}
              {repair.repairStatus === "repairing" && (
                <Button
                  variant="gold"
                  size="sm"
                  className="w-full text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(repair.id, "repaired");
                  }}
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  Mark as Repaired
                </Button>
              )}
              {repair.repairStatus === "repaired" && (
                <p className="text-xs text-emerald-400/70 text-center w-full py-1">
                  Golden repair complete
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
