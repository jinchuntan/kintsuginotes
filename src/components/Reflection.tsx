"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getRandomQuote } from "@/lib/mock-data";
import { useState, useEffect } from "react";

interface ReflectionProps {
  repairsToday?: number;
  practiceToday?: number;
}

export default function Reflection({
  repairsToday = 0,
  practiceToday = 0,
}: ReflectionProps) {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  if (!quote) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="border-kintsugi-400/10 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 overflow-hidden relative">
        {/* Decorative gold lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-kintsugi-400/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-kintsugi-400/10 to-transparent" />

        <CardContent className="p-6 sm:p-8 relative">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-kintsugi-400/10 shrink-0">
              <Heart className="h-5 w-5 text-kintsugi-400" />
            </div>
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-zinc-200 italic leading-relaxed">
                &ldquo;{quote}&rdquo;
              </p>

              {(repairsToday > 0 || practiceToday > 0) && (
                <div className="flex flex-wrap gap-4 pt-2">
                  {repairsToday > 0 && (
                    <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                      <Sparkles className="h-3.5 w-3.5 text-kintsugi-400" />
                      <span>
                        <span className="text-kintsugi-300 font-medium">
                          {repairsToday}
                        </span>{" "}
                        {repairsToday === 1 ? "repair" : "repairs"} today
                      </span>
                    </div>
                  )}
                  {practiceToday > 0 && (
                    <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                      <Sparkles className="h-3.5 w-3.5 text-kintsugi-400" />
                      <span>
                        <span className="text-kintsugi-300 font-medium">
                          {practiceToday}
                        </span>{" "}
                        {practiceToday === 1 ? "question" : "questions"}{" "}
                        practiced
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
