"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Trophy,
  RotateCw,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PracticeQuestion, RepairAnalysis } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PracticeModeProps {
  repair: RepairAnalysis;
  onComplete: (correct: number, total: number) => void;
}

export default function PracticeMode({ repair, onComplete }: PracticeModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const questions = repair.practiceQuestions;
  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;
  const progressPercent = ((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100;

  const handleAnswer = useCallback(
    (answer: string) => {
      if (showResult) return;
      setSelectedAnswer(answer);
      setShowResult(true);
      if (answer === currentQuestion.correctAnswer) {
        setCorrectCount((c) => c + 1);
      }
    },
    [showResult, currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      const finalCorrect = correctCount + (isCorrect ? 0 : 0); // already counted
      setCompleted(true);
      onComplete(correctCount, questions.length);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [currentIndex, questions.length, correctCount, isCorrect, onComplete]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setCompleted(false);
  }, []);

  // Completion screen
  if (completed) {
    const score = Math.round((correctCount / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <Card className="border-kintsugi-400/20 gold-glow">
          <CardContent className="p-8 text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            >
              <div className="inline-flex p-4 rounded-full bg-kintsugi-400/10 mb-2">
                {score >= 70 ? (
                  <Trophy className="h-12 w-12 text-gold-glow" />
                ) : (
                  <Sparkles className="h-12 w-12 text-kintsugi-400" />
                )}
              </div>
            </motion.div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-100 mb-2">
                {score >= 70 ? "Excellent Work!" : "Good Effort!"}
              </h2>
              <p className="text-zinc-400">
                {score >= 70
                  ? "Your understanding is being repaired beautifully."
                  : "Every attempt strengthens the golden repair. Keep going!"}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-4xl font-bold text-gold-gradient">
              {correctCount}/{questions.length}
            </div>

            <p className="text-sm text-zinc-500">
              {score}% accuracy on {repair.subject}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button variant="outline" onClick={handleRestart}>
                <RotateCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <Badge variant="gold">{repair.subject}</Badge>
          <span className="text-zinc-500">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progressPercent} className="h-1.5" />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-zinc-800/50">
            <CardHeader>
              <CardTitle className="text-lg text-zinc-100 leading-relaxed">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Answer options */}
              {currentQuestion.options?.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrectOption = option === currentQuestion.correctAnswer;
                let optionStyle = "border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/50";

                if (showResult) {
                  if (isCorrectOption) {
                    optionStyle = "border-emerald-500/50 bg-emerald-500/10";
                  } else if (isSelected && !isCorrectOption) {
                    optionStyle = "border-red-500/50 bg-red-500/10";
                  } else {
                    optionStyle = "border-zinc-800/50 opacity-50";
                  }
                } else if (isSelected) {
                  optionStyle = "border-kintsugi-400/50 bg-kintsugi-400/10";
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    className={cn(
                      "w-full text-left p-4 rounded-lg border transition-all duration-200 text-sm",
                      optionStyle
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-200">{option}</span>
                      {showResult && isCorrectOption && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                      )}
                      {showResult && isSelected && !isCorrectOption && (
                        <XCircle className="h-5 w-5 text-red-400 shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}

              {/* Explanation (shown after answering) */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <div
                      className={cn(
                        "p-4 rounded-lg border text-sm",
                        isCorrect
                          ? "border-emerald-500/20 bg-emerald-500/5"
                          : "border-amber-500/20 bg-amber-500/5"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-amber-400" />
                        )}
                        <span
                          className={cn(
                            "font-medium",
                            isCorrect ? "text-emerald-400" : "text-amber-400"
                          )}
                        >
                          {isCorrect ? "Correct!" : "Not quite right"}
                        </span>
                      </div>
                      <p className="text-zinc-300">
                        {currentQuestion.explanation}
                      </p>
                    </div>

                    <Button
                      variant="gold"
                      size="lg"
                      className="w-full mt-4"
                      onClick={handleNext}
                    >
                      {currentIndex + 1 >= questions.length ? (
                        <>
                          <Trophy className="h-4 w-4 mr-2" />
                          See Results
                        </>
                      ) : (
                        <>
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Next Question
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
