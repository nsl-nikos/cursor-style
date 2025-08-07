import React from "react";

export const baseCursorStyle: React.CSSProperties = {
  position: "fixed",
  width: "20px",
  height: "20px",
  backgroundColor: "white",
  borderRadius: "50%",
  pointerEvents: "none",
  mixBlendMode: "difference",
  cursor: "none",
  transition: "transform 0.2s ease",
  zIndex: 2147483647,
};

export const hoveringStyle: React.CSSProperties = {
  transform: "scale(5)",
};

// let cssInjected = false;

// export function injectClickEffectCSS() {
//   if (cssInjected) return;
//   const style = document.createElement("style");
//   style.textContent = `
//     @keyframes cursor-pulse {
//       0% { transform: scale(1); opacity: 1; }
//       100% { transform: scale(2); opacity: 0; }
//     }

//     .cursor-effect {
//       position: fixed;
//       border-radius: 50%;
//       pointer-events: none;
//       z-index: 2147483647;
//       animation: cursor-pulse var(--duration, 500ms) ease-out forwards;
//     }
//   `;
//   document.head.appendChild(style);
//   cssInjected = true;
// }