export type ClickEffectType = "pulse" | "ripple" | "fade";
export declare const useClickEffect: (clickEffect?: ClickEffectType, clickEffectColor?: string, clickEffectSize?: number, clickEffectDuration?: number, overridePosition?: {
    x: number;
    y: number;
}) => void;
