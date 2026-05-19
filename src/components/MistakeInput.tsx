"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Calculator, Leaf, Code, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MistakeInput as MistakeInputType } from "@/lib/types";
import { exampleMistakes } from "@/lib/mock-data";

const iconMap: Record<string, React.ElementType> = {
  calculator: Calculator,
  leaf: Leaf,
  code: Code,
};

interface MistakeInputProps {
  onSubmit: (input: MistakeInputType) => void;
  isLoading: boolean;
}

export default function MistakeInputComponent({
  onSubmit,
  isLoading,
}: MistakeInputProps) {
  const [subject, setSubject] = useState("");
  const [mistake, setMistake] = useState("");
  const [currentExplanation, setCurrentExplanation] = useState("");
  const [goal, setGoal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !mistake.trim()) return;
    onSubmit({ subject, mistake, currentExplanation, goal });
  };

  const loadExample = (example: (typeof exampleMistakes)[0]) => {
    setSubject(example.subject);
    setMistake(example.mistake);
    setCurrentExplanation(example.currentExplanation);
    setGoal(example.goal);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-zinc-800/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-zinc-100">
            <Lightbulb className="h-5 w-5 text-kintsugi-400" />
            What did you get wrong?
          </CardTitle>
          <p className="text-sm text-zinc-500 mt-1">
            Paste your mistake, wrong answer, or confusing topic. We&apos;ll turn it
            into a golden learning path.
          </p>
        </CardHeader>

        <CardContent>
          {/* Example buttons */}
          <div className="mb-6">
            <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider font-medium">
              Try an example
            </p>
            <div className="flex flex-wrap gap-2">
              {exampleMistakes.map((example) => {
                const Icon = iconMap[example.icon] || Lightbulb;
                return (
                  <Button
                    key={example.label}
                    variant="outline"
                    size="sm"
                    onClick={() => loadExample(example)}
                    className="text-xs"
                    disabled={isLoading}
                  >
                    <Icon className="h-3.5 w-3.5 mr-1.5" />
                    {example.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="e.g., Algebra, Biology, JavaScript..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mistake">
                What I got wrong / confused about *
              </Label>
              <Textarea
                id="mistake"
                placeholder="e.g., I thought (x + 3)² = x² + 9"
                value={mistake}
                onChange={(e) => setMistake(e.target.value)}
                disabled={isLoading}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="explanation">
                My current explanation or answer
              </Label>
              <Textarea
                id="explanation"
                placeholder="e.g., I just squared both terms separately..."
                value={currentExplanation}
                onChange={(e) => setCurrentExplanation(e.target.value)}
                disabled={isLoading}
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">
                Goal{" "}
                <span className="text-zinc-600 font-normal">(optional)</span>
              </Label>
              <Input
                id="goal"
                placeholder="e.g., Prepare for test next week"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full"
              disabled={!subject.trim() || !mistake.trim() || isLoading}
            >
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? "Analyzing..." : "Repair My Learning"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
