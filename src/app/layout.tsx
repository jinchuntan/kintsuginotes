import type { Metadata } from "next";
import { Toaster } from "sonner";
import { AppProvider } from "@/lib/store";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kintsugi Notes — Turn Every Mistake into a Golden Learning Path",
  description:
    "AI-powered learning companion inspired by kintsugi. Transform your mistakes, wrong answers, and confusing notes into beautiful, personalized repair paths for deeper understanding.",
  keywords: [
    "learning",
    "study",
    "mistakes",
    "revision",
    "AI tutor",
    "kintsugi",
    "education",
  ],
  openGraph: {
    title: "Kintsugi Notes",
    description: "Turn every mistake into a golden learning path.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-100">
        <AppProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#18181b",
                border: "1px solid #27272a",
                color: "#fafafa",
              },
            }}
          />
        </AppProvider>
      </body>
    </html>
  );
}
