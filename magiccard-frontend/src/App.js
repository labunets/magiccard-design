import { useState, useRef, useEffect } from 'react';
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
import ActivateForm from './components/forms/ActivateForm/ActivateForm';

// Pages
import StyleGuidePage from './components/pages/StyleGuidePage';
import SuccessPage from './components/pages/SuccessPage';
import ActivationSuccessPage from './components/pages/ActivationSuccessPage';
import HowItWorksPage from './components/pages/HowItWorksPage';

// Transitions
import PageTransition from './components/common/PageTransition/PageTransition';

// Прокрутка к верху ДО первого рендера (на уровне модуля)
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
}

function App() {
  const { StarsContainer } = useStarAnimation();
  const [activeTab, setActiveTab] = useState('buy');
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState('home');
  const [purchaseData, setPurchaseData] = useState(null);
  const [activationData, setActivationData] = useState(null);
  const footerRef = useRef(null);

  // Дополнительная прокрутка при монтировании (на случай если браузер все равно попытается восстановить позицию)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTabChange = (tab) => {
    // Сразу меняем вкладку, прокрутка произойдет после
    setActiveTab(tab);
    // Прокручиваем после смены вкладки
    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 0);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    // Handle navigation based on page
    const scrollAndNavigate = (tabName) => {
      setActiveTab(tabName);
      setTimeout(() => {
        window.scrollTo({ top: 0 });
      }, 0);
    };

    if (page === 'buy') {
      setPurchaseData(null); // Clear purchase data when going to buy page
      setActivationData(null);
      scrollAndNavigate('buy');
    } else if (page === 'activate') {
      setPurchaseData(null);
      setActivationData(null);
      scrollAndNavigate('activate');
    } else if (page === 'home') {
      setPurchaseData(null);
      setActivationData(null);
      scrollAndNavigate('buy'); // Default to buy tab
    } else if (page === 'styleguide') {
      scrollAndNavigate('styleguide');
    } else if (page === 'success') {
      scrollAndNavigate('success');
    } else if (page === 'activation-success') {
      scrollAndNavigate('activation-success');
    } else if (page === 'contacts') {
      // Scroll to footer
      footerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (page === 'how') {
      // Navigate to "How It Works" page
      setPurchaseData(null);
      setActivationData(null);
      scrollAndNavigate('how');
    }
    // TODO: Handle other pages (offer)
  };

  const handlePurchaseSuccess = (data) => {
    setPurchaseData(data);
    handleNavigate('success');
  };

  const handleActivationSuccess = (data) => {
    setActivationData(data);
    handleNavigate('activation-success');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Header onNavigate={handleNavigate} />

        {/* Main Content */}
        <Box sx={{ flex: 1, pb: '90px' }}> {/* Offset for bottom nav */}
          <PageTransition pageKey={activeTab}>
            {/* Success Page */}
            {activeTab === 'success' ? (
              <SuccessPage
                onNavigateHome={() => handleNavigate('home')}
                purchaseData={purchaseData}
              />
            ) : /* Activation Success Page */
            activeTab === 'activation-success' ? (
              <ActivationSuccessPage
                onNavigateHome={() => handleNavigate('home')}
                onNavigateActivate={() => handleNavigate('activate')}
                activationData={activationData}
              />
            ) : /* How It Works Page */
            activeTab === 'how' ? (
              <HowItWorksPage />
            ) : /* Style Guide Page */
            activeTab === 'styleguide' ? (
              <StyleGuidePage />
            ) : (
              /* Content Area */
              <Container maxWidth="lg">
                <Box sx={{ py: 4 }}>
                  {/* Banner Image */}
                  {activeTab === 'buy' && (
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                      <img
                        src="/banner.jpg"
                        alt="MagicCard Banner"
                        style={{
                          width: '100%',
                          maxWidth: '800px',
                          height: 'auto',
                          borderRadius: '16px',
                          boxShadow: '0 4px 20px rgba(220, 38, 38, 0.15)',
                        }}
                      />
                    </Box>
                  )}

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
                    <BuyForm onSuccess={handlePurchaseSuccess} />
                  ) : (
                    <ActivateForm onSuccess={handleActivationSuccess} />
                  )}
                </Box>
              </Container>
            )}
          </PageTransition>
        </Box>

        {/* Footer */}
        <Box ref={footerRef}>
          <Footer onNavigate={handleNavigate} />
        </Box>

        {/* Bottom Navigation - Fixed at bottom */}
        <FloatingNav activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Stars Container - Required for star animations */}
        <StarsContainer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
