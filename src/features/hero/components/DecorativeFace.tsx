"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type DecorativeFaceProps = {
  png: string;
  gif: string;
  left: string;
  top: string;
  width: string;
  rotation?: string;
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
  rotation,
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
      
      // Calculate max offset dynamically based on face size (approx 2.5% of face width)
      const maxOffset = rect.width * 0.025;
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
      <div 
        className="relative aspect-[331/314] w-full"
        style={{ transform: rotation ? `rotate(${rotation})` : undefined }}
      >
        <Image
          src={gif}
          alt=""
          fill
          unoptimized
          className={`object-contain transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: gifTransform, zIndex: 1 }}
          sizes="20vw"
        />
        <Image
          src={png}
          alt=""
          fill
          className={`object-contain transition-opacity duration-300 ${
            hovered ? "opacity-0" : "opacity-100"
          }`}
          style={{ zIndex: 2 }}
          sizes="20vw"
        />
        {!hovered && (
          <SvgEyes
            leftEye={leftEye}
            rightEye={rightEye}
            offset={pupilOffset}
          />
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

function SvgEyes({
  leftEye,
  rightEye,
  offset,
}: {
  leftEye: { x: string; y: string };
  rightEye: { x: string; y: string };
  offset: { x: number; y: number };
}) {
  const lx = parseFloat(leftEye.x);
  const ly = parseFloat(leftEye.y);
  const rx = parseFloat(rightEye.x);
  const ry = parseFloat(rightEye.y);

  const avgX = (lx + rx) / 2;
  const avgY = (ly + ry) / 2;

  // We explicitly set distance and removed tilt, making it perfectly horizontal
  const eyeDistance = Math.abs(rx - lx);
  
  // 0.613 is the distance between the two eyes in the SVG (160px/261px)
  const svgWidth = eyeDistance / 0.613;

  // Using two small erasers instead of one giant one. 
  // Slightly oversized to guarantee they cover any underlying marks perfectly.
  const eraserWidth = svgWidth * 0.45;
  const eraserHeight = svgWidth * 0.35;

  return (
    <>
      {/* Static Eraser Left */}
      <div
        className="absolute rounded-[50%]"
        style={{
          zIndex: 10,
          backgroundColor: "#E34234",
          left: `${lx}%`,
          top: `${ly}%`,
          width: `${eraserWidth}%`,
          height: `${eraserHeight}%`,
          transform: `translate(-50%, -50%)`,
        }}
      />
      
      {/* Static Eraser Right */}
      <div
        className="absolute rounded-[50%]"
        style={{
          zIndex: 10,
          backgroundColor: "#E34234",
          left: `${rx}%`,
          top: `${ry}%`,
          width: `${eraserWidth}%`,
          height: `${eraserHeight}%`,
          transform: `translate(-50%, -50%)`,
        }}
      />
      
      {/* Moving SVG Eyes */}
      <div
        className="absolute transition-transform duration-75 will-change-transform"
        style={{
          zIndex: 20,
          left: `${avgX}%`,
          top: `${avgY}%`,
          width: `${svgWidth}%`,
          transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        <Image 
          src="/images/eyes-follow.svg" 
          alt="" 
          width={261} 
          height={93} 
          className="h-auto w-full" 
        />
      </div>
    </>
  );
}
