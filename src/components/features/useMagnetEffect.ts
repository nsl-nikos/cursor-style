import React from "react";

const createMouseEvent = (type: string, x: number, y: number, relatedTarget?: Element | null) => 
  new MouseEvent(type, { bubbles: type !== 'mouseleave' && type !== 'mouseenter', cancelable: true, clientX: x, clientY: y, relatedTarget });

export const useMagnetEffect = (
  mousePosition: { x: number; y: number },
  enabled: boolean,
  strength: number,
  range: number,
  className: string,
  type: "attract" | "repel"
) => {
  const [magnetPosition, setMagnetPosition] = React.useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = React.useState({ x: 0, y: 0 });
  const animationRef = React.useRef<number>();
  const lastHoveredElement = React.useRef<Element | null>(null);

  React.useEffect(() => {
    if (!enabled) {
      setTargetPosition({ x: 0, y: 0 });
      return;
    }

    const magnetElements = document.querySelectorAll(`.${className}`);
    let totalForceX = 0;
    let totalForceY = 0;
    let closestDistance = Infinity;
    let strongestForce = { x: 0, y: 0 };

    magnetElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.5;

      const clampedX = Math.max(rect.left, Math.min(mousePosition.x, rect.right));
      const clampedY = Math.max(rect.top, Math.min(mousePosition.y, rect.bottom));
      const dx = mousePosition.x - clampedX;
      const dy = mousePosition.y - clampedY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= range) {
        const deltaX = centerX - mousePosition.x;
        const deltaY = centerY - mousePosition.y;
        const centerDist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (centerDist > 0) {
          const normalizedDist = distance / range;
          const falloff = (1 - normalizedDist) ** 2;
          const force = (type === "attract" ? strength : -strength) * falloff;
          
          const normX = deltaX / centerDist;
          const normY = deltaY / centerDist;
          const forceX = normX * force;
          const forceY = normY * force;

          if (distance < closestDistance) {
            closestDistance = distance;
            strongestForce = { x: forceX * 1.5, y: forceY * 1.5 }; 
          }

          totalForceX += forceX;
          totalForceY += forceY;
        }
      }
    });

    const blend = closestDistance < range * 0.3 ? 0.7 : 0.3;
    const finalX = totalForceX * (1 - blend) + strongestForce.x * blend;
    const finalY = totalForceY * (1 - blend) + strongestForce.y * blend;

    const max = 60;
    const clampedX = max * Math.tanh(finalX / max);
    const clampedY = max * Math.tanh(finalY / max);

    setTargetPosition({ x: clampedX, y: clampedY });
  }, [mousePosition.x, mousePosition.y, enabled, strength, range, className, type]);

  React.useEffect(() => {
    if (!enabled) return;

    let animationId: number;
    
    const simulateHover = () => {
      const isMagnetic = Math.abs(magnetPosition.x) > 5 || Math.abs(magnetPosition.y) > 5;
      const finalX = isMagnetic ? mousePosition.x + magnetPosition.x : mousePosition.x;
      const finalY = isMagnetic ? mousePosition.y + magnetPosition.y : mousePosition.y;
      const elementBelow = isMagnetic ? document.elementFromPoint(finalX, finalY) : null;
      
      if (lastHoveredElement.current !== elementBelow) {
        if (lastHoveredElement.current) {
          lastHoveredElement.current.dispatchEvent(createMouseEvent('mouseout', finalX, finalY, elementBelow));
          lastHoveredElement.current.dispatchEvent(createMouseEvent('mouseleave', finalX, finalY, elementBelow));
        }
        if (elementBelow) {
          elementBelow.dispatchEvent(createMouseEvent('mouseenter', finalX, finalY, lastHoveredElement.current));
          elementBelow.dispatchEvent(createMouseEvent('mouseover', finalX, finalY, lastHoveredElement.current));
        }
        lastHoveredElement.current = elementBelow;
      }
      animationId = requestAnimationFrame(simulateHover);
    };
    
    animationId = requestAnimationFrame(simulateHover);
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (lastHoveredElement.current) {
        lastHoveredElement.current.dispatchEvent(createMouseEvent('mouseout', mousePosition.x, mousePosition.y));
        lastHoveredElement.current.dispatchEvent(createMouseEvent('mouseleave', mousePosition.x, mousePosition.y));
        lastHoveredElement.current = null;
      }
    };
  }, [enabled, magnetPosition.x, magnetPosition.y, mousePosition.x, mousePosition.y]);

 
  React.useEffect(() => {
    if (!enabled) return;

    const handleClick = (e: MouseEvent) => {
      const finalX = mousePosition.x + magnetPosition.x;
      const finalY = mousePosition.y + magnetPosition.y;
      
   
      const elementBelow = document.elementFromPoint(finalX, finalY);
      
      if (elementBelow && (Math.abs(magnetPosition.x) > 5 || Math.abs(magnetPosition.y) > 5)) {
        e.preventDefault();
        e.stopPropagation();
        
     
        const syntheticEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          clientX: finalX,
          clientY: finalY,
          screenX: e.screenX + magnetPosition.x,
          screenY: e.screenY + magnetPosition.y
        });
        elementBelow.dispatchEvent(syntheticEvent);
      }
    };

    document.addEventListener('click', handleClick, true);
    
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [enabled, magnetPosition.x, magnetPosition.y, mousePosition.x, mousePosition.y]);

 
  React.useEffect(() => {
    const animate = () => {
      setMagnetPosition(current => {
        const deltaX = targetPosition.x - current.x;
        const deltaY = targetPosition.y - current.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < 0.5) {
          return targetPosition;
        }
        
        const easing = 0.15;
        const newPosition = {
          x: current.x + deltaX * easing,
          y: current.y + deltaY * easing
        };
        
        
        return newPosition;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetPosition.x, targetPosition.y, mousePosition.x, mousePosition.y, enabled]);

  return magnetPosition;
};
