import { useRef, useEffect, useState } from "react";

interface Position {
  x: number;
  y: number;
}

export const useCursorDelay = (delay: number = 0, initialPosition: Position) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const frame = useRef<number>(0);
  const targetPosition = useRef<Position>(initialPosition);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      targetPosition.current = { x: event.clientX, y: event.clientY };
      if (delay === 0) {
        setPosition(targetPosition.current);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [delay]);

  useEffect(() => {
    if (delay === 0) return;

    const updatePosition = () => {
      const ALPHA_FACTOR = 0.09;
      const alpha = 1 - delay * ALPHA_FACTOR;
      const newX = (1 - alpha) * position.x + alpha * targetPosition.current.x;
      const newY = (1 - alpha) * position.y + alpha * targetPosition.current.y;
      
      setPosition({ x: newX, y: newY });
      frame.current = requestAnimationFrame(updatePosition);
    };

    frame.current = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(frame.current);
  }, [position, delay]);

  return { position };
};