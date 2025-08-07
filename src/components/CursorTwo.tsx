import React, { useEffect, useRef } from "react";
import { useCursorDelay } from "./features/useCursorDelay";
import { useHoverDetection } from "./features/hoverContext";
// import { ClickEffectLayer } from "./features/click-effect/ClickEffectLayer";
import { useClickEffect } from "./features/click-effect/useClickEffect";

export const CursorTwo: React.FC<{
  delay?: number;
  size?: number;
  sizeDot?: number;
  sizeOutline?: number;
  bgColorDot?: string;
  bgColorOutline?: string;
  useMixBlendDifference?: boolean;
  scaleOnHover?: number;
  clickEffect?: "pulse";
  clickEffectColor?: string;
  clickEffectSize?: number;
  clickEffectDuration?: number;
}> = ({
  delay,
  size,
  sizeDot = size || 10,
  sizeOutline = size || 45,
  bgColorDot = "white",
  bgColorOutline = "white",
  useMixBlendDifference = true,
  scaleOnHover = 1.5,
  clickEffect,
  clickEffectColor = bgColorDot,
  clickEffectSize = 1.5,
  clickEffectDuration = 300,
}) => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  const { position: delayedPosition } = useCursorDelay(delay, { x: 0, y: 0 });
  const isHovering = useHoverDetection();
  const { triggerClickEffect } = useClickEffect();

  useEffect(() => {
    const moveCursor = (event: MouseEvent) => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${event.clientX}px`;
        cursorDotRef.current.style.top = `${event.clientY}px`;
        cursorDotRef.current.style.transform = `translate(-50%, -50%) scale(${isHovering ? scaleOnHover : 1})`;
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [isHovering, scaleOnHover]);

  useEffect(() => {
    if (cursorOutlineRef.current) {
      cursorOutlineRef.current.style.left = `${delayedPosition.x}px`;
      cursorOutlineRef.current.style.top = `${delayedPosition.y}px`;
      cursorOutlineRef.current.style.transform = `translate(-50%, -50%) scale(${isHovering ? scaleOnHover : 1})`;
    }
  }, [delayedPosition, isHovering, scaleOnHover]);

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

  const mixBlendModeValue = useMixBlendDifference ? "difference" : "normal";

  return (
    <>
      <div
        ref={cursorDotRef}
        className="cursor"
        style={{
          width: `${sizeDot}px`,
          height: `${sizeDot}px`,
          backgroundColor: bgColorDot,
          mixBlendMode: mixBlendModeValue,
          zIndex: 9999,
          borderRadius: "50%",
          transition: "transform 0.2s ease",
          position: "fixed",
          pointerEvents: "none",
        }}
      />
      <div
        ref={cursorOutlineRef}
        className="cursor"
        style={{
          width: `${sizeOutline}px`,
          height: `${sizeOutline}px`,
          border: `2px solid ${bgColorOutline}`,
          backgroundColor: "transparent",
          mixBlendMode: mixBlendModeValue,
          zIndex: 9998,
          borderRadius: "50%",
          transition: "transform 0.2s ease",
          position: "fixed",
          pointerEvents: "none",
        }}
      />
    </>
  );
};

export default CursorTwo;
