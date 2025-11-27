import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Typography } from '@mui/material';
import theme from './styles/theme';
import './styles/global.css';
import './styles/animations.css';
import { useStarAnimation } from './hooks/useStarAnimation';

function App() {
  const { triggerStars, StarsContainer } = useStarAnimation();

  // Demo: trigger stars on logo click
  const handleLogoClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    triggerStars(x, y, 10);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              py: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            {/* Logo */}
            <Box
              onClick={handleLogoClick}
              sx={{
                fontSize: '64px',
                cursor: 'pointer',
                animation: 'float 3s ease-in-out infinite',
                '&:hover': {
                  animation: 'pulse 0.5s ease-in-out',
                },
              }}
            >
              ✨
            </Box>

            {/* Title */}
            <Typography
              variant="h1"
              sx={{
                color: 'primary.dark',
                textAlign: 'center',
                fontFamily: 'Nunito',
              }}
            >
              MagicCard
            </Typography>

            {/* Slogan */}
            <Typography
              variant="h3"
              sx={{
                color: 'text.secondary',
                textAlign: 'center',
              }}
            >
              Магія подарунків
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                textAlign: 'center',
                maxWidth: 600,
                mt: 2,
              }}
            >
              Вітаємо! Це базова структура проекту MagicCard. Проект налаштовано з Material-UI темою,
              анімаціями та готовою структурою папок.
            </Typography>

            {/* Demo Box */}
            <Box
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                triggerStars(
                  rect.left + rect.width / 2,
                  rect.top + rect.height / 2,
                  7
                );
              }}
              sx={{
                mt: 4,
                p: 4,
                bgcolor: 'primary.light',
                borderRadius: 3,
                border: 2,
                borderColor: 'primary.main',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)',
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.dark',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                👆 Натисніть для магічних зірочок! ⭐
              </Typography>
            </Box>

            {/* Status */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'success.main', mb: 1 }}>
                ✅ React встановлено
              </Typography>
              <Typography variant="body2" sx={{ color: 'success.main', mb: 1 }}>
                ✅ Material-UI налаштовано
              </Typography>
              <Typography variant="body2" sx={{ color: 'success.main', mb: 1 }}>
                ✅ Framer Motion підключено
              </Typography>
              <Typography variant="body2" sx={{ color: 'success.main', mb: 1 }}>
                ✅ Анімації зірочок працюють
              </Typography>
              <Typography variant="body2" sx={{ color: 'success.main', mb: 1 }}>
                ✅ Структура папок створена
              </Typography>
            </Box>

            {/* Next Steps */}
            <Box
              sx={{
                mt: 4,
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
                maxWidth: 600,
              }}
            >
              <Typography variant="h3" sx={{ mb: 2, color: 'primary.dark' }}>
                Наступні кроки:
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                1. Створити компоненти Header та Footer
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                2. Розробити FloatingNav (навігаційні таби)
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                3. Імплементувати форму "Купити сертифікат"
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                4. Імплементувати форму "Активувати сертифікат"
              </Typography>
              <Typography variant="body2">
                5. Додати інфографіку "Як це працює"
              </Typography>
            </Box>
          </Box>
        </Container>

        {/* Stars Container - Required for star animations */}
        <StarsContainer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
