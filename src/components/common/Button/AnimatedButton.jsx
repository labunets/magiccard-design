import React, { useState } from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useStarAnimation } from '../../../hooks/useStarAnimation';

/**
 * AnimatedButton - Button component with hover/tap animations and optional star effects
 *
 * @param {ReactNode} children - Button content
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Whether button is disabled
 * @param {boolean} withStars - Whether to show stars on click
 * @param {string} variant - MUI button variant (contained, outlined, text)
 * @param {string} color - MUI button color
 * @param {string} size - Button size (small, medium, large)
 * @param {boolean} fullWidth - Whether button takes full width
 */
const AnimatedButton = ({
  children,
  onClick,
  disabled = false,
  withStars = true,
  variant = 'contained',
  color = 'primary',
  size = 'large',
  fullWidth = false,
  ...props
}) => {
  const [ripples, setRipples] = useState([]);
  const { triggerStars } = useStarAnimation();

  const handleClick = (e) => {
    if (disabled) return;

    if (withStars) {
      // Додаємо ефект зірочок
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      triggerStars(x, y, 5);
    }

    // Викликаємо користувацький onClick
    onClick && onClick(e);
  };

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      <Button
        {...props}
        variant={variant}
        color={color}
        size={size}
        fullWidth={fullWidth}
        disabled={disabled}
        onClick={handleClick}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
          '&:hover': {
            boxShadow: variant === 'contained'
              ? '0 8px 24px rgba(139, 92, 246, 0.3)'
              : 'none',
          },
          ...props.sx,
        }}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
