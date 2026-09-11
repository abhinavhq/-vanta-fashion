import React, { useState, useRef } from 'react';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  maxDegree?: number;
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({
  children,
  className = '',
  maxDegree = 12
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const px = (mouseX / width) * 100;
    const py = (mouseY / height) * 100;

    const rY = ((mouseX - width / 2) / (width / 2)) * maxDegree;
    const rX = -((mouseY - height / 2) / (height / 2)) * maxDegree;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePosition({ x: px, y: py, opacity: 0.25 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out preserve-3d ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0px)`
      }}
    >
      {/* Dynamic Specular 3D Light Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-inherit"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glarePosition.opacity}) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
};
