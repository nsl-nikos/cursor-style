import React, { useEffect } from "react";
import { useCursorDelay } from "./features/useCursorDelay";
import { useHoverDetection } from "./features/hoverContext";
import { baseCursorStyle } from "../styles/styles";
import { useClickEffect } from "./features/click-effect/useClickEffect";
import "./features/click-effect/ClickEffectLayer"; 

export const CursorOne: React.FC<{
  delay?: number;
  size?: number;
  bgColor?: string;
  useMixBlendDifference?: boolean;
  scaleOnHover?: number;
  clickEffect?: "pulse"; 
  clickEffectColor?: string;
  clickEffectSize?: number;
  clickEffectDuration?: number; 
}> = ({
  delay,
  size = 20,
  bgColor = "white",
  useMixBlendDifference = true,
  scaleOnHover = 1.5,
  clickEffect,
  clickEffectColor = "white",
  clickEffectSize = 10,
  clickEffectDuration = 300,
}) => {
  const isHovering = useHoverDetection();
  const { position } = useCursorDelay(delay, { x: 0, y: 0 });
  const { triggerClickEffect } = useClickEffect();

   useEffect(() => {
    if (!clickEffect) return;

    const handler = (e: MouseEvent) => {
      triggerClickEffect(
        e.clientX,
        e.clientY,
        clickEffect,
        clickEffectColor,
        clickEffectSize,
        clickEffectDuration
      );
    };

    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [clickEffect, clickEffectColor, clickEffectSize, clickEffectDuration]);

  return (
    <div
      className="cursor"
      style={{
        ...baseCursorStyle,
        width: `${size}px`,
        height: `${size}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: bgColor,
        mixBlendMode: useMixBlendDifference ? "difference" : "normal",
        transform: `translate(-50%, -50%) scale(${isHovering ? scaleOnHover : 1})`,
      }}
      
    />
  );
};

export default CursorOne;
