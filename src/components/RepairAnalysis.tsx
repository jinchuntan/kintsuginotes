"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  HelpCircle,
  Sparkles,
  BookOpen,
  Brain,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RepairAnalysis as RepairAnalysisType } from "@/lib/types";

interface RepairAnalysisProps {
  analysis: RepairAnalysisType;
  onStartPractice?: () => void;
  onAddToDashboard?: () => void;
}

const sections = [
  {
    key: "fractureDetected",
    title: "Fracture Detected",
    icon: AlertTriangle,
    iconColor: "text-red-400",
    bgColor: "bg-red-400/5",
    borderColor: "border-red-400/20",
  },
  {
    key: "whyItHappened",
    title: "Why It Happened",
    icon: HelpCircle,
    iconColor: "text-amber-400",
    bgColor: "bg-amber-400/5",
    borderColor: "border-amber-400/20",
  },
  {
    key: "goldenRepair",
    title: "Golden Repair",
    icon: Sparkles,
    iconColor: "text-kintsugi-400",
    bgColor: "bg-kintsugi-400/5",
    borderColor: "border-kintsugi-400/20",
  },
  {
    key: "miniLesson",
    title: "Mini Lesson",
    icon: BookOpen,
    iconColor: "text-blue-400",
    bgColor: "bg-blue-400/5",
    borderColor: "border-blue-400/20",
  },
  {
    key: "memoryHook",
    title: "Memory Hook",
    icon: Brain,
    iconColor: "text-purple-400",
    bgColor: "bg-purple-400/5",
    borderColor: "border-purple-400/20",
  },
  {
    key: "nextStep",
    title: "Next Step",
    icon: ArrowRight,
    iconColor: "text-emerald-400",
    bgColor: "bg-emerald-400/5",
    borderColor: "border-emerald-400/20",
  },
];

export default function RepairAnalysisComponent({
  analysis,
  onStartPractice,
  onAddToDashboard,
}: RepairAnalysisProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-kintsugi-400/20 gold-glow">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-kintsugi-400/10">
                <Sparkles className="h-6 w-6 text-kintsugi-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-bold text-zinc-100">
                    Repair Analysis
                  </h2>
                  <Badge variant="gold">{analysis.subject}</Badge>
                </div>
                <p className="text-sm text-zinc-400 mt-1">
                  &ldquo;{analysis.originalMistake}&rdquo;
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analysis sections */}
      {sections.map((section, index) => {
        const Icon = section.icon;
        const content = analysis[section.key as keyof RepairAnalysisType] as string;
        if (!content) return null;

        return (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className={`${section.borderColor} border`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className={`p-1.5 rounded-lg ${section.bgColor}`}>
                    <Icon className={`h-4 w-4 ${section.iconColor}`} />
                  </div>
                  <span className="text-zinc-200">{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {content}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}

      {/* Practice questions preview */}
      {analysis.practiceQuestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="border-indigo-400/20 border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <div className="p-1.5 rounded-lg bg-indigo-400/5">
                  <Lightbulb className="h-4 w-4 text-indigo-400" />
                </div>
                <span className="text-zinc-200">
                  Practice Questions ({analysis.practiceQuestions.length})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.practiceQuestions.map((q, i) => (
                  <li
                    key={q.id}
                    className="flex items-start gap-2 text-sm text-zinc-400"
                  >
                    <CheckCircle2 className="h-4 w-4 text-zinc-600 mt-0.5 shrink-0" />
                    <span>{q.question}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col sm:flex-row gap-3 pt-2"
      >
        {onStartPractice && (
          <Button
            variant="gold"
            size="lg"
            onClick={onStartPractice}
            className="flex-1"
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            Start Practice
          </Button>
        )}
        {onAddToDashboard && (
          <Button
            variant="outline"
            size="lg"
            onClick={onAddToDashboard}
            className="flex-1"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Add to Repair Path
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
}
