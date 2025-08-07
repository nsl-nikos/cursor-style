import { useCallback } from "react";

export type ClickEffectType = "pulse" ;

let listeners: ((event: {
  x: number;
  y: number;
  type: ClickEffectType;
  color: string;
  size: number;
  duration: number;
}) => void)[] = [];

export const useClickEffect = () => {
  const triggerClickEffect = useCallback(
    (
      x: number,
      y: number,
      type: ClickEffectType = "pulse",
      color: string = "white",
      size: number = 1.5,
      duration: number = 300
    ) => {
      listeners.forEach((cb) =>
        cb({ x, y, type, color, size, duration })
      );
    },
    []
  );

  const subscribe = (cb: typeof listeners[number]) => {
    listeners.push(cb);
    return () => {
      listeners = listeners.filter((l) => l !== cb);
    };
  };

  return { triggerClickEffect, subscribe };
};
