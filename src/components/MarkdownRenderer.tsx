"use client";

import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Simple markdown renderer for repair analysis content.
 * Handles bold, code blocks, inline code, lists, and line breaks.
 * No external dependencies — just regex parsing.
 */
export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const renderContent = (text: string): React.ReactNode[] => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLang = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code block start/end
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <div key={`code-${i}`} className="my-3 rounded-lg overflow-hidden">
              <div className="bg-zinc-800/80 border border-zinc-700/50 rounded-lg">
                {codeBlockLang && (
                  <div className="px-3 py-1 text-xs text-zinc-500 border-b border-zinc-700/50 bg-zinc-800/50">
                    {codeBlockLang}
                  </div>
                )}
                <pre className="p-3 text-sm text-zinc-300 overflow-x-auto">
                  <code>{codeBlockContent.join("\n")}</code>
                </pre>
              </div>
            </div>
          );
          codeBlockContent = [];
          codeBlockLang = "";
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeBlockLang = line.trim().slice(3);
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Empty line = paragraph break
      if (line.trim() === "") {
        elements.push(<div key={`br-${i}`} className="h-2" />);
        continue;
      }

      // Headers
      if (line.startsWith("### ")) {
        elements.push(
          <h4 key={i} className="text-sm font-semibold text-zinc-200 mt-3 mb-1">
            {renderInline(line.slice(4))}
          </h4>
        );
        continue;
      }
      if (line.startsWith("## ")) {
        elements.push(
          <h3 key={i} className="text-base font-semibold text-zinc-100 mt-4 mb-2">
            {renderInline(line.slice(3))}
          </h3>
        );
        continue;
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        elements.push(
          <h4 key={i} className="text-sm font-semibold text-zinc-200 mt-3 mb-1">
            {renderInline(line.slice(2, -2))}
          </h4>
        );
        continue;
      }

      // Bullet points
      if (line.trim().startsWith("- ") || line.trim().startsWith("• ") || line.trim().startsWith("* ")) {
        const bulletContent = line.trim().slice(2);
        elements.push(
          <div key={i} className="flex gap-2 ml-1 my-0.5">
            <span className="text-kintsugi-400 mt-1 shrink-0">•</span>
            <span className="text-zinc-300 text-sm leading-relaxed">
              {renderInline(bulletContent)}
            </span>
          </div>
        );
        continue;
      }

      // Numbered list
      const numberedMatch = line.trim().match(/^(\d+)\.\s+(.+)/);
      if (numberedMatch) {
        elements.push(
          <div key={i} className="flex gap-2 ml-1 my-0.5">
            <span className="text-kintsugi-400 text-sm shrink-0 w-5 text-right">
              {numberedMatch[1]}.
            </span>
            <span className="text-zinc-300 text-sm leading-relaxed">
              {renderInline(numberedMatch[2])}
            </span>
          </div>
        );
        continue;
      }

      // Regular paragraph
      elements.push(
        <p key={i} className="text-sm text-zinc-300 leading-relaxed">
          {renderInline(line)}
        </p>
      );
    }

    return elements;
  };

  // Inline formatting: bold, inline code, emoji indicators
  const renderInline = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIndex = 0;

    while (remaining.length > 0) {
      // Bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Inline code
      const codeMatch = remaining.match(/`([^`]+)`/);

      let firstMatch: { match: RegExpMatchArray; type: string } | null = null;

      if (boldMatch?.index !== undefined) {
        firstMatch = { match: boldMatch, type: "bold" };
      }
      if (codeMatch?.index !== undefined) {
        if (!firstMatch || codeMatch.index < (firstMatch.match.index ?? Infinity)) {
          firstMatch = { match: codeMatch, type: "code" };
        }
      }

      if (!firstMatch || firstMatch.match.index === undefined) {
        parts.push(remaining);
        break;
      }

      // Text before the match
      if (firstMatch.match.index > 0) {
        parts.push(remaining.slice(0, firstMatch.match.index));
      }

      if (firstMatch.type === "bold") {
        parts.push(
          <strong key={`b-${keyIndex++}`} className="text-zinc-100 font-semibold">
            {firstMatch.match[1]}
          </strong>
        );
      } else if (firstMatch.type === "code") {
        parts.push(
          <code
            key={`c-${keyIndex++}`}
            className="px-1.5 py-0.5 rounded bg-zinc-800 text-kintsugi-300 text-xs font-mono"
          >
            {firstMatch.match[1]}
          </code>
        );
      }

      remaining = remaining.slice(
        firstMatch.match.index + firstMatch.match[0].length
      );
    }

    return parts.length === 1 ? parts[0] : <>{parts}</>;
  };

  return <div className={`space-y-0.5 ${className}`}>{renderContent(content)}</div>;
}
