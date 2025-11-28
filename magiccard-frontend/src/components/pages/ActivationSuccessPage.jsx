import { Box, Container, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import AnimatedButton from '../common/Button/AnimatedButton';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

/**
 * ActivationSuccessPage - Success confirmation page after certificate activation
 * Shows success message with animation and navigation options
 */
const ActivationSuccessPage = ({ onNavigateHome, activationData }) => {
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
          <CardGiftcardIcon
            sx={{
              fontSize: 120,
              color: '#8B5CF6',
              mb: 3,
              filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))',
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
              borderColor: 'primary.main',
              bgcolor: 'rgba(139, 92, 246, 0.05)',
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
              ✨ Сертифікат успішно активовано!
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              Ваш подарунок готовий до використання
            </Typography>

            {activationData && (
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
                  Деталі активації:
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {activationData.certificateNumber && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography color="text.secondary">Номер сертифікату:</Typography>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontFamily: 'monospace',
                          fontSize: '0.95rem',
                        }}
                      >
                        {activationData.certificateNumber}
                      </Typography>
                    </Box>
                  )}

                  {activationData.phone && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="text.secondary">Телефон:</Typography>
                      <Typography sx={{ fontWeight: 500 }}>
                        {activationData.phone}
                      </Typography>
                    </Box>
                  )}

                  {activationData.email && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="text.secondary">Email:</Typography>
                      <Typography sx={{ fontWeight: 500 }}>
                        {activationData.email}
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
                Активувати ще сертифікат
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
              🎁 <strong>Що далі?</strong> Інструкції щодо використання вашого подарунка
              надіслано на вказаний email або телефон. Якщо у вас виникнуть питання,
              зв'яжіться з нашою службою підтримки.
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
};

export default ActivationSuccessPage;
