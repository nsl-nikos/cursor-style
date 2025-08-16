import React from "react";

export interface MagnetConfig {
  enabled: boolean;
  strength: number;
  range: number;
  className: string;
  type: "attract" | "repel";
}

export const useMagnetEffect = (
  mousePosition: { x: number; y: number },
  enabled: boolean,
  strength: number,
  range: number,
  className: string,
  type: "attract" | "repel"
) => {
  const [magnetPosition, setMagnetPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!enabled) {
      setMagnetPosition({ x: 0, y: 0 });
      return;
    }

    const magnetElements = document.querySelectorAll(`.${className}`);
    let totalForceX = 0;
    let totalForceY = 0;

    magnetElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      // Calculate distance from mouse to nearest edge of element
      const distanceToEdge = Math.max(
        0,
        Math.max(
          rect.left - mousePosition.x,
          mousePosition.x - rect.right,
          rect.top - mousePosition.y,
          mousePosition.y - rect.bottom
        )
      );

      // Check if mouse is within range of element (including its "padding")
      if (distanceToEdge <= range) {
        // Calculate direction from mouse to element center
        const deltaX = elementCenterX - mousePosition.x;
        const deltaY = elementCenterY - mousePosition.y;
        const distanceToCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distanceToCenter > 0) {
          // Calculate strength based on distance to edge (closer = stronger)
          const magnetStrength = strength * (1 - distanceToEdge / range);
          const force = type === "attract" ? magnetStrength : -magnetStrength;
          
          const normalizedX = deltaX / distanceToCenter;
          const normalizedY = deltaY / distanceToCenter;

          totalForceX += normalizedX * force;
          totalForceY += normalizedY * force;
        }
      }
    });

    setMagnetPosition({
      x: Math.max(-50, Math.min(50, totalForceX)),
      y: Math.max(-50, Math.min(50, totalForceY))
    });
  }, [mousePosition.x, mousePosition.y, enabled, strength, range, className, type]);

  return magnetPosition;
};