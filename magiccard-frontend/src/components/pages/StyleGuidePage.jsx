import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Grid,
  Alert,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInput from '../common/Input/PhoneInput';
import EmailInput from '../common/Input/EmailInput';
import MagicInput from '../common/Input/MagicInput';
import AnimatedButton from '../common/Button/AnimatedButton';

/**
 * StyleGuidePage - Демонстрація компонентів та анімацій
 * Показує всі типи інпутів з магічними ефектами
 */
const StyleGuidePage = () => {
  // States for basic inputs
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // States for MagicInput
  const [magicText, setMagicText] = useState('');
  const [magicTouched, setMagicTouched] = useState(false);

  // States for pre-filled examples
  const [phoneValid] = useState('+380501234567');
  const [phoneInvalid] = useState('+38050123');
  const [emailValid] = useState('example@domain.com');
  const [emailInvalid] = useState('invalid-email');

  // State for success message
  const [showSuccess, setShowSuccess] = useState(false);

  const handleButtonClick = () => {
    setShowSuccess(true);
    // Автоматически закрыть через 3 секунды
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  // Validation logic for demo
  const phoneRegex = /^\+380\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const isPhoneValid = phone && phoneRegex.test(phone);
  const isEmailValid = email && emailRegex.test(email);
  const isMagicValid = magicText && magicText.length >= 4;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              color: 'primary.dark',
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
            }}
          >
            ✨ Style Guide
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            Демонстрація компонентів форм з магічними анімаціями.
            Введіть валідні дані щоб побачити ефекти.
          </Typography>
        </Box>

        {/* PhoneInput Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: 'primary.dark' }}>
            📱 PhoneInput (UltimateMagicInput)
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Використовує UltimateMagicInput з багатофазною анімацією
          </Typography>

          <Box sx={{ maxWidth: 500 }}>
            <PhoneInput
              value={phone}
              onChange={setPhone}
              onBlur={() => {}}
              error={false}
              helperText=""
              touched={false}
              required
            />
          </Box>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              <strong>Статус:</strong> {isPhoneValid ? '✅ Валідний' : '⏳ Введіть +380XXXXXXXXX'}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', mt: 1 }}>
              <strong>Ефекти:</strong> Зелена рамка → Зелена галочка (з анімацією появи)
            </Typography>
          </Box>
        </Paper>

        {/* EmailInput Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: 'primary.dark' }}>
            ✉️ EmailInput (UltimateMagicInput)
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Використовує UltimateMagicInput з багатофазною анімацією
          </Typography>

          <Box sx={{ maxWidth: 500 }}>
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {}}
              error={false}
              helperText=""
              touched={false}
            />
          </Box>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              <strong>Статус:</strong> {isEmailValid ? '✅ Валідний' : '⏳ Введіть example@domain.com'}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', mt: 1 }}>
              <strong>Вимога:</strong> Email має містити домен з точкою після @
            </Typography>
          </Box>
        </Paper>

        {/* MagicInput Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: 'primary.dark' }}>
            ⭐ MagicInput (Базова версія)
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Спрощена версія з основними ефектами. Валідація: мінімум 4 символи
          </Typography>

          <Box sx={{ maxWidth: 500 }}>
            <MagicInput
              value={magicText}
              onChange={(e) => setMagicText(e.target.value)}
              onBlur={() => setMagicTouched(true)}
              error={false}
              helperText=""
              touched={magicTouched}
              isValid={isMagicValid}
              label="Текстове поле (Basic)"
              placeholder="Введіть текст (мін. 4 символи)"
            />
          </Box>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              <strong>Статус:</strong> {isMagicValid ? '✅ Валідний' : `⏳ Введіть мінімум 4 символи (${magicText.length}/4)`}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', mt: 1 }}>
              <strong>Ефекти:</strong> Зелена рамка → Зелена галочка (з анімацією появи)
            </Typography>
          </Box>
        </Paper>

        {/* Buttons Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: 'primary.dark' }}>
            🎯 Animated Buttons
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Кнопки з анімованими ефектами
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <AnimatedButton
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                withStars
                onClick={handleButtonClick}
              >
                Кнопка зі зірками
              </AnimatedButton>
            </Grid>

            <Grid item xs={12} sm={6}>
              <AnimatedButton
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleButtonClick}
              >
                Кнопка без зірок
              </AnimatedButton>
            </Grid>

            <Grid item xs={12} sm={6}>
              <AnimatedButton
                fullWidth
                variant="outlined"
                color="primary"
                size="large"
                onClick={handleButtonClick}
              >
                Outlined кнопка
              </AnimatedButton>
            </Grid>

            <Grid item xs={12} sm={6}>
              <AnimatedButton
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled
              >
                Disabled кнопка
              </AnimatedButton>
            </Grid>
          </Grid>
        </Paper>

        {/* Pre-filled Valid Examples */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: 'primary.dark' }}>
            ✅ Приклади валідних полів
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Поля з правильно заповненими даними (read-only)
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 500 }}>
            <Box sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
                color: 'rgba(0, 0, 0, 0.87)',
              }
            }}>
              <PhoneInput
                value={phoneValid}
                onChange={() => {}}
                onBlur={() => {}}
                error={false}
                helperText=""
                touched={true}
                required
                disabled
              />
            </Box>

            <Box sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
                color: 'rgba(0, 0, 0, 0.87)',
              }
            }}>
              <EmailInput
                value={emailValid}
                onChange={() => {}}
                onBlur={() => {}}
                error={false}
                helperText=""
                touched={true}
                disabled
              />
            </Box>

            <Box sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
                color: 'rgba(0, 0, 0, 0.87)',
              }
            }}>
              <MagicInput
                value="Правильний текст"
                onChange={() => {}}
                onBlur={() => {}}
                error={false}
                helperText=""
                touched={true}
                isValid={true}
                label="Текстове поле"
                placeholder=""
                disabled
              />
            </Box>
          </Box>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'success.light', borderRadius: 2, border: '1px solid', borderColor: 'success.main' }}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'success.dark' }}>
              ✅ Всі поля валідні - показується зелена рамка та зелена галочка
            </Typography>
          </Box>
        </Paper>

        {/* Pre-filled Invalid Examples */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: 'primary.dark' }}>
            ❌ Приклади невалідних полів
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Поля з неправильно заповненими даними (read-only)
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 500 }}>
            <Box sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
                color: 'rgba(0, 0, 0, 0.87)',
              },
              '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                borderColor: '#EF4444 !important',
                borderWidth: '2px',
              }
            }}>
              <PhoneInput
                value={phoneInvalid}
                onChange={() => {}}
                onBlur={() => {}}
                error={true}
                helperText="Невірний формат телефону"
                touched={true}
                required
                disabled
              />
            </Box>

            <Box sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
                color: 'rgba(0, 0, 0, 0.87)',
              },
              '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                borderColor: '#EF4444 !important',
                borderWidth: '2px',
              }
            }}>
              <EmailInput
                value={emailInvalid}
                onChange={() => {}}
                onBlur={() => {}}
                error={true}
                helperText="Невірний формат email"
                touched={true}
                disabled
              />
            </Box>

            <Box sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
                color: 'rgba(0, 0, 0, 0.87)',
              },
              '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                borderColor: '#EF4444 !important',
                borderWidth: '2px',
              }
            }}>
              <MagicInput
                value="ab"
                onChange={() => {}}
                onBlur={() => {}}
                error={true}
                helperText="Мінімум 4 символи"
                touched={true}
                isValid={false}
                label="Текстове поле"
                placeholder=""
                disabled
              />
            </Box>
          </Box>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'error.light', borderRadius: 2, border: '1px solid', borderColor: 'error.main' }}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'error.dark' }}>
              ❌ Всі поля невалідні - показується червона рамка та текст помилки
            </Typography>
          </Box>
        </Paper>

        {/* Animation Details */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'primary.light',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'primary.dark' }}>
            📋 Специфікація анімацій
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: 'primary.main' }}>
            Анімація валідації полів
          </Typography>
          <Box component="ul" sx={{ pl: 2, color: 'text.primary' }}>
            <li>Зелена рамка для валідного поля (color: #10B981)</li>
            <li>Зелена галочка з анімацією появи (scale + fade animation)</li>
            <li>Іконка з'являється справа від поля</li>
            <li>Анімація тривалість: 0.4s з easing backOut</li>
            <li>Плавний перехід кольору рамки (0.3s)</li>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: 'primary.main' }}>
            Кольори
          </Typography>
          <Box component="ul" sx={{ pl: 2, color: 'text.primary' }}>
            <li><strong>Фіолетовий (Primary):</strong> #8B5CF6 - основний колір кнопок та акцентів</li>
            <li><strong>Темно-фіолетовий (Primary Dark):</strong> #6D28D9 - заголовки та текст</li>
            <li><strong>Золотий (Gold):</strong> #F59E0B - акценти та зірки (на кнопках)</li>
            <li><strong>Зелений (Success):</strong> #10B981 - рамка та галочка валідних полів</li>
            <li><strong>Білий (White):</strong> #FFFFFF - текст на фіолетовому фоні</li>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: 'primary.main' }}>
            Тригери
          </Typography>
          <Box component="ul" sx={{ pl: 2, color: 'text.primary' }}>
            <li>Анімація запускається <strong>одразу</strong> при валідації даних</li>
            <li>Не потрібно втрачати фокус поля (onBlur)</li>
            <li>Ефекти скидаються якщо дані стають невалідними</li>
            <li>При помилках - тільки червона рамка, без анімацій</li>
            <li>Плавні переходи між станами (0.3-0.5s)</li>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: 'primary.main' }}>
            Додаткові компоненти
          </Typography>
          <Box component="ul" sx={{ pl: 2, color: 'text.primary' }}>
            <li><strong>CertificateInput:</strong> Поле для номера сертифікату (формат: XXXX-XXXX-XXXX)</li>
            <li><strong>ActivationCodeInput:</strong> Поле для коду активації з іконкою закритого ока</li>
            <li><strong>AmountSelector:</strong> Сітка карток для вибору номіналу</li>
            <li><strong>FloatingNav:</strong> Плаваюча кнопка в правому нижньому куті з анімацією покачування</li>
            <li><strong>PageTransition:</strong> Анімація переходу між сторінками (fade)</li>
          </Box>
        </Paper>
      </Container>

      {/* Success Message with Magic Effects */}
      <AnimatePresence>
        {showSuccess && (
          <Alert
              component={motion.div}
              initial={{
                scale: 0,
                rotate: -180,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                rotate: 0,
                opacity: 1,
              }}
              exit={{
                scale: 0,
                rotate: 180,
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
                ease: 'backOut',
              }}
              onClose={handleCloseSuccess}
              severity="success"
              sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                width: 'auto',
                minWidth: { xs: '300px', sm: '400px' },
                maxWidth: { xs: '90vw', sm: '600px' },
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                fontWeight: 700,
                py: 3,
                px: 4,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 50px rgba(16, 185, 129, 0.3)',
                background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                border: '2px solid #10B981',
                  '& .MuiAlert-icon': {
                    fontSize: '3rem',
                  },
                  '& .MuiAlert-message': {
                    display: 'flex',
                    alignItems: 'center',
                    color: '#065f46',
                  },
                  '& .MuiAlert-action': {
                    color: '#065f46',
                  },
                }}
            >
              🎉 Сертифікат успішно куплено! Перевірте ваш email.
            </Alert>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default StyleGuidePage;
