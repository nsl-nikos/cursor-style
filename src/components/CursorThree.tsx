import React from "react";
import { baseCursorStyle } from "../styles/styles";
import { useCursorDelay } from "./features/useCursorDelay";
import { useHoverDetection } from "./features/hoverContext";
export const CursorThree: React.FC<{
  delay?: number; 
  size?: number;
  bgColor?: string; 
  useMixBlendDifference?: boolean;
}> = ({
  delay,
  size = 35, 
  bgColor = "white", 
  useMixBlendDifference = true, 
}) => {
  const { position: delayedPosition } = useCursorDelay(delay, { x: 0, y: 0 });
  const  isHovering  = useHoverDetection();
  return (
    <div
      style={{
        ...baseCursorStyle,
        position: "fixed",
        left: `${delayedPosition.x}px`,
        top: `${delayedPosition.y}px`,
        borderRadius: "50%",
        border: `2px solid ${bgColor}`, 
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        width: `${size}px`,
        height: `${size}px`,
        mixBlendMode: useMixBlendDifference ? "difference" : "normal",
        zIndex: 9999,
        backgroundColor: "transparent",
      }}
    />
  );
};

export default CursorThree;
