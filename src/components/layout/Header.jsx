import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { motion } from 'framer-motion';
import { useStarAnimation } from '../../hooks/useStarAnimation';

/**
 * Header - Fixed header component with logo and navigation
 * Height: 120px
 * White background with shadow
 */
const Header = () => {
  const { triggerStars } = useStarAnimation();

  const handleLogoClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    triggerStars(x, y, 10);
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 120,
        bgcolor: 'background.default',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 1100,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            height: 120,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Logo and Title */}
          <motion.div
            onClick={handleLogoClick}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Star Icon */}
            <motion.div
              animate={{
                rotate: 360,
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                },
                opacity: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              style={{
                fontSize: 40,
                color: '#F59E0B',
              }}
            >
              ✨
            </motion.div>

            {/* Brand Name */}
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'Nunito',
                fontSize: { xs: '24px', md: '28px' },
                fontWeight: 700,
                color: 'primary.main',
                lineHeight: 1,
              }}
            >
              MagicCard
            </Typography>

            {/* Slogan */}
            <Typography
              variant="body2"
              sx={{
                fontSize: 14,
                color: 'text.secondary',
                lineHeight: 1,
              }}
            >
              Магія подарунків
            </Typography>
          </motion.div>

          {/* Navigation Buttons */}
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              gap: 1,
            }}
          >
            {/* How It Works Button */}
            <IconButton
              aria-label="Як це працює"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: 'primary.light',
                },
              }}
            >
              <HelpOutlineIcon />
            </IconButton>

            {/* Admin Button (hidden by default, show based on auth) */}
            <IconButton
              aria-label="Адмін"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: 'primary.light',
                },
              }}
            >
              <AdminPanelSettingsIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
