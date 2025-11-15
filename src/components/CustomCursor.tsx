import React from "react";
import { useCursorDelay } from "./features/useCursorDelay";
import { useHoverDetection } from "./features/hoverContext";
import { useClickEffect } from "./features/click-effect/clickEffect";
import { useMagnetEffect } from "./features/useMagnetEffect";
import type {
  ScaleOnHoverRange,
  DelayRange,
  SizeRange,
  LineThicknessRange,
  LineLengthRange,
  TiltIntensityRange,
  ImageSizeRange,
  ImageFadeDurationRange,
  BaseSizeRange,
  MorphDurationRange,
  MagnetRangeValue,
  MagnetStrengthValue,
  ClickEffectDurationRange,
  ClickEffectSizeRange,
} from "../types/ranges";

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
   * Override the cursor opacity (0-1). When provided, this takes precedence over internal opacity logic.
   * Useful for custom fade in/out animations.
   */
  overrideOpacity?: number;
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
  /**
   * Enable text hover effect on elements with data-cursor-image
   * When enabled, ensures text elements appear above the image preview (higher z-index)
   * Users can style [data-cursor-image]:hover in their CSS for custom hover effects
   * @default false
   */
  enableTextHoverEffect?: boolean;
  /**
   * Delay for image following cursor movement in milliseconds (range: 0-50)
   * Creates a smooth, floating effect where image lags behind cursor
   * @default 15
   */
  imageFollowDelay?: DelayRange;
  /**
   * Horizontal offset of image from cursor position (range: -10 to 10)
   * Positive values move image to the right, negative to the left
   * Note: Value is multiplied by 10 internally (e.g., 5 becomes 50px, -2 becomes -20px)
   * @default 0
   */
  imageOffsetX?: ScaleOnHoverRange;
  /**
   * Vertical offset of image from cursor position (range: -10 to 10)
   * Positive values move image down, negative moves up
   * Note: Value is multiplied by 10 internally (e.g., 5 becomes 50px, -2 becomes -20px)
   * @default 0
   */
  imageOffsetY?: ScaleOnHoverRange;
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

const baseCursorStyle: React.CSSProperties = {
  position: "fixed",
  borderRadius: "50%",
  pointerEvents: "none",
  cursor: "none",
  transition: "transform 0.2s ease, opacity 0.3s ease",
  zIndex: 2147483647,
};

// Helper to clamp and multiply values
const clamp = (val: number, min: number, max: number, multiplier = 1) =>
  Math.max(min, Math.min(val, max)) * multiplier;

