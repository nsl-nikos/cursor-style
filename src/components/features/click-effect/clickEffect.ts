import React from "react";

export type ClickEffectType = "pulse";

let cssInjected = false;

const injectCSS = () => {
  if (cssInjected) return;
  
  const style = document.createElement("style");
  style.textContent = `
    @keyframes cursor-pulse {
      0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
      100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }
    .cursor-click-effect {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      animation: cursor-pulse ease-out forwards;
    }
  `;
  document.head.appendChild(style);
  cssInjected = true;
};

const createClickEffect = (
  x: number,
  y: number,
  color: string = "white",
  size: number = 1.5,
  duration: number = 300
) => {
  if (typeof window === "undefined") return;
  
  injectCSS();
  
  const effect = document.createElement("div");
  const effectSize = size * 2;
  
  effect.className = "cursor-click-effect";
  effect.style.cssText = `
    left: ${x}px;
    top: ${y}px;
    width: ${effectSize}px;
    height: ${effectSize}px;
    background-color: ${color};
    animation-duration: ${duration}ms;
    transform: translate(-50%, -50%);
    z-index: 2147483647;
  `;
  
  document.body.appendChild(effect);
  
  setTimeout(() => {
    if (effect.parentNode) {
      effect.parentNode.removeChild(effect);
    }
  }, duration);
};

export const useClickEffect = (
  clickEffect?: "pulse",
  clickEffectColor?: string,
  clickEffectSize?: number,
  clickEffectDuration?: number
) => {
  React.useEffect(() => {
    if (!clickEffect) return;
    
    const handler = (e: MouseEvent) => {
      createClickEffect(
        e.clientX,
        e.clientY,
        clickEffectColor || "white",
        clickEffectSize || 1.5,
        clickEffectDuration || 300
      );
    };
    
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [clickEffect, clickEffectColor, clickEffectSize, clickEffectDuration]);
};