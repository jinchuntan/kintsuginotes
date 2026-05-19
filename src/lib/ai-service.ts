import { MistakeInput, RepairAnalysis } from "./types";
import { generateMockRepair } from "./mock-data";

/**
 * AI Repair Analysis Service
 *
 * This module provides the AI integration layer for generating repair analyses.
 * It supports optional API integration with OpenAI or Anthropic, with a robust
 * mock fallback for demo/hackathon use.
 *
 * To enable AI:
 * 1. Set AI_PROVIDER in .env.local (openai or anthropic)
 * 2. Set AI_API_KEY in .env.local
 *
 * Without these, the app uses high-quality mock responses.
 */

const AI_PROVIDER = process.env.AI_PROVIDER;
const AI_API_KEY = process.env.AI_API_KEY;

function isAIEnabled(): boolean {
  return !!(AI_PROVIDER && AI_API_KEY);
}

// Build the prompt for the AI model
function buildRepairPrompt(input: MistakeInput): string {
  return `You are an expert tutor using the Kintsugi learning method. A student has made a mistake and needs help understanding it. Analyze their mistake and provide a structured repair analysis.

Student's Input:
- Subject: ${input.subject}
- What they got wrong: ${input.mistake}
- Their current explanation: ${input.currentExplanation}
${input.goal ? `- Their goal: ${input.goal}` : ""}

Provide a JSON response with these fields:
{
  "fractureDetected": "The core misunderstanding (2-3 sentences)",
  "whyItHappened": "Why this mistake is common and what caused it (3-4 sentences)",
  "goldenRepair": "The corrected explanation with clear reasoning (detailed)",
  "miniLesson": "A short teaching section with key concepts (use markdown formatting)",
  "practiceQuestions": [
    {
      "question": "Practice question text",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": "The correct option text",
      "explanation": "Why this is correct"
    }
  ],
  "memoryHook": "One memorable analogy to help remember the concept",
  "nextStep": "What to study next (2-3 sentences)"
}

Include exactly 3 practice questions. Make the response encouraging and educational. Use the kintsugi metaphor where appropriate — mistakes are valuable because they show where learning needs to happen.`;
}

// Call the AI API (abstraction layer for future integration)
async function callAI(prompt: string): Promise<string> {
  if (AI_PROVIDER === "openai") {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) throw new Error(`OpenAI API error: ${response.status}`);
    const data = await response.json();
    return data.choices[0].message.content;
  }

  if (AI_PROVIDER === "anthropic") {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": AI_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok)
      throw new Error(`Anthropic API error: ${response.status}`);
    const data = await response.json();
    return data.content[0].text;
  }

  throw new Error(`Unknown AI provider: ${AI_PROVIDER}`);
}

/**
 * Generate a repair analysis for a student's mistake.
 * Uses AI if configured, otherwise falls back to high-quality mock data.
 */
export async function generateRepairAnalysis(
  input: MistakeInput
): Promise<RepairAnalysis> {
  // Simulate processing time for better UX
  await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

  if (isAIEnabled()) {
    try {
      const prompt = buildRepairPrompt(input);
      const response = await callAI(prompt);
      const parsed = JSON.parse(response);

      return {
        id: crypto.randomUUID(),
        subject: input.subject,
        originalMistake: input.mistake,
        currentExplanation: input.currentExplanation,
        goal: input.goal,
        fractureDetected: parsed.fractureDetected,
        whyItHappened: parsed.whyItHappened,
        goldenRepair: parsed.goldenRepair,
        miniLesson: parsed.miniLesson,
        practiceQuestions: parsed.practiceQuestions.map(
          (q: Record<string, unknown>, i: number) => ({
            id: `pq${i + 1}`,
            ...q,
          })
        ),
        memoryHook: parsed.memoryHook,
        nextStep: parsed.nextStep,
        confidenceScore: 15,
        repairStatus: "not_started",
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("AI API failed, falling back to mock:", error);
      // Fall through to mock
    }
  }

  // Mock fallback — always works, demo-ready
  return generateMockRepair(
    input.subject,
    input.mistake,
    input.currentExplanation,
    input.goal
  );
}