export const CustomCursor: React.FC<CustomCursorProps> = (props) => {
  const {
    delay = props.type === "five" ? 30 : props.type === "one" ? 30 : props.type === "two" ? 40 : props.type === "three" ? 35 : props.type === "four" ? 20 : props.type === "six" ? 25 : 0,
    useMixBlendDifference = true,
    scaleOnHover: rawScaleOnHover = props.type === "one" ? 1 : props.type === "two" ? 0.5 : props.type === "four" ? 1 : 0,
    clickEffect,
    clickEffectColor = "white",
    clickEffectSize: rawClickEffectSize = 1.5,
    clickEffectDuration: rawClickEffectDuration = 30,
    magnetEffect = false,
    magnetStrength: rawMagnetStrength = 2,
    magnetRange: rawMagnetRange = 10,
    magnetClassName = "cursor-magnet",
    magnetType = "attract",
    overrideOpacity,
  } = props;

  const magnetStrength = clamp(rawMagnetStrength, 0, 50, 10);
  const magnetRange = clamp(rawMagnetRange, 0, 50, 10);
  const clickEffectSize = clamp(rawClickEffectSize, 0, 100, 10);
  const clickEffectDuration = clamp(rawClickEffectDuration, 0, 100, 10);
  const clampedDelay = clamp(delay, 0, 50);

  const clampedScaleInput = clamp(rawScaleOnHover, -10, 10);
  const scaleOnHover = clampedScaleInput < 0
    ? 1 + (clampedScaleInput / 10) * 0.9
    : 1 + (clampedScaleInput / 10) * 9;

  const { position } = useCursorDelay(clampedDelay, { x: -9999, y: -9999 });

  const [hasMovedOnce, setHasMovedOnce] = React.useState(false);
  const [currentMousePos, setCurrentMousePos] = React.useState({ x: -9999, y: -9999 });

  // Track real mouse position
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCurrentMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Only show cursor when it's close to actual mouse position
  React.useEffect(() => {
    if (position.x === -9999 || position.y === -9999) {
      setHasMovedOnce(false);
      return;
    }

    const distance = Math.sqrt(
      Math.pow(position.x - currentMousePos.x, 2) +
      Math.pow(position.y - currentMousePos.y, 2)
    );

    // Show cursor only when within 50px of actual mouse (very tight threshold)
    // and hide again if it drifts away
    if (distance < 50) {
      setHasMovedOnce(true);
    } else if (distance > 150) {
      setHasMovedOnce(false);
    }
  }, [position.x, position.y, currentMousePos.x, currentMousePos.y]);
  
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

  const mixBlendMode = useMixBlendDifference ? "difference" : "normal";
  const scale = isHovering ? scaleOnHover : 1;

  // Calculate final opacity: use override if provided, otherwise use internal logic
  const finalOpacity = overrideOpacity !== undefined
    ? overrideOpacity
    : (hasMovedOnce ? 1 : 0);

  useClickEffect(
    clickEffect,
    clickEffectColor,
    clickEffectSize,
    clickEffectDuration,
    magnetEffect ? finalPosition : undefined
  );

  if (props.type === "one") {
    const { size: rawSize = 5, bgColor = "white" } = props;
    const size = clamp(rawSize, 0, 100, 10);
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
          opacity: finalOpacity,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      />
    );
  }

  if (props.type === "three") {
    const { size: rawSize = 4, bgColor = "white" } = props;
    const size = clamp(rawSize, 0, 100, 10);
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
          opacity: finalOpacity,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      />
    );
  }

  if (props.type === "two") {
    const {
      sizeDot: rawSizeDot = 1,
      sizeOutline: rawSizeOutline = 4,
      bgColorDot = "white",
      bgColorOutline = "white"
    } = props;

    const sizeDot = clamp(rawSizeDot, 0, 100, 10);
    const sizeOutline = clamp(rawSizeOutline, 0, 100, 10);

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
            opacity: finalOpacity,
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
            opacity: finalOpacity,
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
      lineThickness: rawLineThickness = 2,
      lineLength: rawLineLength = 30,
      rotateAnimation = false,
      tiltEffect = true,
      tiltIntensity: rawTiltIntensity = 20,
      hoverTransform = true
    } = props;

    const lineThickness = clamp(rawLineThickness, 0, 50);
    const lineLength = clamp(rawLineLength, 0, 100);
    const tiltIntensity = clamp(rawTiltIntensity, 0, 100);

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
          
        
          if (resetTimeoutRef.current) {
            clearTimeout(resetTimeoutRef.current);
          }
          
          
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
        return "none"; 
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
            opacity: finalOpacity,
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
            opacity: finalOpacity,
            transform: getTransform(),
            transition: getTransition(),
            ...rotationStyle,
          }}
        />
      </>
    );
  }

  if (props.type === "six") {
    const {
      baseSize: rawBaseSize = 2,
      bgColor = "white",
      morphDuration: rawMorphDuration = 20
    } = props;

    const baseSize = clamp(rawBaseSize, 0, 100, 10);
    const morphDuration = clamp(rawMorphDuration, 0, 100, 10);

    const morphSelector = "button, a, input, textarea, select, [role='button'], [tabindex]:not([tabindex='-1']), .hoverable, [data-cursor-hover]";
    const morphEasing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    const demorphEasing = "cubic-bezier(0.33, 1, 0.68, 1)"; // Bounce easing for de-morph

    const [morphedElement, setMorphedElement] = React.useState<HTMLElement | null>(null);
    const [isTransitioningMorph, setIsTransitioningMorph] = React.useState(false);
    const morphTransitionTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const morphedElementRef = React.useRef<HTMLElement | null>(null);
    const [morphStyle, setMorphStyle] = React.useState({
      width: baseSize,
      height: baseSize,
      borderRadius: "50%",
      x: 0,
      y: 0,
    });

    React.useEffect(() => {
      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        // Ignore cursor element itself and body/html
        if (target.classList.contains('cursor') ||
            target === document.body ||
            target === document.documentElement ||
            target.tagName === 'HTML' ||
            target.tagName === 'BODY') {
          return;
        }

        // Check if target matches morphable selector
        if (!target.matches(morphSelector)) {
          return;
        }

        const rect = target.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(target);

        // Get center position of element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Clear any pending de-morph transition
        if (morphTransitionTimeoutRef.current) {
          clearTimeout(morphTransitionTimeoutRef.current);
          morphTransitionTimeoutRef.current = null;
        }
        setIsTransitioningMorph(false);

        // Morph to exact element dimensions (no scaling)
        setMorphedElement(target);
        morphedElementRef.current = target;
        setMorphStyle({
          width: rect.width,
          height: rect.height,
          borderRadius: computedStyle.borderRadius || "0px",
          x: centerX,
          y: centerY,
        });
      };


      
      const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

      const rect = target.getBoundingClientRect();
      console.log('🎯 MORPH:', { 
        left: rect.left, 
        top: rect.top, 
        width: rect.width, 
        height: rect.height,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2
      });

        // Only de-morph if leaving the currently morphed element
        if (target === morphedElementRef.current && morphedElementRef.current) {
          const mouseEvent = e as MouseEvent;

          setMorphedElement(null);
          morphedElementRef.current = null;

          // Start de-morph transition - animate back to circle at exit position
          setIsTransitioningMorph(true);
          setMorphStyle({
            width: baseSize,
            height: baseSize,
            borderRadius: "50%",
            x: mouseEvent.clientX, // Move to exit position
            y: mouseEvent.clientY,
          });

          // After morphDuration, mark transition as complete
          const timeoutId = setTimeout(() => {
            setIsTransitioningMorph(false);
            morphTransitionTimeoutRef.current = null;
          }, morphDuration);
          morphTransitionTimeoutRef.current = timeoutId;
        }
      };

      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);

      return () => {
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseout', handleMouseOut);
        if (morphTransitionTimeoutRef.current) {
          clearTimeout(morphTransitionTimeoutRef.current);
        }
      };
    }, [morphSelector, baseSize, morphDuration]);

    // Follow cursor when not morphed (including during de-morph transition)
    React.useEffect(() => {
      if (morphedElement) return;

      setMorphStyle(prev => ({
        ...prev,
        x: finalPosition.x,
        y: finalPosition.y,
      }));
    }, [finalPosition.x, finalPosition.y, morphedElement]);

    // Dynamic transition based on state
    const getTransitionValue = () => {
      if (morphedElement) {
        return `left ${morphDuration}ms ${morphEasing}, top ${morphDuration}ms ${morphEasing}, width ${morphDuration}ms ${morphEasing}, height ${morphDuration}ms ${morphEasing}, border-radius ${morphDuration}ms ${morphEasing}, transform 0.2s ease, opacity 0.3s ease`;
      } else if (isTransitioningMorph) {
        // De-morphing: faster position transition with bounce, smooth size/shape
        const positionDuration = morphDuration * 0.6;
        return `left ${positionDuration}ms ${demorphEasing}, top ${positionDuration}ms ${demorphEasing}, width ${morphDuration}ms ${morphEasing}, height ${morphDuration}ms ${morphEasing}, border-radius ${morphDuration}ms ${morphEasing}, transform 0.2s ease, opacity 0.3s ease`;
      }
      // Normal state: no transition (follows cursor instantly)
      return "transform 0.2s ease, opacity 0.3s ease";
    };

    const cursorPosition = morphedElement
      ? { x: morphStyle.x, y: morphStyle.y }
      : finalPosition;

    return (
      <div
        className="cursor"
        style={{
          ...baseCursorStyle,
          width: `${morphStyle.width}px`,
          height: `${morphStyle.height}px`,
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          backgroundColor: "transparent",
          outline: `2px solid ${bgColor}`,
          outlineOffset: "-2px",
          borderRadius: morphStyle.borderRadius,
          mixBlendMode,
          opacity: finalOpacity,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transition: getTransitionValue(),
        }}
      />
    );
  }

  if (props.type === "five") {
    const {
      size: rawSize = 3,
      bgColor = "white",
      showImages = false,
      imageSize: rawImageSize = 30,
      imageFadeDuration: rawImageFadeDuration = 30,
      enableTextHoverEffect = false,
      imageFollowDelay: rawImageFollowDelay = 15,
      imageOffsetX: rawImageOffsetX = 0,
      imageOffsetY: rawImageOffsetY = 0
    } = props;

    const size = clamp(rawSize, 0, 100, 10);
    const imageSize = clamp(rawImageSize, 0, 100, 10);
    const imageFadeDuration = clamp(rawImageFadeDuration, 0, 100, 10);
    const imageFollowDelay = clamp(rawImageFollowDelay, 0, 50);
    const imageOffsetX = clamp(rawImageOffsetX, -10, 10, 10);
    const imageOffsetY = clamp(rawImageOffsetY, -10, 10, 10);

    const [hoveredImage, setHoveredImage] = React.useState<string | null>(null);
    const [imageVisible, setImageVisible] = React.useState(false);
    const [preloadedImages, setPreloadedImages] = React.useState<Set<string>>(new Set());
    const [imagePosition, setImagePosition] = React.useState({ x: finalPosition.x, y: finalPosition.y });
    const imageRef = React.useRef<HTMLImageElement>(null);
    const exitTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const debounceTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const imageAnimationRef = React.useRef<number | null>(null);


    // Delayed image position tracking
    React.useEffect(() => {
      if (!showImages || !imageVisible) return;

      const targetX = finalPosition.x + imageOffsetX;
      const targetY = finalPosition.y + imageOffsetY;

      if (imageFollowDelay === 0) {
        // No delay - instant tracking
        setImagePosition({ x: targetX, y: targetY });
        return;
      }

      // Smooth interpolation with delay
      const animate = () => {
        setImagePosition(prev => {
          const interpolationSpeed = 0.15; // Adjust for smoothness (0.1-0.3 recommended)

          const newX = prev.x + (targetX - prev.x) * interpolationSpeed;
          const newY = prev.y + (targetY - prev.y) * interpolationSpeed;

          return { x: newX, y: newY };
        });

        imageAnimationRef.current = requestAnimationFrame(animate);
      };

      imageAnimationRef.current = requestAnimationFrame(animate);

      return () => {
        if (imageAnimationRef.current !== null) {
          cancelAnimationFrame(imageAnimationRef.current);
          imageAnimationRef.current = null;
        }
      };
    }, [showImages, imageVisible, finalPosition.x, finalPosition.y, imageFollowDelay, imageOffsetX, imageOffsetY]);

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
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }, [showImages]);

   
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
      
    
      const interval = setInterval(scanAndPreloadImages, 2000);
      return () => clearInterval(interval);
    }, [showImages, preloadedImages]);


    React.useEffect(() => {
      if (!showImages || imageSize === 0) return;

      const handleMouseEnter = (e: Event) => {
        const target = e.target as HTMLElement;
        const imageUrl = target.getAttribute('data-cursor-image');
        if (imageUrl) {

          if (exitTimeoutRef.current) {
            clearTimeout(exitTimeoutRef.current);
            exitTimeoutRef.current = null;
          }
          if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
            debounceTimeoutRef.current = null;
          }


          if (!preloadedImages.has(imageUrl)) {
            const img = new Image();
            img.onload = () => {
              setPreloadedImages(prev => new Set(prev).add(imageUrl));

              setHoveredImage(imageUrl);
              setImageVisible(true);

              // Set z-index for text to appear above image if enabled
              if (enableTextHoverEffect) {
                target.style.position = 'relative';
                target.style.zIndex = '10000';
              }
            };
            img.src = imageUrl;
          } else {

            debounceTimeoutRef.current = setTimeout(() => {
              setHoveredImage(imageUrl);
              setImageVisible(true);

              // Set z-index for text to appear above image if enabled
              if (enableTextHoverEffect) {
                target.style.position = 'relative';
                target.style.zIndex = '10000';
              }
              debounceTimeoutRef.current = null;
            }, 50);
          }
        }
      };

      const handleMouseLeave = (e: Event) => {
        const target = e.target as HTMLElement;

        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
          debounceTimeoutRef.current = null;
        }

        debounceTimeoutRef.current = setTimeout(() => {
          setImageVisible(false);

          // Reset z-index when leaving
          if (enableTextHoverEffect) {
            target.style.position = '';
            target.style.zIndex = '';
          }

          if (exitTimeoutRef.current) {
            clearTimeout(exitTimeoutRef.current);
          }

          exitTimeoutRef.current = setTimeout(() => {
            setHoveredImage(null);
            exitTimeoutRef.current = null;
          }, imageFadeDuration);

          debounceTimeoutRef.current = null;
        }, 50);
      };

      const elements = document.querySelectorAll('[data-cursor-image]');
      elements.forEach(el => {
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


        if (exitTimeoutRef.current) {
          clearTimeout(exitTimeoutRef.current);
          exitTimeoutRef.current = null;
        }
      };
    }, [showImages, preloadedImages, imageSize, imageFadeDuration]);

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
            opacity: finalOpacity,
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
              left: `${imagePosition.x}px`,
              top: `${imagePosition.y}px`,
              width: `${imageSize}px`,
              height: 'auto',
              maxHeight: `${imageSize}px`,
              objectFit: 'cover',
              borderRadius: '8px',
              pointerEvents: 'none',
              zIndex: enableTextHoverEffect ? 1000 : 10000,
              opacity: finalOpacity,
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