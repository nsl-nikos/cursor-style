import React, { useEffect, useState } from "react";
import { useCursorDelay } from "./features/useCursorDelay"; 
import { useHoverDetection } from "./features/hoverContext";
export const CursorOne: React.FC<{
  delay?: number; 
  size?: number;
  bgColor?: string;
  useMixBlendDifference?: boolean;
}> = ({
  delay,
  size = 20,
  bgColor = "white", 
  useMixBlendDifference = true, 
}) => {
  // const [isHovering, setIsHovering] = useState<boolean>(false);
  const isHovering = useHoverDetection();
  const { position } = useCursorDelay(delay, { x: 0, y: 0 });

  const cursorStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    position: "fixed",
    left: `${position.x}px`,
    top: `${position.y}px`,
    pointerEvents: "none",
    transform: `translate(-50%, -50%)${isHovering ? " scale(5)" : ""}`,
    transition: "transform 0.2s ease",
    backgroundColor: bgColor,
    mixBlendMode: useMixBlendDifference ? "difference" : "normal",
    zIndex: 9999, 
  };

  return <div style={cursorStyle} />;
};

export default CursorOne;
