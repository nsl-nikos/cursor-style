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

    setTargetPosition({ x: clampedX, y: clampedY });
  }, [mousePosition.x, mousePosition.y, enabled, strength, range, className, type]);

  React.useEffect(() => {
    if (!enabled) return;

    let animationId: number;
    
    const simulateHover = () => {
      const isMagnetic = Math.abs(magnetPosition.x) > 5 || Math.abs(magnetPosition.y) > 5;
      
      if (isMagnetic) {
        const finalX = mousePosition.x + magnetPosition.x;
        const finalY = mousePosition.y + magnetPosition.y;
        
   
        const elementBelow = document.elementFromPoint(finalX, finalY);
        
       
        if (lastHoveredElement.current !== elementBelow) {
      
          if (lastHoveredElement.current) {
         
            (lastHoveredElement.current as HTMLElement).classList?.remove('magnet-hover');
            (lastHoveredElement.current as HTMLElement).removeAttribute?.('data-magnet-hover');
            
         
            const mouseOutEvent = new MouseEvent('mouseout', {
              bubbles: true,
              cancelable: true,
              clientX: finalX,
              clientY: finalY,
              relatedTarget: elementBelow as Element
            });
            lastHoveredElement.current.dispatchEvent(mouseOutEvent);
            
            const mouseLeaveEvent = new MouseEvent('mouseleave', {
              bubbles: false,
              cancelable: true,
              clientX: finalX,
              clientY: finalY,
              relatedTarget: elementBelow as Element
            });
            lastHoveredElement.current.dispatchEvent(mouseLeaveEvent);
          }
          
       
          if (elementBelow) {
          
            (elementBelow as HTMLElement).classList?.add('magnet-hover');
            (elementBelow as HTMLElement).setAttribute?.('data-magnet-hover', 'true');
            
           
            const mouseEnterEvent = new MouseEvent('mouseenter', {
              bubbles: false,
              cancelable: true,
              clientX: finalX,
              clientY: finalY,
              relatedTarget: lastHoveredElement.current as Element
            });
            elementBelow.dispatchEvent(mouseEnterEvent);
            
            const mouseOverEvent = new MouseEvent('mouseover', {
              bubbles: true,
              cancelable: true,
              clientX: finalX,
              clientY: finalY,
              relatedTarget: lastHoveredElement.current as Element
            });
            elementBelow.dispatchEvent(mouseOverEvent);
          }
          
          lastHoveredElement.current = elementBelow;
        }
      } else {
    
        if (lastHoveredElement.current) {
        
          (lastHoveredElement.current as HTMLElement).classList?.remove('magnet-hover');
          (lastHoveredElement.current as HTMLElement).removeAttribute?.('data-magnet-hover');
          
          const mouseOutEvent = new MouseEvent('mouseout', {
            bubbles: true,
            cancelable: true,
            clientX: mousePosition.x,
            clientY: mousePosition.y
          });
          lastHoveredElement.current.dispatchEvent(mouseOutEvent);
          
          const mouseLeaveEvent = new MouseEvent('mouseleave', {
            bubbles: false,
            cancelable: true,
            clientX: mousePosition.x,
            clientY: mousePosition.y
          });
          lastHoveredElement.current.dispatchEvent(mouseLeaveEvent);
          
          lastHoveredElement.current = null;
        }
      }
      
      animationId = requestAnimationFrame(simulateHover);
    };
    
    animationId = requestAnimationFrame(simulateHover);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      
      if (lastHoveredElement.current) {
        (lastHoveredElement.current as HTMLElement).classList?.remove('magnet-hover');
        (lastHoveredElement.current as HTMLElement).removeAttribute?.('data-magnet-hover');
        
        const mouseOutEvent = new MouseEvent('mouseout', {
          bubbles: true,
          cancelable: true,
          clientX: mousePosition.x,
          clientY: mousePosition.y
        });
        lastHoveredElement.current.dispatchEvent(mouseOutEvent);
        
        const mouseLeaveEvent = new MouseEvent('mouseleave', {
          bubbles: false,
          cancelable: true,
          clientX: mousePosition.x,
          clientY: mousePosition.y
        });
        lastHoveredElement.current.dispatchEvent(mouseLeaveEvent);
        
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
