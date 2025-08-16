import React from "react";
import { useCursorDelay } from "./features/useCursorDelay";
import { useHoverDetection } from "./features/hoverContext";
import { useClickEffect } from "./features/click-effect/clickEffect";
import { useMagnetEffect } from "./features/useMagnetEffect";

interface BaseCursorProps {
  delay?: number;
  useMixBlendDifference?: boolean;
  scaleOnHover?: number;
  size?: number;           
  clickEffect?: "pulse" | "ripple" | "fade";
  clickEffectColor?: string;
  clickEffectSize?: number;
  clickEffectDuration?: number;
  magnetEffect?: boolean;
  magnetStrength?: number;
  magnetRange?: number;
  magnetClassName?: string;
  magnetType?: "attract" | "repel";
}

interface CursorOneProps extends BaseCursorProps {
  type: "one";
  bgColor?: string;
}

interface CursorTwoProps extends BaseCursorProps {
  type: "two";
  sizeDot?: number;       
  sizeOutline?: number;    
  bgColorDot?: string;     
  bgColorOutline?: string; 
}

interface CursorThreeProps extends BaseCursorProps {
  type: "three";
  bgColor?: string;
}

type CustomCursorProps = CursorOneProps | CursorTwoProps | CursorThreeProps;

const baseCursorStyle: React.CSSProperties = {
  position: "fixed",
  borderRadius: "50%",
  pointerEvents: "none",
  cursor: "none",
  transition: "transform 0.2s ease",
  zIndex: 2147483647,
};

export const CustomCursor: React.FC<CustomCursorProps> = (props) => {
  const {
    delay = 0,
    useMixBlendDifference = true,
    scaleOnHover = 1.5,
    clickEffect,
    clickEffectColor = "white",
    clickEffectSize = 1.5,
    clickEffectDuration = 300,
    magnetEffect = false,
    magnetStrength = 20,
    magnetRange = 100,
    magnetClassName = "cursor-magnet",
    magnetType = "attract",
  } = props;

  const clampedDelay = Math.max(0, Math.min(delay, 1000));
  const isHovering = useHoverDetection();
  const { position } = useCursorDelay(clampedDelay, { x: 0, y: 0 });
  
  const magnetOffset = useMagnetEffect(
    position,
    magnetEffect,
    magnetStrength,
    magnetRange,
    magnetClassName,
    magnetType
  );
  
  const finalPosition = {
    x: position.x + magnetOffset.x,
    y: position.y + magnetOffset.y,
  };
  
  const mixBlendMode = useMixBlendDifference ? "difference" : "normal";
  const scale = isHovering ? scaleOnHover : 1;

  useClickEffect(clickEffect, clickEffectColor, clickEffectSize, clickEffectDuration);

  if (props.type === "one") {
    const { size = 35, bgColor = "white" } = props;
    return (
      <div
        className="cursor"
        style={{
          ...baseCursorStyle,
          width: `${size}px`,
          height: `${size}px`,
          left: `${finalPosition.x}px`,
          top: `${finalPosition.y}px`,
          backgroundColor: bgColor,
          mixBlendMode,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      />
    );
  }

  if (props.type === "three") {
    const { size = 35, bgColor = "white" } = props;
    return (
      <div
        className="cursor"
        style={{
          ...baseCursorStyle,
          width: `${size}px`,
          height: `${size}px`,
          left: `${finalPosition.x}px`,
          top: `${finalPosition.y}px`,
          border: `2px solid ${bgColor}`,
          backgroundColor: "transparent",
          mixBlendMode,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      />
    );
  }

  if (props.type === "two") {
    const { 
      size = 10,
      sizeDot = size, 
      sizeOutline = size * 4.5, 
      bgColorDot = "white",
      bgColorOutline = "white"
    } = props;

    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        setMousePos({ x: event.clientX, y: event.clientY });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
      <>
        <div
          className="cursor"
          style={{
            ...baseCursorStyle,
            width: `${sizeDot}px`,
            height: `${sizeDot}px`,
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            backgroundColor: bgColorDot,
            mixBlendMode,
            zIndex: 9999,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        />
        <div
          className="cursor"
          style={{
            ...baseCursorStyle,
            width: `${sizeOutline}px`,
            height: `${sizeOutline}px`,
            left: `${finalPosition.x}px`,
            top: `${finalPosition.y}px`,
            border: `2px solid ${bgColorOutline}`,
            backgroundColor: "transparent",
            mixBlendMode,
            zIndex: 9998,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        />
      </>
    );
  }

  return null;
};

export default CustomCursor;