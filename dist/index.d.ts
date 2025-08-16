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
type CustomCursorProps = CursorOneProps | CursorTwoProps | CursorThreeProps;
declare const CustomCursor: React.FC<CustomCursorProps>;

interface MagnetConfig {
    enabled: boolean;
    strength: number;
    range: number;
    className: string;
    type: "attract" | "repel";
}

export { CustomCursor, type MagnetConfig };
