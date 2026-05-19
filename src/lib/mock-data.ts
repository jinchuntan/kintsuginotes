import { ExampleMistake, RepairAnalysis } from "./types";
import { generateId } from "./utils";

// Preloaded example mistakes for quick demo
export const exampleMistakes: ExampleMistake[] = [
  {
    label: "Use Math Example",
    icon: "calculator",
    subject: "Algebra",
    mistake: "I thought (x + 3)² = x² + 9",
    currentExplanation:
      "I just squared both terms separately, x² and 3² = 9, so x² + 9.",
    goal: "Prepare for algebra test next week",
  },
  {
    label: "Use Biology Example",
    icon: "leaf",
    subject: "Photosynthesis",
    mistake: "I thought plants only take in oxygen",
    currentExplanation:
      "I knew plants need oxygen to live, so I assumed that's what they breathe in.",
    goal: "Understand plant biology for the upcoming exam",
  },
  {
    label: "Use Coding Example",
    icon: "code",
    subject: "JavaScript Loops",
    mistake: "My loop skips the first item in the array",
    currentExplanation:
      "I start my for loop with i = 1 because arrays start at 1, but it seems to skip an element.",
    goal: "Fix my coding project before submission",
  },
];

// High-quality mock repair analyses for demo
export const mockRepairResponses: Record<string, RepairAnalysis> = {
  Algebra: {
    id: generateId(),
    subject: "Algebra",
    originalMistake: "I thought (x + 3)² = x² + 9",
    currentExplanation:
      "I just squared both terms separately, x² and 3² = 9, so x² + 9.",
    goal: "Prepare for algebra test next week",
    fractureDetected:
      "Missing the middle term when expanding a binomial square. You're treating (x + 3)² as x² + 3² instead of applying the full expansion formula (a + b)² = a² + 2ab + b².",
    whyItHappened:
      "This is one of the most common algebra mistakes! Your brain naturally wants to distribute the exponent to each term separately — like how 2 × (3 + 4) distributes. But squaring is multiplication, and (x + 3)² means (x + 3)(x + 3), which requires FOIL or the binomial formula. The middle term 2ab comes from the cross-multiplication that happens when you multiply the two brackets together.",
    goldenRepair:
      "(x + 3)² = (x + 3)(x + 3) = x² + 3x + 3x + 9 = x² + 6x + 9. The correct answer includes the middle term 6x, which comes from multiplying the outer and inner terms. Remember: (a + b)² = a² + 2ab + b². Here, a = x and b = 3, so 2ab = 2(x)(3) = 6x.",
    miniLesson:
      "**The Binomial Square Formula**\n\nWhen you square a binomial (two-term expression), you must account for three terms:\n\n• (a + b)² = a² + 2ab + b²\n• (a - b)² = a² - 2ab + b²\n\n**Why three terms?** Because squaring means multiplying by itself:\n(a + b)² = (a + b)(a + b)\n\nUsing FOIL:\n- **F**irst: a × a = a²\n- **O**uter: a × b = ab\n- **I**nner: b × a = ab\n- **L**ast: b × b = b²\n\nThe Outer and Inner terms combine: ab + ab = 2ab\n\nSo you always get: a² + 2ab + b²",
    practiceQuestions: [
      {
        id: "pq1",
        question: "Expand (x + 5)²",
        correctAnswer: "x² + 10x + 25",
        explanation:
          "Using (a+b)² = a² + 2ab + b²: a=x, b=5, so x² + 2(x)(5) + 25 = x² + 10x + 25",
        options: ["x² + 25", "x² + 10x + 25", "x² + 5x + 25", "2x² + 25"],
      },
      {
        id: "pq2",
        question: "Expand (y - 4)²",
        correctAnswer: "y² - 8y + 16",
        explanation:
          "Using (a-b)² = a² - 2ab + b²: a=y, b=4, so y² - 2(y)(4) + 16 = y² - 8y + 16",
        options: ["y² - 16", "y² + 8y + 16", "y² - 8y + 16", "y² - 4y + 16"],
      },
      {
        id: "pq3",
        question: "What is the middle term when expanding (2x + 3)²?",
        correctAnswer: "12x",
        explanation:
          "Using 2ab where a=2x and b=3: 2(2x)(3) = 12x. Full expansion: 4x² + 12x + 9",
        options: ["6x", "12x", "6x²", "3x"],
      },
    ],
    memoryHook:
      "Think of it like a handshake at a party: when (x + 3) meets (x + 3), everyone has to shake hands with everyone — not just with themselves! The x shakes hands with the 3 (twice!), creating the 6x you were missing. No one gets left out at the FOIL party! 🤝",
    nextStep:
      "Practice expanding 5 more binomial squares with different numbers. Then try trinomial factoring — it's the reverse process where you go from x² + 6x + 9 back to (x + 3)².",
    confidenceScore: 25,
    repairStatus: "not_started",
    createdAt: new Date().toISOString(),
  },
  Photosynthesis: {
    id: generateId(),
    subject: "Photosynthesis",
    originalMistake: "I thought plants only take in oxygen",
    currentExplanation:
      "I knew plants need oxygen to live, so I assumed that's what they breathe in.",
    goal: "Understand plant biology for the upcoming exam",
    fractureDetected:
      "Confusing cellular respiration (which uses oxygen) with photosynthesis (which produces oxygen). Plants actually take in carbon dioxide (CO₂) for photosynthesis and release oxygen (O₂) as a byproduct.",
    whyItHappened:
      "This confusion happens because plants DO use oxygen — but for cellular respiration, not photosynthesis. You're mixing up two separate processes that happen in plants. It's like confusing a factory's raw materials with its finished products. Since we humans breathe in oxygen, it's natural to assume plants do the same — but plants are actually the ones MAKING the oxygen we breathe!",
    goldenRepair:
      "Plants perform TWO key processes:\n\n1. **Photosynthesis** (in chloroplasts, with sunlight): CO₂ + H₂O → Glucose + O₂\n   - Takes IN: Carbon dioxide + Water\n   - Gives OUT: Glucose (food) + Oxygen\n\n2. **Cellular Respiration** (in mitochondria, always): Glucose + O₂ → CO₂ + H₂O + Energy\n   - Takes IN: Glucose + Oxygen\n   - Gives OUT: Carbon dioxide + Water + ATP energy\n\nDuring the day, photosynthesis produces MORE oxygen than respiration uses, so the net effect is that plants release oxygen into the air.",
    miniLesson:
      "**Photosynthesis: The Plant's Kitchen**\n\n📍 Where: Chloroplasts (contains chlorophyll, the green pigment)\n☀️ When: Only during daylight\n\n**The Recipe:**\n- 6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂\n\n**In plain English:**\n- Plants absorb carbon dioxide through tiny pores called **stomata** on their leaves\n- They absorb water through their roots\n- Using sunlight energy captured by chlorophyll, they convert these into glucose (sugar for energy) and oxygen\n- The oxygen exits through the stomata — this is the oxygen we breathe!\n\n**Key insight:** Plants are the planet's oxygen factories. Without photosynthesis, there would be no breathable atmosphere for animals.",
    practiceQuestions: [
      {
        id: "pq1",
        question:
          "What gas do plants take in during photosynthesis?",
        correctAnswer: "Carbon dioxide (CO₂)",
        explanation:
          "Plants absorb CO₂ through stomata on their leaves. This is one of the raw materials for making glucose.",
        options: [
          "Oxygen (O₂)",
          "Carbon dioxide (CO₂)",
          "Nitrogen (N₂)",
          "Hydrogen (H₂)",
        ],
      },
      {
        id: "pq2",
        question:
          "What are the TWO main products of photosynthesis?",
        correctAnswer: "Glucose and oxygen",
        explanation:
          "Photosynthesis produces glucose (C₆H₁₂O₆) as food for the plant and oxygen (O₂) as a byproduct.",
        options: [
          "Carbon dioxide and water",
          "Glucose and oxygen",
          "Oxygen and nitrogen",
          "Water and ATP",
        ],
      },
      {
        id: "pq3",
        question: "Where in the plant cell does photosynthesis occur?",
        correctAnswer: "Chloroplasts",
        explanation:
          "Chloroplasts contain chlorophyll, the green pigment that captures light energy. This is different from mitochondria, where cellular respiration occurs.",
        options: [
          "Mitochondria",
          "Chloroplasts",
          "Nucleus",
          "Cell membrane",
        ],
      },
    ],
    memoryHook:
      "Think of a plant as a tiny green factory: it INHALES carbon dioxide (the raw material) and EXHALES oxygen (the waste product) — the exact opposite of what we do! We're breathing each other's \"waste.\" It's nature's perfect recycling system. 🌱↔️🫁",
    nextStep:
      "Learn about the light-dependent and light-independent (Calvin Cycle) reactions — the two stages of photosynthesis. Then explore how environmental factors like light intensity and CO₂ concentration affect the rate of photosynthesis.",
    confidenceScore: 20,
    repairStatus: "not_started",
    createdAt: new Date().toISOString(),
  },
  "JavaScript Loops": {
    id: generateId(),
    subject: "JavaScript Loops",
    originalMistake: "My loop skips the first item in the array",
    currentExplanation:
      "I start my for loop with i = 1 because arrays start at 1, but it seems to skip an element.",
    goal: "Fix my coding project before submission",
    fractureDetected:
      "Incorrect loop initialization due to misunderstanding zero-based indexing. Arrays in JavaScript (and most programming languages) start at index 0, not 1. Starting your loop at i = 1 skips the very first element.",
    whyItHappened:
      "This is one of the most common beginner programming mistakes, often called an \"off-by-one error.\" In everyday life, we count from 1 (1st item, 2nd item...), but computers count from 0 (0th index, 1st index...). When you write `for (let i = 1; ...)`, you're telling the computer to start at the SECOND element, because element[0] is actually the first one.",
    goldenRepair:
      "```javascript\n// ❌ Wrong: starts at index 1, skips first element\nfor (let i = 1; i < array.length; i++) {\n  console.log(array[i]);\n}\n\n// ✅ Correct: starts at index 0, includes all elements\nfor (let i = 0; i < array.length; i++) {\n  console.log(array[i]);\n}\n\n// ✅ Even better: use for...of (no index needed)\nfor (const item of array) {\n  console.log(item);\n}\n```\n\nFor an array `['apple', 'banana', 'cherry']`:\n- `array[0]` = 'apple' (first item)\n- `array[1]` = 'banana' (second item)\n- `array[2]` = 'cherry' (third item)\n- `array.length` = 3 (but last index is 2!)",
    miniLesson:
      "**Zero-Based Indexing Explained**\n\nIn JavaScript arrays:\n- The FIRST element is at index **0**\n- The LAST element is at index **array.length - 1**\n\n**Standard for loop pattern:**\n```javascript\nfor (let i = 0; i < array.length; i++) {\n  // i goes: 0, 1, 2, ..., length-1\n}\n```\n\n**Why `<` and not `<=`?**\nBecause the last valid index is `length - 1`. Using `<=` would try to access an element that doesn't exist (undefined).\n\n**Modern alternatives that avoid index bugs:**\n```javascript\n// for...of — iterate values directly\nfor (const item of array) { }\n\n// forEach — callback for each element\narray.forEach((item, index) => { });\n\n// map — transform each element\nconst newArray = array.map(item => transform(item));\n```",
    practiceQuestions: [
      {
        id: "pq1",
        question:
          "Given `const fruits = ['apple', 'banana', 'cherry']`, what is `fruits[0]`?",
        correctAnswer: "apple",
        explanation:
          "Arrays are zero-indexed, so the first element is at index 0. fruits[0] = 'apple'.",
        options: ["undefined", "apple", "banana", "cherry"],
      },
      {
        id: "pq2",
        question:
          "What is the correct loop to print ALL elements of an array?",
        correctAnswer: "for (let i = 0; i < arr.length; i++)",
        explanation:
          "Start at 0 (first index) and go up to but not including arr.length (last index is length-1).",
        options: [
          "for (let i = 1; i <= arr.length; i++)",
          "for (let i = 0; i < arr.length; i++)",
          "for (let i = 0; i <= arr.length; i++)",
          "for (let i = 1; i < arr.length; i++)",
        ],
      },
      {
        id: "pq3",
        question:
          "Given an array of length 5, what is the index of the LAST element?",
        correctAnswer: "4",
        explanation:
          "For an array of length 5, indices are 0, 1, 2, 3, 4. The last index is always length - 1 = 4.",
        options: ["5", "4", "3", "6"],
      },
    ],
    memoryHook:
      "Think of an elevator in a building: the ground floor is floor 0, not floor 1! The first apartment (element) in the building (array) is on floor 0. If you start looking from floor 1, you'll miss whoever lives on the ground floor! 🏢",
    nextStep:
      "Practice with array methods like .map(), .filter(), and .reduce() — they handle indexing automatically so you never have off-by-one errors. Then explore common iteration patterns for nested arrays.",
    confidenceScore: 30,
    repairStatus: "not_started",
    createdAt: new Date().toISOString(),
  },
};

