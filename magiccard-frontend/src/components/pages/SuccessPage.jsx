import { Box, Container, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import AnimatedButton from '../common/Button/AnimatedButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/**
 * SuccessPage - Success confirmation page after purchase
 * Shows success message with animation and navigation options
 */
const SuccessPage = ({ onNavigateHome, purchaseData }) => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 6,
        }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            duration: 0.6,
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: 120,
              color: '#10B981',
              mb: 3,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ width: '100%' }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              border: '2px solid',
              borderColor: '#10B981',
              bgcolor: 'rgba(16, 185, 129, 0.05)',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: 'primary.dark',
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
              }}
            >
              🎉 Замовлення успішно оформлено!
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              Ми зв'яжемося з вами найближчим часом для підтвердження
            </Typography>

            {purchaseData && (
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  p: 3,
                  mb: 4,
                  textAlign: 'left',
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: 'primary.dark',
                    mb: 2,
                  }}
                >
                  Деталі замовлення:
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {purchaseData.amount && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="text.secondary">Сума:</Typography>
                      <Typography
                        sx={{ fontWeight: 600, fontSize: '1.1rem', color: 'primary.main' }}
                      >
                        {purchaseData.amount} грн
                      </Typography>
                    </Box>
                  )}

                  {purchaseData.phone && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="text.secondary">Телефон:</Typography>
                      <Typography sx={{ fontWeight: 500 }}>
                        {purchaseData.phone}
                      </Typography>
                    </Box>
                  )}

                  {purchaseData.email && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="text.secondary">Email:</Typography>
                      <Typography sx={{ fontWeight: 500 }}>
                        {purchaseData.email}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            )}

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                justifyContent: 'center',
              }}
            >
              <AnimatedButton
                onClick={onNavigateHome}
                variant="contained"
                size="large"
                withStars
                sx={{ minWidth: 200 }}
              >
                Повернутися на головну
              </AnimatedButton>

              <AnimatedButton
                onClick={() => window.location.reload()}
                variant="outlined"
                size="large"
                sx={{ minWidth: 200 }}
              >
                Купити ще сертифікат
              </AnimatedButton>
            </Box>
          </Paper>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Box
            sx={{
              mt: 4,
              p: 3,
              bgcolor: 'primary.light',
              borderRadius: 2,
              maxWidth: 600,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'primary.dark',
                textAlign: 'center',
                fontSize: { xs: '0.9rem', md: '1rem' },
              }}
            >
              💡 <strong>Що далі?</strong> Наш менеджер зв'яжеться з вами протягом 15 хвилин
              для підтвердження замовлення. Після оплати сертифікат буде надіслано на вказаний
              email або телефон.
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
};

export default SuccessPage;
