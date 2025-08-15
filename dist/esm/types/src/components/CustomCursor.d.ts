import React from "react";
interface BaseCursorProps {
    delay?: number;
    useMixBlendDifference?: boolean;
    scaleOnHover?: number;
    size?: number;
    clickEffect?: "pulse" | "ripple" | "fade";
    clickEffectColor?: string;
    clickEffectSize?: number;
    clickEffectDuration?: number;
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
export declare const CustomCursor: React.FC<CustomCursorProps>;
export default CustomCursor;
