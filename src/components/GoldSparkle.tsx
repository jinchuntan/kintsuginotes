"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Spark {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  angle: number;
  distance: number;
}

interface GoldSparkleProps {
  active: boolean;
  x?: number;
  y?: number;
  count?: number;
  onComplete?: () => void;
}

/**
 * Gold sparkle burst effect — triggered when a concept is marked as repaired.
 * Creates a radial burst of gold particles that fade out.
 */
export default function GoldSparkle({
  active,
  x = 50,
  y = 50,
  count = 20,
  onComplete,
}: GoldSparkleProps) {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    if (active) {
      const newSparks: Spark[] = Array.from({ length: count }, (_, i) => ({
        id: i,
        x,
        y,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 0.2,
        angle: (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5,
        distance: Math.random() * 80 + 40,
      }));
      setSparks(newSparks);

      const timer = setTimeout(() => {
        setSparks([]);
        onComplete?.();
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      setSparks([]);
    }
  }, [active, x, y, count, onComplete]);

  return (
    <AnimatePresence>
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute pointer-events-none z-50"
          style={{ left: `${spark.x}%`, top: `${spark.y}%` }}
          initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [1, 0.8, 0],
            x: Math.cos(spark.angle) * spark.distance,
            y: Math.sin(spark.angle) * spark.distance,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: spark.delay,
            ease: "easeOut",
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: spark.size,
              height: spark.size,
              background: `radial-gradient(circle, #f5c842, #d4a574)`,
              boxShadow: `0 0 ${spark.size * 2}px rgba(245, 200, 66, 0.6)`,
            }}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
