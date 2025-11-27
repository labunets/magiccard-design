import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Typography } from '@mui/material';
import theme from './styles/theme';
import './styles/global.css';
import './styles/animations.css';
import { useStarAnimation } from './hooks/useStarAnimation';

// Layout components
import Header from './components/layout/Header';
import FloatingNav from './components/layout/FloatingNav';
import Footer from './components/layout/Footer';

// Form Components
import BuyForm from './components/forms/BuyForm/BuyForm';

function App() {
  const { StarsContainer } = useStarAnimation();
  const [activeTab, setActiveTab] = useState('buy');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <Box sx={{ flex: 1, pt: '120px' }}> {/* Offset for fixed header */}
          {/* Floating Navigation */}
          <FloatingNav activeTab={activeTab} onTabChange={handleTabChange} />

          {/* Content Area */}
          <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
              {/* Welcome Section */}
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography
                  variant="h2"
                  sx={{
                    color: 'primary.dark',
                    mb: 2,
                    fontSize: { xs: '2rem', md: '3rem' },
                  }}
                >
                  {activeTab === 'buy' ? '💳 Купити сертифікат' : '✨ Активувати сертифікат'}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    maxWidth: 600,
                    mx: 'auto',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                  }}
                >
                  {activeTab === 'buy'
                    ? 'Подаруйте магію вибору! Оберіть номінал і отримайте сертифікат на email.'
                    : 'Введіть дані сертифікату та оберіть бренд для активації подарунка.'}
                </Typography>
              </Box>

              {/* Form Content */}
              {activeTab === 'buy' ? (
                <BuyForm />
              ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h4" color="text.secondary">
                    Форма активації сертифікату (в розробці)
                  </Typography>
                </Box>
              )}
            </Box>
          </Container>
        </Box>

        {/* Footer */}
        <Footer />

        {/* Stars Container - Required for star animations */}
        <StarsContainer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
