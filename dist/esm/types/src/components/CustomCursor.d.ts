import React from "react";
import type { ScaleOnHoverRange, DelayRange, SizeRange, LineThicknessRange, LineLengthRange, TiltIntensityRange, ImageSizeRange, ImageFadeDurationRange, BaseSizeRange, MorphDurationRange, MagnetRangeValue, MagnetStrengthValue, ClickEffectDurationRange, ClickEffectSizeRange } from "../types/ranges";
interface BaseCursorProps {
    /**
     * Cursor smoothing delay in milliseconds (range: 0-50)
     * Higher values create more lag/trailing effect
     * @default 0 (9 for cursor type "five")
     */
    delay?: DelayRange;
    useMixBlendDifference?: boolean;
    /**
     * Scale multiplier applied when hovering over elements (range: -10 to +10)
     * - Negative values (e.g., -5) shrink the cursor
     * - Positive values (e.g., 5) enlarge the cursor
     * - 0 means no scale change on hover
     * @default 0
     */
    scaleOnHover?: ScaleOnHoverRange;
    /**
     * Base cursor size (range: 0-100)
     * Note: Value is multiplied by 10 internally (e.g., 35 becomes 350px)
     * @default 35 (varies by cursor type)
     */
    size?: SizeRange;
    clickEffect?: "pulse" | "ripple" | "fade";
    clickEffectColor?: string;
    /**
     * Click effect size multiplier (range: 0-100)
     * Note: Value is multiplied by 10 internally
     * @default 1.5
     */
    clickEffectSize?: ClickEffectSizeRange;
    /**
     * Click effect animation duration (range: 0-100)
     * Note: Value is multiplied by 10 internally (e.g., 30 becomes 300ms)
     * @default 30
     */
    clickEffectDuration?: ClickEffectDurationRange;
    magnetEffect?: boolean;
    /**
     * Magnet effect strength (range: 0-50)
     * Note: Value is multiplied by 10 internally
     * @default 2
     */
    magnetStrength?: MagnetStrengthValue;
    /**
     * Magnet effect range in pixels (range: 0-50)
     * Note: Value is multiplied by 10 internally (e.g., 10 becomes 100px)
     * @default 10
     */
    magnetRange?: MagnetRangeValue;
    magnetClassName?: string;
    magnetType?: "attract" | "repel";
    /**
     * Fade out cursor when window loses focus or user switches tabs
     * @default true
     */
    fadeOnLeave?: boolean;
}
interface CursorOneProps extends BaseCursorProps {
    type: "one";
    bgColor?: string;
}
interface CursorTwoProps extends BaseCursorProps {
    type: "two";
    /**
     * Dot cursor size (range: 0-100)
     * Note: Value is multiplied by 10 internally (e.g., 10 becomes 100px)
     * @default Uses main size prop value
     */
    sizeDot?: SizeRange;
    /**
     * Outline cursor size (range: 0-100)
     * Note: Value is multiplied by 10 internally (e.g., 45 becomes 450px)
     * @default 4.5x the main size prop
     */
    sizeOutline?: SizeRange;
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
    /**
     * Crosshair line thickness in pixels (range: 0-50)
     * @default 2
     */
    lineThickness?: LineThicknessRange;
    /**
     * Crosshair line length in pixels (range: 0-100)
     * @default 30
     */
    lineLength?: LineLengthRange;
    rotateAnimation?: boolean;
    tiltEffect?: boolean;
    /**
     * Tilt effect intensity as percentage (range: 0-100)
     * @default 15
     */
    tiltIntensity?: TiltIntensityRange;
    hoverTransform?: boolean;
}
interface CursorFiveProps extends BaseCursorProps {
    type: "five";
    bgColor?: string;
    showImages?: boolean;
    /**
     * Image preview size (range: 0-100)
     * Note: Value is multiplied by 10 internally (e.g., 30 becomes 300px)
     * @default 30
     */
    imageSize?: ImageSizeRange;
    /**
     * Image fade animation duration (range: 0-100)
     * Note: Value is multiplied by 10 internally (e.g., 30 becomes 300ms)
     * @default 30
     */
    imageFadeDuration?: ImageFadeDurationRange;
}
interface CursorSixProps extends BaseCursorProps {
    type: "six";
    /**
     * Base cursor size (range: 0-100)
     * Note: Value is multiplied by 10 internally (e.g., 2 becomes 20px)
     * @default 2
     */
    baseSize?: BaseSizeRange;
    bgColor?: string;
    /**
     * Morph animation duration (range: 0-100)
     * Note: Value is multiplied by 10 internally (e.g., 20 becomes 200ms)
     * @default 20
     */
    morphDuration?: MorphDurationRange;
}
type CustomCursorProps = CursorOneProps | CursorTwoProps | CursorThreeProps | CursorFourProps | CursorFiveProps | CursorSixProps;
export declare const CustomCursor: React.FC<CustomCursorProps>;
export default CustomCursor;
