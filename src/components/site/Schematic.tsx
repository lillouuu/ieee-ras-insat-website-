import { motion } from "motion/react";
import type { DomainShape } from "@/content/site";

const draw = { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { duration: 1.1, ease: "easeInOut" as const } };

/** Animated line-drawing technical schematic per domain. */
export function Schematic({ shape }: { shape: DomainShape }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="100" cy="100" r="92" strokeDasharray="2 6" opacity="0.4" />
      {shape === "wheels" && (
        <>
          <motion.rect {...draw} x="45" y="70" width="110" height="50" />
          <motion.circle {...draw} cx="70" cy="130" r="20" />
          <motion.circle {...draw} cx="130" cy="130" r="20" />
          <motion.path {...draw} d="M100 70 V45 M85 45 H115" />
          <motion.path {...draw} d="M115 45 Q150 30 170 55" strokeDasharray="3 4" />
        </>
      )}
      {shape === "chip" && (
        <>
          <motion.rect {...draw} x="60" y="60" width="80" height="80" />
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.path key={i} {...draw} d={`M${72 + i * 14} 60 V35 M${72 + i * 14} 140 V165 M60 ${72 + i * 14} H35 M140 ${72 + i * 14} H165`} />
          ))}
          <motion.circle {...draw} cx="75" cy="75" r="4" />
        </>
      )}
      {shape === "eye" && (
        <>
          <motion.path {...draw} d="M25 100 Q100 30 175 100 Q100 170 25 100 Z" />
          <motion.circle {...draw} cx="100" cy="100" r="28" />
          <motion.circle {...draw} cx="100" cy="100" r="9" />
          <motion.rect {...draw} x="50" y="55" width="40" height="30" strokeDasharray="4 3" />
        </>
      )}
      {shape === "gear" && (
        <>
          <motion.circle {...draw} cx="100" cy="100" r="45" />
          <motion.circle {...draw} cx="100" cy="100" r="15" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return <motion.path key={i} {...draw} d={`M${100 + Math.cos(a) * 45} ${100 + Math.sin(a) * 45} L${100 + Math.cos(a) * 60} ${100 + Math.sin(a) * 60}`} strokeWidth="5" />;
          })}
        </>
      )}
      {shape === "loop" && (
        <>
          <motion.rect {...draw} x="30" y="80" width="40" height="40" />
          <motion.rect {...draw} x="120" y="80" width="50" height="40" />
          <motion.path {...draw} d="M70 100 H120 M170 100 H185 V150 H50 V120" />
          <motion.circle {...draw} cx="50" cy="150" r="0" />
          <motion.path {...draw} d="M20 60 C60 20 90 140 130 50 S180 40 190 60" strokeDasharray="3 4" />
        </>
      )}
    </svg>
  );
}
