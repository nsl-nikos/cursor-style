import React from 'react';

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
interface CursorFourProps extends BaseCursorProps {
    type: "four";
    lineColor?: string;
    lineThickness?: number;
    lineLength?: number;
    rotateAnimation?: boolean;
    tiltEffect?: boolean;
    tiltIntensity?: number;
    hoverTransform?: boolean;
}
interface CursorFiveProps extends BaseCursorProps {
    type: "five";
    bgColor?: string;
    showImages?: boolean;
    imageSize?: number;
    imageFadeDuration?: number;
}
interface CursorSixProps extends BaseCursorProps {
    type: "six";
    baseSize?: number;
    bgColor?: string;
    morphDuration?: number;
    morphScale?: number;
}
type CustomCursorProps = CursorOneProps | CursorTwoProps | CursorThreeProps | CursorFourProps | CursorFiveProps | CursorSixProps;
declare const CustomCursor: React.FC<CustomCursorProps>;

export { CustomCursor };
