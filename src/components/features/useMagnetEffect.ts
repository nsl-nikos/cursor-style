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
    let closestDistance = Infinity;
    let strongestForce = { x: 0, y: 0 };

    magnetElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      const closestX = Math.max(rect.left, Math.min(mousePosition.x, rect.right));
      const closestY = Math.max(rect.top, Math.min(mousePosition.y, rect.bottom));
      const preciseDistance = Math.sqrt(
        Math.pow(mousePosition.x - closestX, 2) + Math.pow(mousePosition.y - closestY, 2)
      );

      if (preciseDistance <= range) {
        const deltaX = elementCenterX - mousePosition.x;
        const deltaY = elementCenterY - mousePosition.y;
        const distanceToCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distanceToCenter > 0) {
          const normalizedDistance = preciseDistance / range;
          const falloff = Math.pow(1 - normalizedDistance, 2);
          
          const magnetStrength = strength * falloff;
          const force = type === "attract" ? magnetStrength : -magnetStrength;
          
          const normalizedX = deltaX / distanceToCenter;
          const normalizedY = deltaY / distanceToCenter;

          const forceX = normalizedX * force;
          const forceY = normalizedY * force;

          if (preciseDistance < closestDistance) {
            closestDistance = preciseDistance;
            strongestForce = { x: forceX * 1.5, y: forceY * 1.5 }; 
          }

          totalForceX += forceX;
          totalForceY += forceY;
        }
      }
    });

    const blendFactor = closestDistance < range * 0.3 ? 0.7 : 0.3;
    const finalForceX = totalForceX * (1 - blendFactor) + strongestForce.x * blendFactor;
    const finalForceY = totalForceY * (1 - blendFactor) + strongestForce.y * blendFactor;

    const maxOffset = 60;
    const clampedX = maxOffset * Math.tanh(finalForceX / maxOffset);
    const clampedY = maxOffset * Math.tanh(finalForceY / maxOffset);

    setMagnetPosition({ x: clampedX, y: clampedY });
  }, [mousePosition.x, mousePosition.y, enabled, strength, range, className, type]);

  return magnetPosition;
};