export type ClickEffectType = "pulse";
declare let listeners: ((event: {
    x: number;
    y: number;
    type: ClickEffectType;
    color: string;
    size: number;
    duration: number;
}) => void)[];
export declare const useClickEffect: () => {
    triggerClickEffect: (x: number, y: number, type?: ClickEffectType, color?: string, size?: number, duration?: number) => void;
    subscribe: (cb: (typeof listeners)[number]) => () => void;
};
export {};
