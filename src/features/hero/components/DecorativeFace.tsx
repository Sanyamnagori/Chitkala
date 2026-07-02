"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type DecorativeFaceProps = {
  png: string;
  gif: string;
  left: string;
  top: string;
  width: string;
  leftEye: { x: string; y: string };
  rightEye: { x: string; y: string };
  gifTransform?: string;
};

export function DecorativeFace({
  png,
  gif,
  left,
  top,
  width,
  leftEye,
  rightEye,
  gifTransform,
}: DecorativeFaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const updateEyes = useCallback(
    (clientX: number, clientY: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Calculate an average center point between the two eyes for the tracking logic
      const avgX = (parseFloat(leftEye.x) + parseFloat(rightEye.x)) / 2;
      const avgY = (parseFloat(leftEye.y) + parseFloat(rightEye.y)) / 2;
      
      const centerX = rect.left + rect.width * (avgX / 100);
      const centerY = rect.top + rect.height * (avgY / 100);
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      const maxOffset = 10;
      const scale = Math.min(maxOffset / distance, 1);

      setPupilOffset({ x: dx * scale, y: dy * scale });
    },
    [leftEye, rightEye],
  );

  useEffect(() => {
    const onMove = (event: MouseEvent) => updateEyes(event.clientX, event.clientY);
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [updateEyes]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-auto absolute z-20"
      style={{ left, top, width }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[331/314] w-full">
        <Image
          src={gif}
          alt=""
          fill
          unoptimized
          className={`object-contain transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: gifTransform }}
          sizes="20vw"
        />
        <Image
          src={png}
          alt=""
          fill
          className={`object-contain transition-opacity duration-300 ${
            hovered ? "opacity-0" : "opacity-100"
          }`}
          sizes="20vw"
        />
        {!hovered && (
          <>
            <EyePupil
              baseLeft={leftEye.x}
              baseTop={leftEye.y}
              offset={pupilOffset}
            />
            <EyePupil
              baseLeft={rightEye.x}
              baseTop={rightEye.y}
              offset={pupilOffset}
            />
          </>
        )}
      </div>
      {/* Invisible overlay for easy coordinate debugging in development */}
      {process.env.NODE_ENV === 'development' && (
        <div 
          className="absolute inset-0 z-50 cursor-crosshair"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
            const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
            console.log(`Clicked ${png}: { x: "${x}%", y: "${y}%" }`);
          }}
        />
      )}
    </div>
  );
}

function EyePupil({
  baseLeft,
  baseTop,
  offset,
}: {
  baseLeft: string;
  baseTop: string;
  offset: { x: number; y: number };
}) {
  return (
    <span
      className="absolute h-3 w-3 rounded-full bg-text-dark transition-transform duration-75 will-change-transform"
      style={{
        left: baseLeft,
        top: baseTop,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
    />
  );
}
