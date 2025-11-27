import { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useStarAnimation } from '../../hooks/useStarAnimation';

/**
 * FloatingNav - Sticky navigation tabs (Buy / Activate)
 * Position: sticky, 140px from top (below header)
 * Remembers last selection in localStorage
 */
const FloatingNav = ({ activeTab, onTabChange }) => {
  const { triggerStars } = useStarAnimation();
  const [localActiveTab, setLocalActiveTab] = useState(activeTab || 'buy');

  // Load saved tab from localStorage on mount
  useEffect(() => {
    const savedTab = localStorage.getItem('magiccard_active_tab');
    if (savedTab && (savedTab === 'buy' || savedTab === 'activate')) {
      setLocalActiveTab(savedTab);
      onTabChange && onTabChange(savedTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (tab, event) => {
    // Save to localStorage
    localStorage.setItem('magiccard_active_tab', tab);
    setLocalActiveTab(tab);
    onTabChange && onTabChange(tab);

    // Trigger stars animation
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    triggerStars(x, y, 7);
  };

  const tabs = [
    {
      id: 'buy',
      icon: '💳',
      title: 'Купити',
      subtitle: 'сертифікат',
    },
    {
      id: 'activate',
      icon: '✨',
      title: 'Активувати',
      subtitle: 'сертифікат',
    },
  ];

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 120, // Below header
        zIndex: 1000,
        bgcolor: 'background.default',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          maxWidth: 'lg',
          margin: '0 auto',
        }}
      >
        {tabs.map((tab) => {
          const isActive = localActiveTab === tab.id;

          return (
            <Box
              key={tab.id}
              onClick={(e) => handleTabChange(tab.id, e)}
              sx={{
                flex: 1,
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                animate={isActive ? { y: 0 } : {}}
              >
                <Paper
                  elevation={0}
                  sx={{
                    height: 80,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.5,
                    bgcolor: isActive ? 'primary.light' : 'background.default',
                    borderBottom: 3,
                    borderColor: isActive ? 'primary.main' : 'transparent',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      bgcolor: isActive ? 'primary.light' : 'grey.50',
                    },
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    animate={isActive ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0],
                    } : {}}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: 32 }}
                  >
                    {tab.icon}
                  </motion.div>

                  {/* Title */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: isActive ? 'primary.dark' : 'text.secondary',
                      transition: 'color 0.3s',
                    }}
                  >
                    {tab.title}
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: 12,
                      color: isActive ? 'primary.dark' : 'text.secondary',
                      transition: 'color 0.3s',
                    }}
                  >
                    {tab.subtitle}
                  </Typography>
                </Paper>
              </motion.div>

              {/* Active indicator line (animated) */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      backgroundColor: '#8B5CF6',
                      transformOrigin: 'center',
                    }}
                  />
                )}
              </AnimatePresence>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default FloatingNav;