// Generate a mock response for any subject
export function generateMockRepair(
  subject: string,
  mistake: string,
  currentExplanation: string,
  goal?: string
): RepairAnalysis {
  // Check if we have a preloaded response
  if (mockRepairResponses[subject]) {
    return {
      ...mockRepairResponses[subject],
      id: generateId(),
      originalMistake: mistake,
      currentExplanation,
      goal,
      createdAt: new Date().toISOString(),
    };
  }

  // Generate a generic but convincing mock response
  return {
    id: generateId(),
    subject,
    originalMistake: mistake,
    currentExplanation,
    goal,
    fractureDetected: `A fundamental misunderstanding in ${subject} has been identified. Your current explanation reveals a gap between what you believe and the accurate concept. This is a common learning pattern — the mistake itself shows you're engaging with the material.`,
    whyItHappened: `This type of confusion in ${subject} typically occurs when learners apply intuitive reasoning to a concept that requires more structured understanding. Your brain tried to use a mental shortcut that works in everyday life but doesn't apply here. This is actually a sign of active learning — you're building mental models, they just need refinement.`,
    goldenRepair: `The correct understanding involves recognizing the specific mechanism behind this concept in ${subject}. Your original explanation "${currentExplanation}" contains a kernel of truth, but misses a critical step. The key insight is understanding the underlying process rather than relying on surface-level patterns.`,
    miniLesson: `**Understanding the Core Concept**\n\nIn ${subject}, this topic requires understanding three key principles:\n\n1. **Foundation**: The basic building block that everything else depends on\n2. **Mechanism**: How the process actually works step-by-step\n3. **Application**: How to apply this knowledge to solve problems\n\nYour mistake was in step 2 — you had the right foundation but misunderstood the mechanism. Once you see how it actually works, everything clicks into place.`,
    practiceQuestions: [
      {
        id: "pq1",
        question: `Based on what you've learned, what was the main error in your original understanding of this ${subject} concept?`,
        correctAnswer: "I was applying an incorrect mental model",
        explanation:
          "Recognizing where your thinking went wrong is the first step to building a correct understanding.",
        options: [
          "I was applying an incorrect mental model",
          "I didn't study enough",
          "The concept is too hard",
          "There was no error",
        ],
      },
      {
        id: "pq2",
        question: `What is the key insight needed to correctly understand this concept in ${subject}?`,
        correctAnswer: "Understanding the underlying mechanism, not just the surface pattern",
        explanation:
          "Deep understanding comes from knowing WHY something works, not just WHAT happens.",
        options: [
          "Memorizing the correct answer",
          "Understanding the underlying mechanism, not just the surface pattern",
          "Practicing more problems",
          "Reading the textbook again",
        ],
      },
      {
        id: "pq3",
        question:
          "Which learning strategy would best help you avoid this type of mistake in the future?",
        correctAnswer: "Explaining the concept in my own words and checking each step",
        explanation:
          "Teaching yourself forces you to confront gaps in understanding. Each step you explain reveals whether you truly understand or are just memorizing.",
        options: [
          "Highlighting the textbook",
          "Explaining the concept in my own words and checking each step",
          "Watching more videos",
          "Skipping to the practice problems",
        ],
      },
    ],
    memoryHook: `Think of this ${subject} concept like learning to ride a bike: your initial understanding was like trying to balance by standing still — it seems logical but doesn't work. The real insight is that forward motion (deeper understanding) is what creates balance (correct knowledge). Keep pedaling! 🚲`,
    nextStep: `Review the fundamental principles of this topic in ${subject}. Create flashcards for the key steps. Try explaining the concept to someone else — if you can teach it, you truly understand it. Then move on to more complex applications.`,
    confidenceScore: 15,
    repairStatus: "not_started",
    createdAt: new Date().toISOString(),
  };
}

// Motivational quotes for reflection
export const motivationalQuotes = [
  "This mistake is not failure. It is the map to your next improvement.",
  "Every crack you repair makes you stronger than before.",
  "In kintsugi, the repair is more beautiful than the original. So is your learning.",
  "Mistakes are not setbacks — they are the raw material of mastery.",
  "The gold in your learning comes from understanding where you broke.",
  "Your willingness to face confusion is the first step toward clarity.",
  "Every expert was once a beginner who embraced their mistakes.",
  "The cracks in your understanding are where the light gets in.",
];

export function getRandomQuote(): string {
  return motivationalQuotes[
    Math.floor(Math.random() * motivationalQuotes.length)
  ];
}
