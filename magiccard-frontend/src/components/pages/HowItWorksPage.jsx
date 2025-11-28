import { Box, Container, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * HowItWorksPage - Standalone page explaining how the service works
 * Shows step-by-step guide for buying and activating certificates
 */
const HowItWorksPage = () => {
  const steps = [
    {
      number: '1',
      title: 'Оберіть номінал',
      description: 'Виберіть суму сертифіката від 100 до 50000 грн',
      emoji: '💳',
    },
    {
      number: '2',
      title: 'Вкажіть контакти',
      description: 'Введіть телефон та email для отримання сертифіката',
      emoji: '📱',
    },
    {
      number: '3',
      title: 'Оплатіть',
      description: 'Безпечна оплата через Monobank',
      emoji: '💰',
    },
    {
      number: '4',
      title: 'Отримайте сертифікат',
      description: 'Сертифікат надійде на вказаний email або телефон',
      emoji: '📧',
    },
    {
      number: '5',
      title: 'Подаруйте',
      description: 'Передайте сертифікат одержувачу подарунка',
      emoji: '🎁',
    },
    {
      number: '6',
      title: 'Активуйте',
      description: 'Одержувач активує сертифікат та обере бренд',
      emoji: '✨',
    },
  ];

  const activationSteps = [
    {
      number: '1',
      title: 'Введіть дані',
      description: 'Вкажіть номер сертифіката та код активації',
      emoji: '🔢',
    },
    {
      number: '2',
      title: 'Перевірка',
      description: 'Система перевірить сертифікат та покаже доступну суму',
      emoji: '✅',
    },
    {
      number: '3',
      title: 'Оберіть бренд',
      description: 'Виберіть улюблений бренд зі списку партнерів',
      emoji: '🏪',
    },
    {
      number: '4',
      title: 'Отримайте картку',
      description: 'Подарункова картка обраного бренду надійде на ваш email',
      emoji: '🎉',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              color: 'primary.dark',
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            ✨ Як це працює?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              mb: 6,
              maxWidth: 800,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Простий та зрозумілий процес від покупки до активації подарункового сертифіката
          </Typography>
        </motion.div>

        {/* Buying Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              mb: 6,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                color: 'primary.main',
                mb: 5,
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              💳 Купівля сертифіката
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 4,
              }}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 3,
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      border: '2px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(139, 92, 246, 0.15)',
                      },
                    }}
                  >
                    {/* Step Number Badge */}
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        mb: 2,
                      }}
                    >
                      {step.number}
                    </Box>

                    {/* Emoji */}
                    <Typography sx={{ fontSize: '3rem', mb: 2 }}>
                      {step.emoji}
                    </Typography>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'primary.dark',
                        mb: 1,
                        fontSize: { xs: '1rem', md: '1.25rem' },
                      }}
                    >
                      {step.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: { xs: '0.875rem', md: '1rem' },
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Paper>
        </motion.div>

        {/* Activation Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                color: 'primary.main',
                mb: 5,
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              ✨ Активація сертифіката
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                gap: 4,
              }}
            >
              {activationSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 3,
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      border: '2px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(139, 92, 246, 0.15)',
                      },
                    }}
                  >
                    {/* Step Number Badge */}
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        mb: 2,
                      }}
                    >
                      {step.number}
                    </Box>

                    {/* Emoji */}
                    <Typography sx={{ fontSize: '3rem', mb: 2 }}>
                      {step.emoji}
                    </Typography>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: 'primary.dark',
                        mb: 1,
                        fontSize: { xs: '1rem', md: '1.25rem' },
                      }}
                    >
                      {step.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: { xs: '0.875rem', md: '1rem' },
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Paper>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Box
            sx={{
              mt: 6,
              p: 4,
              bgcolor: 'primary.light',
              borderRadius: 3,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: 'primary.dark',
                mb: 2,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
              }}
            >
              💡 Потрібна допомога?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: 700,
                mx: 'auto',
                fontSize: { xs: '0.9rem', md: '1rem' },
              }}
            >
              Якщо у вас виникли питання щодо покупки або активації сертифіката,
              зв'яжіться з нашою службою підтримки. Ми завжди раді допомогти!
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Container>
  );
};

export default HowItWorksPage;
