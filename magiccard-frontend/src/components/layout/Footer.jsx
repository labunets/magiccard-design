import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

/**
 * Footer - Site footer with contact info and links
 * Dark purple background with white text
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.dark',
        color: 'white',
        py: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            textAlign: 'center',
          }}
        >
          {/* Brand */}
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Nunito',
              fontWeight: 700,
              color: 'white',
            }}
          >
            MagicCard
          </Typography>

          {/* Contact Info */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              my: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              <EmailIcon fontSize="small" />
              <Typography variant="body2">
                info@magiccard.com.ua
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">
                +380 XX XXX XX XX
              </Typography>
            </Box>
          </Box>

          {/* Links */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Link
              href="#"
              underline="hover"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: 14,
                '&:hover': {
                  color: 'white',
                },
              }}
            >
              Політика конфіденційності
            </Link>
            <Link
              href="#"
              underline="hover"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: 14,
                '&:hover': {
                  color: 'white',
                },
              }}
            >
              Умови використання
            </Link>
          </Box>

          {/* Copyright */}
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            MagicCard © {currentYear}. Всі права захищені ✨
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
