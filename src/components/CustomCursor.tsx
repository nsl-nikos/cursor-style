import React from "react";
import { useCursorDelay } from "./features/useCursorDelay";
import { useHoverDetection } from "./features/hoverContext";
import { useClickEffect } from "./features/click-effect/clickEffect";
import { useMagnetEffect } from "./features/useMagnetEffect";

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

interface CursorFourProps extends BaseCursorProps {
  type: "four";
  lineColor?: string;
  lineThickness?: number;
  lineLength?: number;
  rotateAnimation?: boolean;
  tiltEffect?: boolean;
  tiltIntensity?: number;
  hoverTransform?: boolean;
}

interface CursorFiveProps extends BaseCursorProps {
  type: "five";
  bgColor?: string;
  showImages?: boolean;
  imageSize?: number;
  imageFadeDuration?: number;
}

type CustomCursorProps = CursorOneProps | CursorTwoProps | CursorThreeProps | CursorFourProps | CursorFiveProps;

const baseCursorStyle: React.CSSProperties = {
  position: "fixed",
  borderRadius: "50%",
  pointerEvents: "none",
  cursor: "none",
  transition: "transform 0.2s ease, opacity 0.3s ease",
  zIndex: 2147483647,
};

export const CustomCursor: React.FC<CustomCursorProps> = (props) => {
  const {
    delay = props.type === "five" ? 9 : 0,
    useMixBlendDifference = true,
    scaleOnHover = 1.5,
    clickEffect,
    clickEffectColor = "white",
    clickEffectSize = 1.5,
    clickEffectDuration = 300,
    magnetEffect = false,
    magnetStrength = 20,
    magnetRange = 100,
    magnetClassName = "cursor-magnet",
    magnetType = "attract",
  } = props;

  const clampedDelay = Math.max(0, Math.min(delay, 1000));
  const { position } = useCursorDelay(clampedDelay, { x: 0, y: 0 });
  
  const [isWindowFocused, setIsWindowFocused] = React.useState(true);
  
  const magnetOffset = useMagnetEffect(
    position,
    magnetEffect,
    magnetStrength,
    magnetRange,
    magnetClassName,
    magnetType
  );
  
  const finalPosition = {
    x: position.x + magnetOffset.x,
    y: position.y + magnetOffset.y,
  };
  
  const isHovering = useHoverDetection(magnetEffect ? finalPosition : undefined);

  // Window focus/blur detection for cursor visibility
  React.useEffect(() => {
    const handleMouseEnter = () => setIsWindowFocused(true);
    const handleMouseLeave = () => setIsWindowFocused(false);

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  const mixBlendMode = useMixBlendDifference ? "difference" : "normal";
  const scale = isHovering ? scaleOnHover : 1;

  useClickEffect(
    clickEffect, 
    clickEffectColor, 
    clickEffectSize, 
    clickEffectDuration,
    magnetEffect ? finalPosition : undefined
  );

  if (props.type === "one") {
    const { size = 35, bgColor = "white" } = props;
    return (
      <div
        className="cursor"
        style={{
          ...baseCursorStyle,
          width: `${size}px`,
          height: `${size}px`,
          left: `${finalPosition.x}px`,
          top: `${finalPosition.y}px`,
          backgroundColor: bgColor,
          mixBlendMode,
          opacity: isWindowFocused ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      />
    );
  }

  if (props.type === "three") {
    const { size = 35, bgColor = "white" } = props;
    return (
      <div
        className="cursor"
        style={{
          ...baseCursorStyle,
          width: `${size}px`,
          height: `${size}px`,
          left: `${finalPosition.x}px`,
          top: `${finalPosition.y}px`,
          border: `2px solid ${bgColor}`,
          backgroundColor: "transparent",
          
          mixBlendMode,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      />
    );
  }

  if (props.type === "two") {
    const { 
      size = 10,
      sizeDot = size, 
      sizeOutline = size * 4.5, 
      bgColorDot = "white",
      bgColorOutline = "white"
    } = props;

    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        setMousePos({ x: event.clientX, y: event.clientY });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
      <>
        <div
          className="cursor"
          style={{
            ...baseCursorStyle,
            width: `${sizeDot}px`,
            height: `${sizeDot}px`,
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            backgroundColor: bgColorDot,
            mixBlendMode,
            opacity: isWindowFocused ? 1 : 0,
            zIndex: 9999,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        />
        <div
          className="cursor"
          style={{
            ...baseCursorStyle,
            width: `${sizeOutline}px`,
            height: `${sizeOutline}px`,
            left: `${finalPosition.x}px`,
            top: `${finalPosition.y}px`,
            border: `2px solid ${bgColorOutline}`,
            backgroundColor: "transparent",
            mixBlendMode,
            opacity: isWindowFocused ? 1 : 0,
            zIndex: 9998,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        />
      </>
    );
  }

  if (props.type === "four") {
    const { 
      lineColor = "white",
      lineThickness = 2,
      lineLength = 30,
      rotateAnimation = false,
      tiltEffect = false,
      tiltIntensity = 15,
      hoverTransform = false
    } = props;

    const [tiltAngle, setTiltAngle] = React.useState(0);
    const lastPositionRef = React.useRef({ x: finalPosition.x, y: finalPosition.y });
    const resetTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(() => {
      if (tiltEffect) {
        const deltaX = finalPosition.x - lastPositionRef.current.x;
        const deltaY = finalPosition.y - lastPositionRef.current.y;
        
        if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
          const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
          setTiltAngle(angle);
          
          // Clear existing timeout
          if (resetTimeoutRef.current) {
            clearTimeout(resetTimeoutRef.current);
          }
          
          // Set new timeout to reset tilt after 150ms of no movement
          resetTimeoutRef.current = setTimeout(() => {
            setTiltAngle(0);
          }, 150);
        }
        
        lastPositionRef.current = { x: finalPosition.x, y: finalPosition.y };
      }
      
      return () => {
        if (resetTimeoutRef.current) {
          clearTimeout(resetTimeoutRef.current);
        }
      };
    }, [finalPosition.x, finalPosition.y, tiltEffect]);

    const rotationStyle = rotateAnimation ? {
      animation: "crosshair-rotate 2s linear infinite",
      animationFillMode: "forwards",
    } : {};

    React.useEffect(() => {
      let style: HTMLStyleElement | null = null;
      if (rotateAnimation) {
        style = document.createElement('style');
        style.textContent = `
          @keyframes crosshair-rotate {
            from { transform: translate(-50%, -50%) scale(${scale}) rotate(0deg); }
            to { transform: translate(-50%, -50%) scale(${scale}) rotate(360deg); }
          }
        `;
        document.head.appendChild(style);
      }
      return () => {
        if (style) {
          document.head.removeChild(style);
        }
      };
    }, [rotateAnimation, scale]);

    const getTransform = () => {
      if (rotateAnimation) {
        return "none"; // Animation handles the transform
      } else if (hoverTransform && isHovering) {
        return `translate(-50%, -50%) scale(${scale}) rotate(45deg)`;
      } else if (tiltEffect) {
        return `translate(-50%, -50%) scale(${scale}) rotate(${tiltAngle * (tiltIntensity / 100)}deg)`;
      }
      
      return `translate(-50%, -50%) scale(${scale})`;
    };

    const getTransition = () => {
      if (rotateAnimation) {
        return "transform 0.2s ease";
      } else if ((tiltEffect && !rotateAnimation) || hoverTransform) {
        return "transform 0.3s ease-out";
      }
      return baseCursorStyle.transition;
    };

    return (
      <>
        <div
          className="cursor"
          style={{
            ...baseCursorStyle,
            width: `${lineThickness}px`,
            height: `${lineLength}px`,
            left: `${finalPosition.x}px`,
            top: `${finalPosition.y}px`,
            backgroundColor: lineColor,
            borderRadius: "0",
            mixBlendMode,
            opacity: isWindowFocused ? 1 : 0,
            transform: getTransform(),
            transition: getTransition(),
            ...rotationStyle,
          }}
        />
        <div
          className="cursor"
          style={{
            ...baseCursorStyle,
            
            width: `${lineLength}px`,
            height: `${lineThickness}px`,
            left: `${finalPosition.x}px`,
            top: `${finalPosition.y}px`,
            backgroundColor: lineColor,
            borderRadius: "0",
            mixBlendMode,
            opacity: isWindowFocused ? 1 : 0,
            transform: getTransform(),
            transition: getTransition(),
            ...rotationStyle,
          }}
        />
      </>
    );
  }

  if (props.type === "five") {
    const { 
      size = 35, 
      bgColor = "white",
      showImages = false,
      imageSize = 300,
      imageFadeDuration = 300
    } = props;

    const [hoveredImage, setHoveredImage] = React.useState<string | null>(null);
    const [imageVisible, setImageVisible] = React.useState(false);
    const [preloadedImages, setPreloadedImages] = React.useState<Set<string>>(new Set());
    const imageRef = React.useRef<HTMLImageElement>(null);
    const exitTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const debounceTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    // Inject popup animation CSS
    React.useEffect(() => {
      if (!showImages) return;

      const style = document.createElement('style');
      style.textContent = `
        @keyframes image-popup {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        @keyframes image-exit {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
        }
        
        @keyframes text-background-popup {
          0% {
            background-size: 0% 100%;
            background-position: 0% 100%;
          }
          100% {
            background-size: 100% 100%;
            background-position: 0% 100%;
          }
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }, [showImages]);

    // Preload images on mount
    React.useEffect(() => {
      if (!showImages) return;

      const scanAndPreloadImages = () => {
        const elements = document.querySelectorAll('[data-cursor-image]');
        const imageUrls = Array.from(elements)
          .map(el => el.getAttribute('data-cursor-image'))
          .filter((url): url is string => Boolean(url));

        const uniqueUrls = [...new Set(imageUrls)];
        
        uniqueUrls.forEach(url => {
          if (!preloadedImages.has(url)) {
            const img = new Image();
            img.onload = () => {
              setPreloadedImages(prev => new Set(prev).add(url));
            };
            img.src = url;
          }
        });
      };

      scanAndPreloadImages();
      
      // Re-scan periodically for dynamically added elements
      const interval = setInterval(scanAndPreloadImages, 2000);
      return () => clearInterval(interval);
    }, [showImages, preloadedImages]);

    // Hover detection for image elements
    React.useEffect(() => {
      if (!showImages) return;

      const handleMouseEnter = (e: Event) => {
        const target = e.target as HTMLElement;
        const imageUrl = target.getAttribute('data-cursor-image');
        if (imageUrl) {
          // Clear any pending timeouts
          if (exitTimeoutRef.current) {
            clearTimeout(exitTimeoutRef.current);
            exitTimeoutRef.current = null;
          }
          if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
            debounceTimeoutRef.current = null;
          }
          
          // If not preloaded, preload it now and show after loading
          if (!preloadedImages.has(imageUrl)) {
            const img = new Image();
            img.onload = () => {
              setPreloadedImages(prev => new Set(prev).add(imageUrl));
              // Show image after it's loaded
              setHoveredImage(imageUrl);
              setImageVisible(true);
              // Add background animation
              target.style.position = 'relative';
              target.style.zIndex = '9999';
              target.style.background = 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 100%)';
              target.style.backgroundRepeat = 'no-repeat';
              target.style.borderRadius = '4px';
              target.style.color = 'white';
              target.style.animation = `text-background-popup ${imageFadeDuration}ms ease forwards`;
              target.style.backgroundSize = '100% 100%';
              target.style.backgroundPosition = '0% 100%';
            };
            img.src = imageUrl;
          } else {
            // Image is preloaded, show immediately with debounce
            debounceTimeoutRef.current = setTimeout(() => {
              setHoveredImage(imageUrl);
              setImageVisible(true);
              // Ensure hovered element stays above image and add background animation
              target.style.position = 'relative';
              target.style.zIndex = '9999';
              target.style.background = 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 100%)';
              target.style.backgroundRepeat = 'no-repeat';
              target.style.borderRadius = '4px';
              target.style.color = 'white';
              target.style.animation = `text-background-popup ${imageFadeDuration}ms ease forwards`;
              target.style.backgroundSize = '100% 100%';
              target.style.backgroundPosition = '0% 100%';
              debounceTimeoutRef.current = null;
            }, 50);
          }
        }
      };

      const handleMouseLeave = (e: Event) => {
        const target = e.target as HTMLElement;
        
        // Clear debounce timeout if pending
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
          debounceTimeoutRef.current = null;
        }
        
        // Debounce exit as well
        debounceTimeoutRef.current = setTimeout(() => {
          setImageVisible(false);
          // Reset all styles when leaving
          target.style.zIndex = '';
          target.style.background = '';
          target.style.borderRadius = '';
          target.style.color = '';
          target.style.animation = '';
          target.style.backgroundSize = '';
          target.style.backgroundPosition = '';
          
          // Clear any existing timeout and set new one
          if (exitTimeoutRef.current) {
            clearTimeout(exitTimeoutRef.current);
          }
          
          // Remove hoveredImage after animation completes
          exitTimeoutRef.current = setTimeout(() => {
            setHoveredImage(null);
            exitTimeoutRef.current = null;
          }, imageFadeDuration);
          
          debounceTimeoutRef.current = null;
        }, 50);
      };

      const elements = document.querySelectorAll('[data-cursor-image]');
      elements.forEach(el => {
        // Use both mouseenter/leave AND mouseover/out for better reliability
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseover', handleMouseEnter);
        el.addEventListener('mouseout', handleMouseLeave);
      });

      return () => {
        elements.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
          el.removeEventListener('mouseover', handleMouseEnter);
          el.removeEventListener('mouseout', handleMouseLeave);
        });
        
        // Clear timeout on cleanup
        if (exitTimeoutRef.current) {
          clearTimeout(exitTimeoutRef.current);
          exitTimeoutRef.current = null;
        }
      };
    }, [showImages, preloadedImages]);

    return (
      <>
        <div
          className="cursor"
          style={{
            ...baseCursorStyle,
            width: `${size}px`,
            height: `${size}px`,
            left: `${finalPosition.x}px`,
            top: `${finalPosition.y}px`,
            border: `2px solid ${bgColor}`,
            backgroundColor: "transparent",
            mixBlendMode,
            opacity: isWindowFocused ? 1 : 0,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        />
        {showImages && hoveredImage && (
          <img
            key={hoveredImage}
            ref={imageRef}
            src={hoveredImage}
            alt=""
            style={{
              position: 'fixed',
              left: `${finalPosition.x}px`,
              top: `${finalPosition.y}px`,
              width: `${imageSize}px`,
              height: 'auto',
              maxHeight: `${imageSize}px`,
              objectFit: 'cover',
              borderRadius: '8px',
              pointerEvents: 'none',
              zIndex: 1000,
              opacity: isWindowFocused ? 1 : 0,
              transform: 'translate(-50%, -50%)',
              transition: 'opacity 0.3s ease',
              animation: imageVisible 
                ? `image-popup ${imageFadeDuration}ms ease forwards`
                : `image-exit ${imageFadeDuration}ms ease forwards`,
            }}
          />
        )}
      </>
    );
  }

  return null;
};

export default CustomCursor;