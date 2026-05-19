import { NextRequest, NextResponse } from "next/server";
import { generateRepairAnalysis } from "@/lib/ai-service";

/**
 * POST /api/repair
 * Server-side endpoint for generating repair analyses.
 * Keeps API keys secure on the server. Falls back to mock data if no API key.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, mistake, currentExplanation, goal } = body;

    if (!subject || !mistake) {
      return NextResponse.json(
        { error: "Subject and mistake are required" },
        { status: 400 }
      );
    }

    const analysis = await generateRepairAnalysis({
      subject,
      mistake,
      currentExplanation: currentExplanation || "",
      goal: goal || undefined,
    });

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Repair analysis error:", error);
    return NextResponse.json(
      { error: "Failed to generate repair analysis" },
      { status: 500 }
    );
  }
}
