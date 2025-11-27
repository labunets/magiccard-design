import React, { useState } from 'react';
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

// UI Components
import AnimatedButton from './components/common/Button/AnimatedButton';
import PhoneInput from './components/common/Input/PhoneInput';
import EmailInput from './components/common/Input/EmailInput';

function App() {
  const { StarsContainer } = useStarAnimation();
  const [activeTab, setActiveTab] = useState('buy');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

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
          <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
              {/* Welcome Section */}
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography
                  variant="h2"
                  sx={{
                    color: 'primary.dark',
                    mb: 2,
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
                  }}
                >
                  {activeTab === 'buy'
                    ? 'Подаруйте магію вибору! Оберіть номінал і отримайте сертифікат на email.'
                    : 'Введіть дані сертифікату та оберіть бренд для активації подарунка.'}
                </Typography>
              </Box>

              {/* Demo Components */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ mb: 3, color: 'primary.dark' }}>
                  Демо UI компонентів:
                </Typography>

                {/* Phone Input Demo */}
                <Box sx={{ mb: 3 }}>
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    onBlur={() => {}}
                    touched={phone.length > 0}
                    required
                  />
                </Box>

                {/* Email Input Demo */}
                <Box sx={{ mb: 3 }}>
                  <EmailInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => {}}
                    touched={email.length > 0}
                    helperText="Сертифікат буде надіслано на цей email"
                  />
                </Box>

                {/* Animated Buttons Demo */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <AnimatedButton
                    variant="contained"
                    color="primary"
                    withStars
                  >
                    💳 Оплатити Monobank
                  </AnimatedButton>

                  <AnimatedButton
                    variant="outlined"
                    color="primary"
                    withStars
                  >
                    ✨ Перевірити
                  </AnimatedButton>

                  <AnimatedButton
                    variant="text"
                    color="secondary"
                    withStars={false}
                  >
                    Додати ще
                  </AnimatedButton>
                </Box>
              </Box>

              {/* Status Info */}
              <Box
                sx={{
                  mt: 6,
                  p: 4,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: 1,
                  borderColor: 'grey.200',
                }}
              >
                <Typography variant="h3" sx={{ mb: 3, color: 'success.main' }}>
                  ✅ Готові компоненти:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2">✅ Header з логотипом та анімацією</Typography>
                  <Typography variant="body2">✅ FloatingNav - липкі таби (зберігається в localStorage)</Typography>
                  <Typography variant="body2">✅ Footer з контактами</Typography>
                  <Typography variant="body2">✅ PhoneInput - автоформатування +380XXXXXXXXX</Typography>
                  <Typography variant="body2">✅ EmailInput - валідація email</Typography>
                  <Typography variant="body2">✅ AnimatedButton - з hover/tap анімацією та зірочками</Typography>
                  <Typography variant="body2">✅ useStarAnimation hook - магічні зірочки</Typography>
                </Box>

                <Typography variant="h3" sx={{ mt: 4, mb: 2, color: 'info.main' }}>
                  🔄 Наступні кроки:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2">1. AmountSelector - вибір номіналу сертифікату</Typography>
                  <Typography variant="body2">2. BuyForm - форма купівлі з валідацією</Typography>
                  <Typography variant="body2">3. ActivateForm Step 1 - перевірка сертифікатів</Typography>
                  <Typography variant="body2">4. ActivateForm Step 2 - вибір партнера та карток</Typography>
                  <Typography variant="body2">5. Інфографіка "Як це працює"</Typography>
                </Box>
              </Box>
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
