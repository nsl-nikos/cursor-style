import React, { useEffect } from "react";
import { useCursorDelay } from "./features/useCursorDelay";
import { useHoverDetection } from "./features/hoverContext";
import { useClickEffect } from "./features/click-effect/useClickEffect";
import { baseCursorStyle } from "../styles/styles";

export const CursorThree: React.FC<{
  delay?: number;
  size?: number;
  bgColor?: string;
  useMixBlendDifference?: boolean;
  scaleOnHover?: number;
  clickEffect?: "pulse";
  clickEffectColor?: string;
  clickEffectDuration?: number;
  clickEffectSize?: number;
}> = ({
  delay,
  size = 35,
  bgColor = "white",
  useMixBlendDifference = true,
  scaleOnHover = 1.5,
  clickEffect,
  clickEffectColor = "white",
  clickEffectDuration = 300,
  clickEffectSize = 1.5,
}) => {
  const { position: delayedPosition } = useCursorDelay(delay, { x: 0, y: 0 });
  const isHovering = useHoverDetection();
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
        left: `${delayedPosition.x}px`,
        top: `${delayedPosition.y}px`,
        border: `2px solid ${bgColor}`,
        transform: `translate(-50%, -50%) scale(${isHovering ? scaleOnHover : 1})`,
        width: `${size}px`,
        height: `${size}px`,
        mixBlendMode: useMixBlendDifference ? "difference" : "normal",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default CursorThree;
