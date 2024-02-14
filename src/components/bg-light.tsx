"use client";

import { useEffect, useRef, useState } from "react";

export function BgLight() {
  const [opacity, setOpacity] = useState(0);
  const lastMouseTime = useRef(Date.now());
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const timeDiff = currentTime - lastMouseTime.current;
      const xDiff = e.screenX - lastMouseX.current;
      const yDiff = e.screenY - lastMouseY.current;
      const speed = Math.sqrt(xDiff * xDiff + yDiff * yDiff) / timeDiff;

      setOpacity(Math.min(speed / 10, 1)); // Ajuste conforme necessário

      lastMouseTime.current = currentTime;
      lastMouseX.current = e.screenX;
      lastMouseY.current = e.screenY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    setTimeout(() => {
      setOpacity(1);
      const interval = setInterval(() => {
        setOpacity((prevOpacity) => {
          const nextOpacity = prevOpacity - 0.01;
          if (nextOpacity <= 0) {
            clearInterval(interval);
            return 0;
          }
          return nextOpacity;
        });
      }, 250);
    }, 500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 -z-10 min-h-screen w-full transform-gpu overflow-hidden blur-[128px]`}
    >
      <div
        className="absolute -left-[5%] aspect-square h-[42rem] bg-gradient-to-b from-rose-950 to-rose-400 transition-opacity duration-300"
        style={{
          opacity: `${opacity * 0.8}`,
          clipPath:
            "polygon(91% 0, 100% 12%, 70% 18%, 26% 46%, 18% 89%, 0 72%, 18% 18%)",
        }}
      ></div>
      <div
        className="absolute -bottom-[5%] left-[80%] aspect-square h-[42rem] bg-gradient-to-b from-rose-950 to-rose-900 transition-opacity duration-300"
        style={{
          opacity: `${opacity * 0.4}`,
          clipPath:
            "polygon(0 14%, 33% 0, 21% 26%, 43% 68%, 26% 100%, 5% 73%, 15% 59%)",
        }}
      ></div>
    </div>
  );
}
