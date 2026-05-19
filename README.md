# Kintsugi Notes

**Turn every mistake into a golden learning path.**

Kintsugi Notes is an AI-powered learning companion inspired by the Japanese art of **kintsugi**, where broken pottery is repaired with gold, making the repaired piece more beautiful than the original.

Instead of making students feel bad about mistakes, Kintsugi Notes reframes mistakes as the most valuable part of the learning process, transforming wrong answers, confusing notes, and knowledge gaps into structured, personalized **repair paths**.

> Built for [HackMars 3.0: NEON](https://hackmars-3-0-neon.devpost.com/) — Education / Productivity Track

---

## Features

- **Smart Fracture Detection** — AI identifies the exact misconception behind your mistake
- **Golden Repair Paths** — Structured analysis with explanations, mini lessons, and memory hooks
- **Practice Mode** — Targeted questions to reinforce corrected concepts
- **Repair Path Dashboard** — Visual progress tracking with animated gold repair cards
- **Kintsugi Visual Design** — Premium dark UI with gold accents, crack patterns, and repair animations
- **Responsive Design** — Works across desktop, tablet, and mobile devices
- **Mock AI Fallback** — High-quality demo data works without any API key
- **Optional AI Integration** — Plug in OpenAI or Anthropic API for real AI analysis

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State**: React Context + localStorage
- **Notifications**: Sonner

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kintsuginotes.git
cd kintsuginotes

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Optional: Enable AI

Copy the example env file and add your API key:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
AI_PROVIDER=openai       # or "anthropic"
AI_API_KEY=your-key-here
```

The app works perfectly without an API key using built-in mock data.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout with providers
│   ├── globals.css           # Global styles + kintsugi theme
│   ├── workspace/page.tsx    # Main workspace (input + analysis)
│   ├── dashboard/page.tsx    # Repair path dashboard
│   └── practice/page.tsx     # Practice mode
├── components/
│   ├── ui/                   # shadcn/ui base components
│   ├── Navigation.tsx        # App navigation bar
│   ├── MistakeInput.tsx      # Mistake input form
│   ├── RepairAnalysis.tsx    # Repair analysis display
│   ├── KintsugiCard.tsx      # Animated repair progress card
│   ├── PracticeMode.tsx      # Practice quiz component
│   ├── ProgressSummary.tsx   # Mastery score + stats
│   ├── LoadingAnimation.tsx  # Kintsugi-themed loader
│   └── Reflection.tsx        # Motivational quotes
└── lib/
    ├── types.ts              # TypeScript types
    ├── utils.ts              # Utility functions
    ├── mock-data.ts          # Mock AI responses + examples
    ├── ai-service.ts         # AI integration layer
    └── store.tsx             # Global state management
```

---

## Deploy to Vercel

### Option 1: One-Click Deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your GitHub repo
4. Vercel auto-detects Next.js — click "Deploy"
5. (Optional) Add `AI_PROVIDER` and `AI_API_KEY` in Vercel Environment Variables

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

---

## Demo Script (3-Minute Hackathon Video)

### Intro (0:00 - 0:30)
"Have you ever gotten a test back covered in red marks and felt terrible? What if those mistakes were actually your most valuable learning tool? Meet Kintsugi Notes — an AI-powered learning companion inspired by the Japanese art of kintsugi, where broken pottery is repaired with gold. We turn every mistake into a golden learning path."

### Landing Page (0:30 - 0:45)
Show the landing page. Highlight the animated hero card showing a math mistake being repaired with gold. Click "Start repairing my learning."

### Workspace Demo (0:45 - 1:30)
"Let's say I just got my algebra test back and I got a question wrong. I thought (x+3) squared equals x squared plus 9."
- Click "Use Math Example" to auto-fill
- Click "Repair My Learning"
- Show the loading animation
- Walk through the repair analysis: Fracture Detected, Why It Happened, Golden Repair, Mini Lesson, Memory Hook

### Practice Mode (1:30 - 2:15)
"Now I can practice to reinforce what I learned."
- Click "Start Practice"
- Answer a practice question
- Show immediate feedback with explanations
- Complete the quiz and show the results

### Dashboard (2:15 - 2:45)
"Every mistake I repair gets tracked on my Repair Path dashboard."
- Show the mastery score
- Show repair cards with different statuses
- Mark a concept as repaired — show the gold glow animation
- Highlight the progress stats

### Closing (2:45 - 3:00)
"Kintsugi Notes turns every mistake into a golden opportunity to learn. It's not about being perfect — it's about growing stronger through every crack. Thank you."

---

## Devpost Description

### Inspiration
In the Japanese art of kintsugi, broken pottery is repaired with gold, making the piece more beautiful than before. We believe learning should work the same way — your mistakes should not be hidden or punished. They should be highlighted, understood, and transformed into your greatest strengths.

### What it does
Kintsugi Notes is an AI-powered learning companion that transforms students' mistakes into personalized repair paths. Students input their wrong answers, confusing notes, or weak topics, and the app:
- Detects the core misunderstanding ("fracture")
- Explains why the mistake happened
- Provides a corrected explanation ("golden repair")
- Generates a mini lesson with memory hooks
- Creates targeted practice questions
- Tracks progress on a visual repair dashboard

### How we built it
- **Next.js 14** with TypeScript and App Router
- **Tailwind CSS** with a custom kintsugi gold theme
- **Framer Motion** for smooth animations and transitions
- **shadcn/ui** for accessible, polished UI components
- **React Context + localStorage** for state persistence
- **AI abstraction layer** supporting OpenAI/Anthropic with mock fallback

### Challenges we ran into
Designing the kintsugi visual metaphor required careful balance — making it feel premium and emotionally resonant without being gimmicky. We also focused on ensuring the mock AI responses were detailed and convincing enough to demonstrate the full product experience without requiring an API key.

### Accomplishments that we are proud of
- A complete, working MVP that can be demoed end-to-end in under 3 minutes
- Beautiful, responsive design that works across all devices
- Emotionally compelling concept that reframes learning around growth
- High-quality mock data that makes the demo feel like a real AI product

### What we learned
- The power of metaphor in product design — kintsugi resonates deeply with the learning experience
- How to build polished UIs quickly with shadcn/ui and Tailwind
- The importance of mock data quality in hackathon demos

### What is next for Kintsugi Notes
- Real-time AI integration with multiple providers
- Spaced repetition scheduling for practice questions
- Collaborative study groups and shared repair paths
- LMS integration (Google Classroom, Canvas)
- Mobile native app
- Export repair analyses as study guides (PDF)
- Teacher dashboard to view student progress

---

## Future Improvements

1. **Real AI Integration** — Connect to OpenAI/Anthropic for dynamic, personalized repair analyses
2. **Spaced Repetition** — Schedule review of repaired concepts at optimal intervals
3. **Image/PDF Upload** — Let students upload photos of handwritten notes or exam papers
4. **Collaborative Repairs** — Study groups can share and discuss repair paths
5. **LMS Integration** — Pull in assignments and grades from Google Classroom, Canvas, etc.
6. **Teacher Dashboard** — Educators can view class-wide misconception patterns
7. **Gamification** — Streaks, badges, and mastery achievements
8. **Mobile App** — Native iOS/Android experience
9. **Offline Support** — PWA with service worker for offline practice
10. **Export** — Generate PDF study guides from repair analyses

---

## License

MIT
