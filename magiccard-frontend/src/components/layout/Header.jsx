import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import ContactsIcon from '@mui/icons-material/Contacts';
import PaletteIcon from '@mui/icons-material/Palette';
import { motion } from 'framer-motion';
import { useStarAnimation } from '../../hooks/useStarAnimation';

/**
 * Header - Fixed header component with logo and full navigation menu
 * Desktop: horizontal menu
 * Mobile: hamburger menu with drawer
 */
const Header = ({ onNavigate }) => {
  const { triggerStars } = useStarAnimation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Menu items
  const menuItems = [
    { id: 'home', label: 'На головну', icon: <HomeIcon /> },
    { id: 'buy', label: 'Купити', icon: <ShoppingCartIcon /> },
    { id: 'activate', label: 'Активувати', icon: <StarIcon /> },
    { id: 'styleguide', label: 'Style Guide', icon: <PaletteIcon /> },
    { id: 'how', label: 'Як це працює', icon: <HelpOutlineIcon /> },
    { id: 'offer', label: 'Договір оферти', icon: <DescriptionIcon /> },
    { id: 'contacts', label: 'Контакти', icon: <ContactsIcon /> },
  ];

  const handleLogoClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    triggerStars(x, y, 10);
    onNavigate && onNavigate('home');
  };

  const handleMenuClick = (itemId, event) => {
    setDrawerOpen(false);
    onNavigate && onNavigate(itemId);

    // Trigger stars
    if (event && !isMobile) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      triggerStars(x, y, 3);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          height: { xs: 70, md: 80 },
          bgcolor: 'background.paper',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              height: { xs: 70, md: 80 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo */}
            <motion.div
              onClick={handleLogoClick}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Star Icon */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  fontSize: 32,
                  color: '#F59E0B',
                }}
              >
                ✨
              </motion.div>

              <Box>
                {/* Brand Name */}
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: 'Nunito',
                    fontSize: { xs: '20px', md: '24px' },
                    fontWeight: 700,
                    color: 'primary.main',
                    lineHeight: 1.2,
                  }}
                >
                  MagicCard
                </Typography>

                {/* Slogan */}
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: '11px', md: '12px' },
                    color: 'text.secondary',
                    lineHeight: 1,
                  }}
                >
                  Магія подарунків
                </Typography>
              </Box>
            </motion.div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    startIcon={item.icon}
                    onClick={(e) => handleMenuClick(item.id, e)}
                    sx={{
                      color: 'text.primary',
                      textTransform: 'none',
                      fontSize: '14px',
                      fontWeight: 500,
                      px: 2,
                      '&:hover': {
                        bgcolor: 'primary.light',
                        color: 'primary.dark',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Mobile Hamburger Menu */}
            {isMobile && (
              <IconButton
                onClick={toggleDrawer(true)}
                sx={{
                  color: 'primary.main',
                }}
              >
                <MenuIcon sx={{ fontSize: 32 }} />
              </IconButton>
            )}
          </Box>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: 'background.paper',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            Меню
          </Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => handleMenuClick(item.id)}
                sx={{
                  py: 2,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    color: 'text.primary',
                  }}
                >
                  {item.icon}
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '16px',
                      fontWeight: 500,
                    }}
                  />
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
