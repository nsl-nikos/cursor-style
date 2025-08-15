import React from "react";

export type ClickEffectType = "pulse" | "ripple" | "fade";

let cssInjected = false;

const injectCSS = () => {
  if (cssInjected) return;
  
  const style = document.createElement("style");
  style.textContent = `
    @keyframes cursor-pulse {
      0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
      100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }
    @keyframes cursor-ripple {
      0% { 
        transform: translate(-50%, -50%) scale(0.5); 
        opacity: 0.8;
      }
      50% { 
        transform: translate(-50%, -50%) scale(1.5); 
        opacity: 0.4;
      }
      100% { 
        transform: translate(-50%, -50%) scale(3); 
        opacity: 0; 
      }
    }
    @keyframes cursor-fade {
      0% { 
        transform: translate(-50%, -50%) scale(1.2); 
        opacity: 0.8;
      }
      100% { 
        transform: translate(-50%, -50%) scale(1.2); 
        opacity: 0; 
      }
    }
    .cursor-click-effect {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
    }
    .cursor-click-effect.pulse {
      animation: cursor-pulse ease-out forwards;
    }
    .cursor-click-effect.ripple {
      border: 2px solid;
      background-color: transparent !important;
      animation: cursor-ripple ease-out forwards;
    }
    .cursor-click-effect.fade {
      animation: cursor-fade ease-out forwards;
    }
  `;
  document.head.appendChild(style);
  cssInjected = true;
};

const createClickEffect = (
  x: number,
  y: number,
  effect: ClickEffectType,
  color: string = "white",
  size: number = 1.5,
  duration: number = 300
) => {
  if (typeof window === "undefined") return;
  
  injectCSS();
  
  const effectElement = document.createElement("div");
  const effectSize = size * 2;
  
  effectElement.className = `cursor-click-effect ${effect}`;
  
  if (effect === "pulse") {
    effectElement.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: ${effectSize}px;
      height: ${effectSize}px;
      background-color: ${color};
      animation-duration: ${duration}ms;
      transform: translate(-50%, -50%);
      z-index: 2147483647;
    `;
  } else if (effect === "ripple") {
    effectElement.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: ${effectSize}px;
      height: ${effectSize}px;
      border-color: ${color};
      animation-duration: ${duration}ms;
      transform: translate(-50%, -50%);
      z-index: 2147483647;
    `;
  } else if (effect === "fade") {
    effectElement.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: ${effectSize}px;
      height: ${effectSize}px;
      background-color: ${color};
      animation-duration: ${duration}ms;
      transform: translate(-50%, -50%);
      z-index: 2147483647;
    `;
  }
  
  document.body.appendChild(effectElement);
  
  setTimeout(() => {
    if (effectElement.parentNode) {
      effectElement.parentNode.removeChild(effectElement);
    }
  }, duration);
};

export const useClickEffect = (
  clickEffect?: ClickEffectType,
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
        clickEffect,
        clickEffectColor || "white",
        clickEffectSize || 1.5,
        clickEffectDuration || 300
      );
    };
    
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [clickEffect, clickEffectColor, clickEffectSize, clickEffectDuration]);
};