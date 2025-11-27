import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

/**
 * Custom hook for creating magical star particle animations
 * Stars burst from a point and radially disperse with rotation
 *
 * Usage:
 * const { triggerStars, StarsContainer } = useStarAnimation();
 *
 * // Trigger stars on click
 * <button onClick={(e) => {
 *   const rect = e.currentTarget.getBoundingClientRect();
 *   triggerStars(rect.left + rect.width/2, rect.top + rect.height/2, 7);
 * }}>
 *
 * // Render container
 * <StarsContainer />
 */
export const useStarAnimation = () => {
  const [stars, setStars] = useState([]);

  /**
   * Trigger star particles animation
   * @param {number} x - X coordinate of origin point
   * @param {number} y - Y coordinate of origin point
   * @param {number} count - Number of stars to create (default: 5)
   */
  const triggerStars = useCallback((x, y, count = 5) => {
    const newStars = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i + Math.random(), // Unique ID for each star
      x,
      y,
      angle: (Math.PI * 2 * i) / count + Math.random() * 0.5, // Evenly distributed + randomness
      distance: 50 + Math.random() * 100, // Travel distance
      size: 12 + Math.random() * 12, // Size variation
      duration: 0.6 + Math.random() * 0.2, // Animation duration
    }));

    setStars(prev => [...prev, ...newStars]);

    // Remove stars after animation completes
    setTimeout(() => {
      setStars(prev => prev.filter(star => !newStars.find(s => s.id === star.id)));
    }, 1000);
  }, []);

  /**
   * Container component for rendering star particles
   * Must be included in the component tree
   */
  const StarsContainer = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none', // Don't block interactions
      zIndex: 9999, // Render above everything
    }}>
      <AnimatePresence>
        {stars.map(star => {
          // Calculate end position based on angle and distance
          const endX = star.x + Math.cos(star.angle) * star.distance;
          const endY = star.y + Math.sin(star.angle) * star.distance;

          return (
            <motion.div
              key={star.id}
              initial={{
                x: star.x,
                y: star.y,
                scale: 0,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                x: endX,
                y: endY,
                scale: [0, 1.2, 1],
                rotate: 360, // Full rotation while traveling
                opacity: [1, 1, 0], // Fade out at the end
              }}
              exit={{
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: star.duration,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                fontSize: star.size,
                transformOrigin: 'center',
                userSelect: 'none',
              }}
            >
              ⭐
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );

  return { triggerStars, StarsContainer };
};

export default useStarAnimation;
