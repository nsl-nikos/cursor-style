import React from "react";
import CursorOne from "./CursorOne";
import { CursorTwo } from "./CursorTwo"; 
import CursorThree from "./CursorThree";

export const CustomCursor: React.FC<{
  type: string;
  delay?: number;
  size?: number;
  sizeDot?: number;
  sizeOutline?: number;
  bgColor?: string; 
  bgColorDot?: string; 
  bgColorOutline?: string; 
  useMixBlendDifference?: boolean;
}> = ({
  type,
  delay = 0, 
  size,
  sizeDot,
  sizeOutline,
  bgColor,
  bgColorDot,
  bgColorOutline,
  useMixBlendDifference,
}) => {
  const clampedDelay = Math.max(0, Math.min(delay, 1000)); 

  switch (type) {
    case "one":
      return (
        <CursorOne
          delay={clampedDelay}
          size={size}
          bgColor={bgColor}
          useMixBlendDifference={useMixBlendDifference}
        />
      );
    case "two":
      return (
        <CursorTwo
          delay={clampedDelay}
          sizeDot={sizeDot}
          sizeOutline={sizeOutline}
          bgColorDot={bgColorDot} 
          bgColorOutline={bgColorOutline}
          useMixBlendDifference={useMixBlendDifference}
        />
      );
    case "three":
      return (
        <CursorThree
          delay={clampedDelay}
          size={size}
          bgColor={bgColor}
          useMixBlendDifference={useMixBlendDifference}
        />
      );
    default:
      return null;
  }
};

export default CustomCursor;
