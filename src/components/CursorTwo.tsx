import React, { useEffect, useRef } from "react";
import { useCursorDelay } from "./features/useCursorDelay";
import { useHoverDetection } from "./features/hoverContext";

export const CursorTwo: React.FC<{
  delay?: number;
  size?: number;
  sizeDot?: number;
  sizeOutline?: number;
  bgColorDot?: string;
  bgColorOutline?: string;
  useMixBlendDifference?: boolean;
  scaleOnHover?: number;
}> = ({
  delay,
  size,
  sizeDot = size || 10,
  sizeOutline = size || 45,
  bgColorDot = "white",
  bgColorOutline = "white",
  useMixBlendDifference = true,
  scaleOnHover = 1.5,
}) => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  const { position: delayedPosition } = useCursorDelay(delay, { x: 0, y: 0 });
  const isHovering = useHoverDetection();

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

  const mixBlendModeValue = useMixBlendDifference ? "difference" : "normal";

  return (
    <>
      <div
        ref={cursorDotRef}
        style={{
          width: `${sizeDot}px`,
          height: `${sizeDot}px`,
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          backgroundColor: bgColorDot,
          borderRadius: "50%",
          mixBlendMode: mixBlendModeValue,
          transition: "transform 0.2s ease",
        }}
      />
      <div
        ref={cursorOutlineRef}
        style={{
          width: `${sizeOutline}px`,
          height: `${sizeOutline}px`,
          borderRadius: "50%",
          border: `2px solid ${bgColorOutline}`,
          pointerEvents: "none",
          mixBlendMode: mixBlendModeValue,
          zIndex: 9998,
          backgroundColor: "transparent",
          position: "fixed",
          transition: "transform 0.2s ease",
        }}
      />
    </>
  );
};

export default CursorTwo;
