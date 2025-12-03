import { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useStarAnimation } from '../../hooks/useStarAnimation';

/**
 * FloatingNav - Bottom navigation tabs (Buy / Activate)
 * Position: fixed at bottom of screen (thumb-friendly)
 * Remembers last selection in localStorage
 */
const FloatingNav = ({ activeTab, onTabChange }) => {
  const { triggerStars } = useStarAnimation();
  const [localActiveTab, setLocalActiveTab] = useState(activeTab || 'buy');

  // Sync local state with prop changes
  useEffect(() => {
    setLocalActiveTab(activeTab);
  }, [activeTab]);

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

  // Показываем только противоположный таб
  const visibleTabs = tabs.filter(tab => tab.id !== localActiveTab);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1100,
      }}
    >
      {visibleTabs.map((tab) => {
        return (
          <Box
            key={tab.id}
            onClick={(e) => handleTabChange(tab.id, e)}
            sx={{
              cursor: 'pointer',
            }}
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Paper
                elevation={4}
                sx={{
                  width: 160,
                  height: { xs: 56, sm: 64 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  px: 3,
                  gap: 1.5,
                  bgcolor: '#DC2626',
                  borderRadius: 2,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    bgcolor: '#B91C1C',
                  },
                  '&:active': {
                    bgcolor: '#991B1B',
                  },
                }}
              >
                {/* Icon */}
                <Box sx={{ fontSize: 20, lineHeight: 1 }}>
                  {tab.icon}
                </Box>

                {/* Title */}
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'white',
                  }}
                >
                  {tab.title}
                </Typography>
              </Paper>
            </motion.div>

          </Box>
        );
      })}
    </Box>
  );
};

export default FloatingNav;
