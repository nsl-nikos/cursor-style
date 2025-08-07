import React, { useEffect, useState } from "react";
import { useClickEffect, ClickEffectType } from "./useClickEffect";
import { createPortal } from "react-dom";

type EffectInstance = {
  id: number;
  x: number;
  y: number;
  type: ClickEffectType;
  color: string;
  size: number;
  duration: number;
};

let idCounter = 0;

let cssInjected = false;
function injectClickEffectCSS() {
  if (cssInjected) return;
  const style = document.createElement("style");
  style.textContent = `
    @keyframes cursor-pulse {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }
    .click-effect-pulse {
      animation-name: cursor-pulse;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;
      transform-origin: center center; /* <-- add this */
    }
  `;
  document.head.appendChild(style);
  cssInjected = true;
}

const ClickEffectLayerInner: React.FC = () => {
  const { subscribe } = useClickEffect();
  const [effects, setEffects] = useState<EffectInstance[]>([]);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    injectClickEffectCSS();

    let node = document.getElementById("cursor-click-effects");
    if (!node) {
      node = document.createElement("div");
      node.id = "cursor-click-effects";
      document.body.appendChild(node);
    }
    setContainer(node);

    const unsubscribe = subscribe(({ x, y, type, color, size, duration }) => {
      const id = idCounter++;
      setEffects((prev) => [...prev, { id, x, y, type, color, size, duration }]);
      setTimeout(() => {
        setEffects((prev) => prev.filter((e) => e.id !== id));
      }, duration);
    });

    return () => unsubscribe();
  }, [subscribe]);

  if (!container) return null;

  return createPortal(
    <>
      {effects.map(({ id, x, y, type, color, size, duration }) => {
        const effectSize = 2 * size;
        const commonStyle: React.CSSProperties = {
          position: "fixed",
          left: `${x}px`,
          top: `${y}px`,
          width: `${effectSize}px`,
          height: `${effectSize}px`,
          transform: "translate(-50%, -50%)",
          opacity: 0.5,
          borderRadius: "50%",
          backgroundColor: color,
          pointerEvents: "none",
          zIndex: 2147483647,
          animationDuration: `${duration}ms`,
          animationName: `cursor-pulse`,
          animationTimingFunction: "ease-out",
          animationFillMode: "forwards",
        };

        return (
          <div
            key={id}
            className={`click-effect-${type}`}
            style={commonStyle}
          />
        );
      })}
    </>,
    container
  );
};

// let isMounted = false;

// export const ClickEffectLayer: React.FC = () => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     if (isMounted) {
//       setMounted(true);
//       return;
//     }
//     isMounted = true;
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;
//   return <ClickEffectLayerInner />;
// };

if (typeof window !== "undefined") {
  if (!document.getElementById("cursor-click-effects-root")) {
    const div = document.createElement("div");
    div.id = "cursor-click-effects-root";
    document.body.appendChild(div);

    import("react-dom/client").then(({ createRoot }) => {
      const root = createRoot(div);
      root.render(<ClickEffectLayerInner />);
    });
  }
}
