import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Cursor3D: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Primary Glowing Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none rounded-full border border-[#00f0ff] hidden md:block"
        animate={{
          x: mousePosition.x - (isHovered ? 24 : 14),
          y: mousePosition.y - (isHovered ? 24 : 14),
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.15)' : 'rgba(0, 0, 0, 0)',
          borderColor: isHovered ? '#ffffff' : '#00f0ff',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.2 }}
      />

      {/* Center 3D Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none rounded-full bg-white hidden md:block"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          width: 6,
          height: 6,
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
      />
    </>
  );
};
