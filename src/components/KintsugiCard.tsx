"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, AlertCircle, RotateCw, CheckCircle2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import CrackPattern from "@/components/CrackPattern";
import GoldSparkle from "@/components/GoldSparkle";
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
    label: "Fractured",
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
  const [showSparkle, setShowSparkle] = useState(false);
  const status = statusConfig[repair.repairStatus];
  const StatusIcon = status.icon;
  const isRepaired = repair.repairStatus === "repaired";
  const isRepairing = repair.repairStatus === "repairing";

  const handleRepair = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (repair.repairStatus === "repairing") {
      setShowSparkle(true);
      setTimeout(() => {
        onStatusChange?.(repair.id, "repaired");
      }, 300);
    } else {
      onStatusChange?.(repair.id, "repairing");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      {/* Celebration sparkle effect */}
      <GoldSparkle
        active={showSparkle}
        onComplete={() => setShowSparkle(false)}
      />

      <Card
        className={cn(
          "relative overflow-hidden cursor-pointer transition-all duration-500 group",
          isRepaired && "border-kintsugi-400/40 repaired-glow",
          isRepairing && "border-amber-500/20",
          !isRepaired && !isRepairing && "hover:border-zinc-700"
        )}
        onClick={onClick}
      >
        {/* SVG crack pattern overlay */}
        <CrackPattern status={repair.repairStatus} />

        {/* Subtle gold shimmer on repaired cards */}
        {isRepaired && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-kintsugi-400/5 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            style={{ width: "200%" }}
          />
        )}

        <CardContent className={cn("relative z-10", compact ? "p-4" : "p-5")}>
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <Badge variant={status.variant} className="text-xs mb-2">
                <StatusIcon className={cn("h-3 w-3 mr-1", isRepairing && "animate-spin")} />
                {status.label}
              </Badge>
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
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
              >
                <Sparkles className="h-5 w-5 text-gold-glow drop-shadow-[0_0_6px_rgba(245,200,66,0.5)]" />
              </motion.div>
            )}
          </div>

          {/* Mistake preview */}
          {!compact && (
            <p className="text-sm text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
              &ldquo;{repair.originalMistake}&rdquo;
            </p>
          )}

          {/* Confidence / Progress */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500">Repair Progress</span>
              <span className={cn("font-medium", status.color)}>
                {repair.confidenceScore}%
              </span>
            </div>
            <Progress
              value={repair.confidenceScore}
              className="h-2"
              indicatorClassName={cn(
                isRepaired
                  ? "from-emerald-600 to-emerald-400"
                  : isRepairing
                  ? "from-amber-600 to-amber-400"
                  : "from-kintsugi-600 to-gold-glow"
              )}
            />
          </div>

          {/* Actions */}
          {onStatusChange && (
            <div className="flex gap-2">
              {repair.repairStatus === "not_started" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={handleRepair}
                >
                  Start Repair
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              )}
              {repair.repairStatus === "repairing" && (
                <Button
                  variant="gold"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={handleRepair}
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  Complete Repair
                </Button>
              )}
              {repair.repairStatus === "repaired" && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400/80 w-full justify-center py-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Golden repair complete
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
