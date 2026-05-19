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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MarkdownRenderer from "@/components/MarkdownRenderer";
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
    bgColor: "bg-red-400/10",
    borderColor: "border-red-900/30",
    accentColor: "border-l-red-400/50",
  },
  {
    key: "whyItHappened",
    title: "Why It Happened",
    icon: HelpCircle,
    iconColor: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-900/30",
    accentColor: "border-l-amber-400/50",
  },
  {
    key: "goldenRepair",
    title: "Golden Repair",
    icon: Sparkles,
    iconColor: "text-kintsugi-400",
    bgColor: "bg-kintsugi-400/10",
    borderColor: "border-kintsugi-900/30",
    accentColor: "border-l-kintsugi-400/50",
  },
  {
    key: "miniLesson",
    title: "Mini Lesson",
    icon: BookOpen,
    iconColor: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-900/30",
    accentColor: "border-l-blue-400/50",
  },
  {
    key: "memoryHook",
    title: "Memory Hook",
    icon: Brain,
    iconColor: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-900/30",
    accentColor: "border-l-purple-400/50",
  },
  {
    key: "nextStep",
    title: "Next Step",
    icon: ArrowRight,
    iconColor: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-900/30",
    accentColor: "border-l-emerald-400/50",
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
      {/* Header card with gold accent */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-kintsugi-400/30 gold-glow overflow-hidden">
          {/* Gold top border accent */}
          <div className="h-1 bg-gradient-to-r from-kintsugi-600 via-gold-glow to-kintsugi-600" />
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <motion.div
                className="p-3 rounded-xl bg-kintsugi-400/10 shrink-0"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="h-6 w-6 text-kintsugi-400" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h2 className="text-xl font-bold text-zinc-100">
                    Repair Analysis Complete
                  </h2>
                  <Badge variant="gold">{analysis.subject}</Badge>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Your mistake: &ldquo;{analysis.originalMistake}&rdquo;
                </p>
                {analysis.goal && (
                  <p className="text-xs text-zinc-500 mt-1">
                    Goal: {analysis.goal}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Gold connecting line between sections */}
      <div className="relative">
        {/* Vertical gold repair line */}
        <div className="absolute left-7 top-0 bottom-0 w-px hidden sm:block">
          <motion.div
            className="w-full h-full bg-gradient-to-b from-kintsugi-400/40 via-kintsugi-400/20 to-kintsugi-400/40"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ transformOrigin: "top" }}
          />
        </div>

        <div className="space-y-3 sm:pl-4">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const content = analysis[section.key as keyof RepairAnalysisType] as string;
            if (!content) return null;

            return (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.12 }}
              >
                <Card className={`${section.borderColor} border border-l-4 ${section.accentColor} transition-all duration-300`}>
                  <CardHeader className="pb-2 pt-4 px-5">
                    <CardTitle className="flex items-center gap-2.5 text-sm">
                      <div className={`p-1.5 rounded-lg ${section.bgColor}`}>
                        <Icon className={`h-4 w-4 ${section.iconColor}`} />
                      </div>
                      <span className="text-zinc-200 font-semibold">{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-5 pb-4">
                    <MarkdownRenderer content={content} />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Practice questions preview */}
      {analysis.practiceQuestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="border-indigo-900/30 border border-l-4 border-l-indigo-400/50">
            <CardHeader className="pb-2 pt-4 px-5">
              <CardTitle className="flex items-center gap-2.5 text-sm">
                <div className="p-1.5 rounded-lg bg-indigo-400/10">
                  <Lightbulb className="h-4 w-4 text-indigo-400" />
                </div>
                <span className="text-zinc-200 font-semibold">
                  Practice Questions
                </span>
                <Badge variant="outline" className="ml-auto text-xs">
                  {analysis.practiceQuestions.length} questions
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <ul className="space-y-2">
                {analysis.practiceQuestions.map((q, i) => (
                  <li
                    key={q.id}
                    className="flex items-start gap-2.5 text-sm text-zinc-400"
                  >
                    <span className="text-indigo-400/60 font-mono text-xs mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
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
        transition={{ delay: 1 }}
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
