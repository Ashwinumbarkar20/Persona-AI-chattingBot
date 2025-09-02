import React from "react";
import "./TypingDots.css";

/**
 * TypingDots – simple 3-dot typing indicator (CSS animation)
 *
 * Usage:
 *   <TypingDots />
 *   <TypingDots className="text-gray-500" />
 *   <TypingDots ariaLabel="Assistant is typing" />
 */
export default function TypingDots({ ariaLabel = "Typing…", className = "" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      className={`typing-dots ${className}`}
    >
      <span className="sr-only">{ariaLabel}</span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}


