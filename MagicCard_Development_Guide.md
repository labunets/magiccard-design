# 🎴 MagicCard - Технічна інструкція для розробки
## Детальний гайд для Claude Code

**Призначення:** Розробка frontend для сайту продажу та активації подарункових сертифікатів  
**Фокус:** Форми та анімації  
**Стек:** React + Material-UI + Framer Motion  
**Досвід дизайнера:** 10 років в UI/UX

---

## 📋 ЗМІСТ

1. [Архітектура проекту](#архітектура)
2. [Налаштування проекту](#налаштування)
3. [Система дизайну](#система-дизайну)
4. [Робота з формами - ДЕТАЛЬНО](#форми)
5. [Система анімацій - ДЕТАЛЬНО](#анімації)
6. [Компоненти UI](#компоненти)
7. [Best Practices](#best-practices)
8. [Чеклист розробки](#чеклист)

---

<a name="архітектура"></a>
## 🏗️ АРХІТЕКТУРА ПРОЕКТУ

### Структура папок
```
magiccard-frontend/
├── public/
│   ├── index.html
│   └── assets/
│       ├── fonts/
│       └── icons/
├── src/
│   ├── components/
│   │   ├── common/           # Загальні UI компоненти
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   └── Stars/        # Анімація зірочок
│   │   ├── forms/            # Компоненти форм
│   │   │   ├── BuyForm/
│   │   │   │   ├── BuyForm.jsx
│   │   │   │   ├── AmountSelector.jsx
│   │   │   │   └── styles.js
│   │   │   └── ActivateForm/
│   │   │       ├── ActivateForm.jsx
│   │   │       ├── Step1Verify.jsx
│   │   │       ├── Step2Select.jsx
│   │   │       ├── PartnerCarousel.jsx
│   │   │       └── styles.js
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── FloatingNav.jsx
│   │   │   └── Footer.jsx
│   │   └── infographic/
│   │       ├── HowItWorks.jsx
│   │       └── MagicTransform.jsx
│   ├── hooks/               # Custom hooks
│   │   ├── useFormValidation.js
│   │   ├── useLocalStorage.js
│   │   ├── useStarAnimation.js
│   │   └── useMagicTransform.js
│   ├── utils/
│   │   ├── validation.js
│   │   ├── animations.js
│   │   └── constants.js
│   ├── styles/
│   │   ├── theme.js         # MUI тема
│   │   ├── animations.css   # CSS анімації
│   │   └── global.css
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

---

<a name="налаштування"></a>
## ⚙️ НАЛАШТУВАННЯ ПРОЕКТУ

### 1. Створення проекту
```bash
npx create-react-app magiccard-frontend
cd magiccard-frontend
```

### 2. Встановлення залежностей
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install framer-motion
npm install react-hook-form
npm install yup
npm install axios
npm install react-router-dom
```

### 3. Структура package.json (основні залежності)
```json
{
  "dependencies": {
    "@mui/material": "^5.14.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "framer-motion": "^10.16.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.45.0",
    "react-router-dom": "^6.15.0",
    "yup": "^1.2.0",
    "axios": "^1.4.0"
  }
}
```

---

<a name="система-дизайну"></a>
## 🎨 СИСТЕМА ДИЗАЙНУ

### Тема Material-UI

**Файл: `src/styles/theme.js`**

```javascript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B5CF6',      // Магічний фіолетовий
      dark: '#6D28D9',      // Темний фіолетовий
      light: '#DDD6FE',     // Світлий фіолетовий
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F59E0B',      // Золотий акцент
      dark: '#D97706',      // Темне золото
      light: '#FEF3C7',     // Світле золото
      contrastText: '#1F2937',
    },
    success: {
      main: '#10B981',
      light: '#D1FAE5',
    },
    error: {
      main: '#EF4444',
      light: '#FEE2E2',
    },
    info: {
      main: '#3B82F6',
      light: '#DBEAFE',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F9FAFB',
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
    },
  },
  typography: {
    fontFamily: '"Nunito", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.2,
      '@media (min-width:768px)': {
        fontSize: '36px',
      },
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 1.3,
      '@media (min-width:768px)': {
        fontSize: '32px',
      },
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '16px',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '14px',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '16px',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8, // 1 unit = 8px
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '16px 24px',
          fontSize: '16px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(139, 92, 246, 0.2)',
          },
        },
        sizeLarge: {
          height: '56px',
          fontSize: '16px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default theme;
```

### Константи кольорів

**Файл: `src/utils/constants.js`**

```javascript
export const COLORS = {
  // Primary - Фіолетовий
  PURPLE_MAIN: '#8B5CF6',
  PURPLE_DARK: '#6D28D9',
  PURPLE_LIGHT: '#DDD6FE',
  
  // Secondary - Золотий
  GOLD_MAIN: '#F59E0B',
  GOLD_DARK: '#D97706',
  GOLD_LIGHT: '#FEF3C7',
  
  // Semantic
  SUCCESS: '#10B981',
  ERROR: '#EF4444',
  INFO: '#3B82F6',
  
  // Neutrals
  WHITE: '#FFFFFF',
  GRAY_50: '#F9FAFB',
  GRAY_200: '#E5E7EB',
  GRAY_400: '#9CA3AF',
  GRAY_600: '#6B7280',
  GRAY_900: '#1F2937',
};

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
};

export const BREAKPOINTS = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1024,
};

export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
};
```

---

<a name="форми"></a>
## 📝 РОБОТА З ФОРМАМИ - ДЕТАЛЬНО

### Принципи роботи з формами

1. **Валідація в реальному часі** - помилки показуються при blur або після першої спроби submit
2. **Візуальний feedback** - чіткі стани (default, focus, error, success)
3. **Доступність** - aria-labels, keyboard navigation
4. **Анімовані переходи** - між полями, помилками, успіхом
5. **Магічні елементи** - зірочки при успішному заповненні

---

### ФОРМА 1: КУПИТИ СЕРТИФІКАТ

#### Компонент BuyForm

**Файл: `src/components/forms/BuyForm/BuyForm.jsx`**

```javascript
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Button, Typography } from '@mui/material';
import AmountSelector from './AmountSelector';
import PhoneInput from '../../common/Input/PhoneInput';
import EmailInput from '../../common/Input/EmailInput';
import StarsAnimation from '../../common/Stars/StarsAnimation';
import { useStarAnimation } from '../../../hooks/useStarAnimation';

// Схема валідації
const buyFormSchema = yup.object().shape({
  amount: yup
    .number()
    .required('Оберіть номінал сертифікату')
    .oneOf([100, 200, 500, 1000, 2000, 5000, 10000], 'Недійсний номінал'),
  phone: yup
    .string()
    .required('Телефон обов\'язковий')
    .matches(/^\+380\d{9}$/, 'Формат: +380XXXXXXXXX'),
  email: yup
    .string()
    .email('Недійсний email')
    .notRequired(),
});

const BuyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { triggerStars } = useStarAnimation();
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    resolver: yupResolver(buyFormSchema),
    mode: 'onBlur', // Валідація при втраті фокусу
    defaultValues: {
      amount: null,
      phone: '+380',
      email: '',
    },
  });

  const selectedAmount = watch('amount');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Анімація зірочок перед редиректом
      triggerStars(window.innerWidth / 2, window.innerHeight / 2, 10);
      
      // TODO: Відправка на backend
      // const response = await axios.post('/api/buy', data);
      // window.location.href = response.data.paymentUrl;
      
      console.log('Form data:', data);
      
      // Симуляція затримки
      await new Promise(resolve => setTimeout(resolve, 1500));
      
    } catch (error) {
      console.error('Помилка:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
      {/* Вибір номіналу */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 2, color: 'primary.dark' }}>
          Оберіть номінал сертифікату
        </Typography>
        
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <AmountSelector
              value={field.value}
              onChange={field.onChange}
              error={errors.amount}
              touched={touchedFields.amount}
            />
          )}
        />
        
        <AnimatePresence>
          {errors.amount && touchedFields.amount && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Typography variant="body2" color="error" sx={{ mt: 1, ml: 1 }}>
                {errors.amount.message}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Роздільник */}
      <Box sx={{ 
        height: 1, 
        bgcolor: 'grey.200', 
        my: 4,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 40,
          height: 40,
          bgcolor: 'background.default',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }
      }} />

      {/* Поле телефону */}
      <Box sx={{ mb: 3 }}>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              {...field}
              label="Телефон"
              required
              error={errors.phone}
              helperText={errors.phone?.message}
              touched={touchedFields.phone}
            />
          )}
        />
      </Box>

      {/* Поле email */}
      <Box sx={{ mb: 4 }}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <EmailInput
              {...field}
              label="Email (необов'язково)"
              error={errors.email}
              helperText={errors.email?.message || 'Сертифікат буде надіслано на цей email'}
              touched={touchedFields.email}
            />
          )}
        />
      </Box>

      {/* Кнопка оплати */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={!isValid || isSubmitting}
          sx={{
            height: 56,
            background: isSubmitting 
              ? 'linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)'
              : 'primary.main',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transition: 'left 0.5s',
            },
            '&:hover::before': {
              left: '100%',
            },
          }}
        >
          {isSubmitting ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ marginRight: 8 }}
              >
                ⭐
              </motion.span>
              Перенаправлення...
            </>
          ) : (
            <>
              💳 Оплатити {selectedAmount ? `${selectedAmount} грн` : 'Monobank'}
            </>
          )}
        </Button>
      </motion.div>
    </Box>
  );
};

export default BuyForm;
```

#### Компонент AmountSelector (Вибір номіналу)

**Файл: `src/components/forms/BuyForm/AmountSelector.jsx`**

```javascript
import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useStarAnimation } from '../../../hooks/useStarAnimation';

const AMOUNTS = [100, 200, 500, 1000, 2000, 5000, 10000];

const AmountSelector = ({ value, onChange, error, touched }) => {
  const { triggerStars, StarsContainer } = useStarAnimation();

  const handleSelect = (amount, event) => {
    onChange(amount);
    
    // Анімація зірочок від позиції кліку
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    triggerStars(x, y, 5);
  };

  return (
    <>
      <Grid container spacing={1}>
        {AMOUNTS.map((amount) => {
          const isSelected = value === amount;
          const isLarge = amount === 10000;
          
          return (
            <Grid 
              item 
              xs={isLarge ? 12 : 4} 
              key={amount}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isSelected ? {
                  scale: [1, 1.08, 1.05],
                  rotate: [0, -2, 0],
                } : {}}
                transition={{ duration: 0.3 }}
              >
                <Paper
                  onClick={(e) => handleSelect(amount, e)}
                  elevation={isSelected ? 4 : 1}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    height: isLarge ? 80 : 100,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    border: 2,
                    borderColor: isSelected ? 'primary.main' : 'grey.200',
                    bgcolor: isSelected ? 'primary.light' : 'background.paper',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: isSelected ? 'primary.light' : 'grey.50',
                      boxShadow: isSelected 
                        ? '0 8px 24px rgba(139, 92, 246, 0.25)'
                        : '0 4px 12px rgba(139, 92, 246, 0.15)',
                    },
                  }}
                >
                  {/* Зірочка при виборі */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0, rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.4, type: 'spring' }}
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          fontSize: 20,
                        }}
                      >
                        ⭐
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      color: isSelected ? 'primary.dark' : 'text.secondary',
                      transition: 'color 0.3s',
                    }}
                  >
                    {amount}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isSelected ? 'primary.dark' : 'text.secondary',
                      transition: 'color 0.3s',
                    }}
                  >
                    грн
                  </Typography>

                  {/* Золоте свічення при виборі */}
                  {isSelected && (
                    <motion.div
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{
                        position: 'absolute',
                        inset: -2,
                        borderRadius: 12,
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(139, 92, 246, 0.3))',
                        filter: 'blur(8px)',
                        zIndex: -1,
                      }}
                    />
                  )}
                </Paper>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
      
      {/* Контейнер для анімації зірочок */}
      <StarsContainer />
    </>
  );
};

export default AmountSelector;
```

#### Компонент PhoneInput (Поле телефону)

**Файл: `src/components/common/Input/PhoneInput.jsx`**

```javascript
import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PhoneInput = ({ value, onChange, onBlur, error, helperText, touched, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isValid = touched && !error && value && value.length > 4;

  const handleChange = (e) => {
    let input = e.target.value;
    
    // Автоматично додаємо +380 якщо порожнє
    if (!input) {
      input = '+380';
    }
    
    // Дозволяємо тільки цифри після +380
    if (input.startsWith('+380')) {
      const digits = input.slice(4).replace(/\D/g, '');
      input = '+380' + digits.slice(0, 9); // Максимум 9 цифр після +380
    }
    
    onChange(input);
  };

  return (
    <motion.div
      animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <TextField
        {...props}
        value={value}
        onChange={handleChange}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur && onBlur(e);
        }}
        onFocus={() => setIsFocused(true)}
        error={touched && !!error}
        helperText={touched && helperText}
        fullWidth
        placeholder="+380XXXXXXXXX"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <motion.div
                animate={isFocused ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <PhoneIcon color={isFocused ? 'primary' : 'action'} />
              </motion.div>
            </InputAdornment>
          ),
          endAdornment: (
            <AnimatePresence>
              {isValid && (
                <InputAdornment position="end">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.4, type: 'spring' }}
                  >
                    <CheckCircleIcon color="success" />
                  </motion.div>
                </InputAdornment>
              )}
            </AnimatePresence>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            height: 56,
            transition: 'all 0.3s',
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)',
            },
            '&.Mui-error': {
              animation: error && touched ? 'shake 0.5s' : 'none',
            },
          },
          '@keyframes shake': {
            '0%, 100%': { transform: 'translateX(0)' },
            '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
            '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
          },
        }}
      />
    </motion.div>
  );
};

export default PhoneInput;
```

---

### ФОРМА 2: АКТИВУВАТИ СЕРТИФІКАТ

#### Структура форми активації

Форма складається з двох кроків:
1. **Step1Verify** - Перевірка сертифікатів
2. **Step2Select** - Вибір партнера та карток

#### Головний компонент ActivateForm

**Файл: `src/components/forms/ActivateForm/ActivateForm.jsx`**

```javascript
import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Step1Verify from './Step1Verify';
import Step2Select from './Step2Select';

const ActivateForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [verifiedCertificates, setVerifiedCertificates] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleStep1Complete = (certificates, amount) => {
    setVerifiedCertificates(certificates);
    setTotalAmount(amount);
    setActiveStep(1);
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  const steps = ['Перевірка сертифікатів', 'Вибір подарунків'];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Прогрес */}
      <Stepper 
        activeStep={activeStep} 
        sx={{ 
          mb: 4,
          '& .MuiStepIcon-root.Mui-active': {
            color: 'primary.main',
          },
          '& .MuiStepIcon-root.Mui-completed': {
            color: 'secondary.main',
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              <motion.span
                animate={activeStep === index ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.5, repeat: activeStep === index ? Infinity : 0 }}
              >
                {label}
              </motion.span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Анімований перехід між кроками */}
      <AnimatePresence mode="wait">
        {activeStep === 0 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            <Step1Verify onComplete={handleStep1Complete} />
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <Step2Select
              certificates={verifiedCertificates}
              totalAmount={totalAmount}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default ActivateForm;
```

#### Step 1: Перевірка сертифікатів

**Файл: `src/components/forms/ActivateForm/Step1Verify.jsx`**

```javascript
import React, { useState } from 'react';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { Box, Button, Typography, IconButton, Divider, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CertificateInput from './CertificateInput';
import { useStarAnimation } from '../../../hooks/useStarAnimation';

const Step1Verify = ({ onComplete }) => {
  const [verificationResults, setVerificationResults] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const { triggerStars, StarsContainer } = useStarAnimation();

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      certificates: [{ number: '', code: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certificates',
  });

  const certificates = watch('certificates');
  const canAddMore = fields.length < 10;

  const handleAddCertificate = () => {
    if (canAddMore) {
      append({ number: '', code: '' });
      triggerStars(window.innerWidth / 2, 200, 3);
    }
  };

  const handleVerify = async (data) => {
    setIsVerifying(true);
    
    try {
      // TODO: API запит на перевірку
      // const response = await axios.post('/api/verify-certificates', data);
      
      // Симуляція
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResults = data.certificates.map((cert, index) => ({
        ...cert,
        isValid: index % 3 !== 2, // Кожен третій невалідний для демо
        amount: index % 3 !== 2 ? [500, 1000, 200][index % 3] : 0,
      }));

      const validCertificates = mockResults.filter(r => r.isValid);
      const totalAmount = validCertificates.reduce((sum, cert) => sum + cert.amount, 0);

      setVerificationResults({
        certificates: mockResults,
        totalAmount,
        validCount: validCertificates.length,
      });

      // Анімація успіху
      if (validCertificates.length > 0) {
        triggerStars(window.innerWidth / 2, window.innerHeight / 2, 15);
      }
      
    } catch (error) {
      console.error('Помилка перевірки:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleContinue = () => {
    const validCertificates = verificationResults.certificates.filter(c => c.isValid);
    onComplete(validCertificates, verificationResults.totalAmount);
    triggerStars(window.innerWidth / 2, 100, 10);
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 3, color: 'primary.dark' }}>
        Введіть дані сертифікатів
      </Typography>

      {/* Список полів для сертифікатів */}
      <Box component="form" onSubmit={handleSubmit(handleVerify)}>
        <AnimatePresence>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Box sx={{ mb: 3, position: 'relative' }}>
                {/* Номер сертифікату */}
                <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  Сертифікат #{index + 1}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Controller
                    name={`certificates.${index}.number`}
                    control={control}
                    rules={{ 
                      required: 'Обов\'язкове поле',
                      pattern: {
                        value: /^\d{4}-?\d{4}-?\d{4}$/,
                        message: 'Формат: XXXX-XXXX-XXXX'
                      }
                    }}
                    render={({ field, fieldState }) => (
                      <CertificateInput
                        {...field}
                        label="Номер сертифікату"
                        placeholder="XXXX-XXXX-XXXX"
                        error={fieldState.error}
                      />
                    )}
                  />

                  <Controller
                    name={`certificates.${index}.code`}
                    control={control}
                    rules={{ 
                      required: 'Обов\'язкове поле',
                      pattern: {
                        value: /^\d{4}-?\d{4}-?\d{4}$/,
                        message: 'Формат: XXXX-XXXX-XXXX'
                      }
                    }}
                    render={({ field, fieldState }) => (
                      <CertificateInput
                        {...field}
                        label="Код підтвердження"
                        placeholder="XXXX-XXXX-XXXX"
                        error={fieldState.error}
                      />
                    )}
                  />
                </Box>

                {/* Кнопка видалення */}
                {fields.length > 1 && (
                  <IconButton
                    onClick={() => remove(index)}
                    sx={{
                      position: 'absolute',
                      right: -8,
                      top: -8,
                      color: 'error.main',
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}

                {index < fields.length - 1 && (
                  <Divider sx={{ mt: 2 }} />
                )}
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Кнопка додати ще */}
        {canAddMore && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddCertificate}
              fullWidth
              sx={{ mb: 3, borderStyle: 'dashed', height: 48 }}
            >
              Додати ще сертифікат ({fields.length}/10)
            </Button>
          </motion.div>
        )}

        {/* Результати перевірки */}
        <AnimatePresence>
          {verificationResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Alert 
                severity={verificationResults.validCount > 0 ? 'success' : 'error'}
                sx={{ mb: 3 }}
              >
                <Typography variant="h6" gutterBottom>
                  Результати перевірки:
                </Typography>
                
                {verificationResults.certificates.map((cert, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    {cert.isValid ? (
                      <Typography variant="body2">
                        ✅ Сертифікат {cert.number} - {cert.amount} грн
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="error">
                        ❌ Сертифікат {cert.number} - не знайдено
                      </Typography>
                    )}
                  </Box>
                ))}

                {verificationResults.validCount > 0 && (
                  <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                      Загальна сума: {verificationResults.totalAmount} грн ✨
                    </Typography>
                  </Box>
                )}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Кнопки дій */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {!verificationResults ? (
            <motion.div style={{ flex: 1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isVerifying}
                sx={{ height: 56 }}
              >
                {isVerifying ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{ marginRight: 8 }}
                    >
                      ⭐
                    </motion.span>
                    Перевіряю...
                  </>
                ) : (
                  '✨ Перевірити'
                )}
              </Button>
            </motion.div>
          ) : verificationResults.validCount > 0 && (
            <motion.div 
              style={{ flex: 1 }} 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleContinue}
                sx={{ 
                  height: 56,
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #F59E0B 100%)',
                }}
              >
                → Продовжити
              </Button>
            </motion.div>
          )}
        </Box>
      </Box>

      <StarsContainer />
    </Box>
  );
};

export default Step1Verify;
```

#### Компонент CertificateInput

**Файл: `src/components/forms/ActivateForm/CertificateInput.jsx`**

```javascript
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { motion } from 'framer-motion';

const CertificateInput = ({ value, onChange, onBlur, label, placeholder, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  const formatCertificateNumber = (input) => {
    // Видаляємо все крім цифр
    const digits = input.replace(/\D/g, '');
    
    // Форматуємо як XXXX-XXXX-XXXX
    let formatted = '';
    for (let i = 0; i < digits.length && i < 12; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += '-';
      }
      formatted += digits[i];
    }
    
    return formatted;
  };

  const handleChange = (e) => {
    const formatted = formatCertificateNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <motion.div
      animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
      style={{ flex: 1 }}
    >
      <TextField
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur && onBlur(e);
        }}
        label={label}
        placeholder={placeholder}
        error={!!error}
        helperText={error?.message}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            height: 56,
            fontFamily: 'monospace',
            fontSize: 16,
            letterSpacing: 1,
            transition: 'all 0.3s',
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)',
            },
            '&.Mui-error': {
              animation: error ? 'shake 0.5s' : 'none',
            },
          },
          '@keyframes shake': {
            '0%, 100%': { transform: 'translateX(0)' },
            '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
            '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
          },
        }}
      />
    </motion.div>
  );
};

export default CertificateInput;
```

---

<a name="анімації"></a>
## 🎬 СИСТЕМА АНІМАЦІЙ - ДЕТАЛЬНО

### Принципи анімацій

1. **Тільки при взаємодії** - НЕ при scroll
2. **Швидкість** - 200-500ms для більшості анімацій
3. **Easing** - використовувати природні криві (ease-out для появи, ease-in для зникнення)
4. **Performance** - використовувати transform та opacity (GPU-accelerated)
5. **Доступність** - респектувати prefers-reduced-motion

---

### Hook для анімації зірочок

**Файл: `src/hooks/useStarAnimation.js`**

```javascript
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

export const useStarAnimation = () => {
  const [stars, setStars] = useState([]);

  const triggerStars = useCallback((x, y, count = 5) => {
    const newStars = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (Math.PI * 2 * i) / count + Math.random() * 0.5,
      distance: 50 + Math.random() * 100,
      size: 12 + Math.random() * 12,
      duration: 0.6 + Math.random() * 0.2,
    }));

    setStars(prev => [...prev, ...newStars]);

    // Видаляємо зірочки після анімації
    setTimeout(() => {
      setStars(prev => prev.filter(star => !newStars.find(s => s.id === star.id)));
    }, 1000);
  }, []);

  const StarsContainer = () => (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none',
      zIndex: 9999,
    }}>
      <AnimatePresence>
        {stars.map(star => {
          const endX = star.x + Math.cos(star.angle) * star.distance;
          const endY = star.y + Math.sin(star.angle) * star.distance;

          return (
            <motion.div
              key={star.id}
              initial={{
                x: star.x,
                y: star.y,
                scale: 0,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                x: endX,
                y: endY,
                scale: [0, 1.2, 1],
                rotate: 360,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: star.duration,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                fontSize: star.size,
                transformOrigin: 'center',
              }}
            >
              ⭐
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );

  return { triggerStars, StarsContainer };
};
```

---

### Анімація магічного перетворення

**Файл: `src/hooks/useMagicTransform.js`**

```javascript
import { useState } from 'react';

export const useMagicTransform = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle, pulsing, swirling, transforming, complete

  const playAnimation = async () => {
    setIsAnimating(true);

    // Фаза 1: Пульсація (0.5s)
    setPhase('pulsing');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Фаза 2: Вихор зірочок (0.8s)
    setPhase('swirling');
    await new Promise(resolve => setTimeout(resolve, 800));

    // Фаза 3: Перетворення (0.6s)
    setPhase('transforming');
    await new Promise(resolve => setTimeout(resolve, 600));

    // Фаза 4: Завершення (0.5s)
    setPhase('complete');
    await new Promise(resolve => setTimeout(resolve, 500));

    // Повернення до idle
    setPhase('idle');
    setIsAnimating(false);
  };

  return { playAnimation, isAnimating, phase };
};
```

**Файл: `src/components/infographic/MagicTransform.jsx`**

```javascript
import React from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useMagicTransform } from '../../hooks/useMagicTransform';

const MagicTransform = ({ onAnimationComplete }) => {
  const { playAnimation, phase } = useMagicTransform();

  React.useEffect(() => {
    playAnimation();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        height: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Сертифікат */}
      <AnimatePresence>
        {(phase === 'idle' || phase === 'pulsing' || phase === 'swirling') && (
          <motion.div
            initial={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
            animate={
              phase === 'pulsing'
                ? { scale: [1, 1.15, 1], rotate: [0, 5, 0] }
                : phase === 'swirling'
                ? { 
                    scale: 1.1,
                    rotate: [0, 180],
                    filter: 'blur(10px)',
                    opacity: [1, 0],
                  }
                : {}
            }
            exit={{ opacity: 0, scale: 0, rotate: 360 }}
            transition={{ duration: phase === 'pulsing' ? 0.5 : 0.8 }}
            style={{
              fontSize: 80,
              position: 'absolute',
            }}
          >
            💳
          </motion.div>
        )}
      </AnimatePresence>

      {/* Вихор зірочок */}
      <AnimatePresence>
        {phase === 'swirling' && (
          <>
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  rotate: 0,
                  opacity: 0,
                }}
                animate={{
                  x: Math.cos((Math.PI * 2 * i) / 12) * 100,
                  y: Math.sin((Math.PI * 2 * i) / 12) * 100,
                  scale: [0, 1.5, 0],
                  rotate: [0, 360 * 2],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.05,
                  ease: 'easeOut',
                }}
                style={{
                  position: 'absolute',
                  fontSize: 20,
                  color: '#F59E0B',
                }}
              >
                ⭐
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Подарунок */}
      <AnimatePresence>
        {(phase === 'transforming' || phase === 'complete') && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{
              opacity: 1,
              scale: phase === 'complete' ? [1, 1.1, 1] : 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.6,
              type: 'spring',
              stiffness: 200,
            }}
            style={{
              fontSize: 80,
              position: 'absolute',
            }}
          >
            🎁
          </motion.div>
        )}
      </AnimatePresence>

      {/* Золоте свічення */}
      {phase === 'complete' && (
        <motion.div
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.8, 1.3, 1],
          }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      )}
    </Box>
  );
};

export default MagicTransform;
```

---

### Анімації кнопок (стандартні)

**Файл: `src/components/common/Button/AnimatedButton.jsx`**

```javascript
import React from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';

const AnimatedButton = ({ 
  children, 
  onClick, 
  disabled,
  withStars = false,
  ...props 
}) => {
  const [ripples, setRipples] = React.useState([]);

  const handleClick = (e) => {
    if (withStars) {
      // Додаємо ефект розбіжності
      const rect = e.currentTarget.getBoundingClientRect();
      const newRipple = {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    }
    
    onClick && onClick(e);
  };

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      style={{ width: '100%', position: 'relative' }}
    >
      <Button
        {...props}
        disabled={disabled}
        onClick={handleClick}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          ...props.sx,
        }}
      >
        {children}

        {/* Ефект розбіжності */}
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            initial={{
              scale: 0,
              opacity: 0.6,
            }}
            animate={{
              scale: 4,
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              left: ripple.x,
              top: ripple.y,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.6)',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />
        ))}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
```

---

### Карусель партнерів з анімацією

**Файл: `src/components/forms/ActivateForm/PartnerCarousel.jsx`**

```javascript
import React, { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useStarAnimation } from '../../../hooks/useStarAnimation';

const MOCK_PARTNERS = [
  { id: 1, name: 'Rozetka', logo: '🛍️' },
  { id: 2, name: 'ATB', logo: '🏪' },
  { id: 3, name: 'Silpo', logo: '🛒' },
  { id: 4, name: 'Comfy', logo: '💻' },
  { id: 5, name: 'Auchan', logo: '🏬' },
  { id: 6, name: 'Fora', logo: '🍎' },
];

const PartnerCarousel = ({ selectedPartner, onSelect }) => {
  const scrollRef = useRef(null);
  const { triggerStars, StarsContainer } = useStarAnimation();

  const handleSelect = (partner, event) => {
    onSelect(partner);
    
    // Анімація зірочок
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    triggerStars(x, y, 7);
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3" gutterBottom>
          Оберіть партнерську мережу
        </Typography>
      </Box>

      {/* Карусель */}
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 2,
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: 'grey.100',
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'primary.light',
            borderRadius: 4,
            '&:hover': {
              bgcolor: 'primary.main',
            },
          },
        }}
      >
        {MOCK_PARTNERS.map((partner, index) => {
          const isSelected = selectedPartner?.id === partner.id;

          return (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={!isSelected ? { scale: 1.05, y: -5 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <Box
                onClick={(e) => handleSelect(partner, e)}
                sx={{
                  minWidth: 100,
                  height: 120,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  p: 2,
                  borderRadius: 3,
                  cursor: 'pointer',
                  border: 2,
                  borderColor: isSelected ? 'primary.main' : 'grey.200',
                  bgcolor: isSelected ? 'primary.light' : 'background.paper',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isSelected 
                    ? '0 8px 24px rgba(139, 92, 246, 0.25)'
                    : '0 2px 8px rgba(0,0,0,0.1)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 8px 24px rgba(139, 92, 246, 0.2)',
                  },
                }}
              >
                {/* Логотип */}
                <motion.div
                  animate={isSelected ? {
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 0.5 }}
                  style={{ fontSize: 40 }}
                >
                  {partner.logo}
                </motion.div>

                {/* Назва */}
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? 'primary.dark' : 'text.secondary',
                    textAlign: 'center',
                  }}
                >
                  {partner.name}
                </Typography>

                {/* Індикатор вибору */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      style={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        fontSize: 24,
                      }}
                    >
                      ⭐
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Золоте свічення */}
                {isSelected && (
                  <motion.div
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      position: 'absolute',
                      inset: -2,
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(139, 92, 246, 0.3))',
                      filter: 'blur(12px)',
                      zIndex: -1,
                    }}
                  />
                )}
              </Box>
            </motion.div>
          );
        })}
      </Box>

      {/* Індикатори прокрутки */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
        {Array.from({ length: Math.ceil(MOCK_PARTNERS.length / 3) }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: selectedPartner && Math.floor((MOCK_PARTNERS.findIndex(p => p.id === selectedPartner.id)) / 3) === i ? 24 : 8,
              backgroundColor: selectedPartner && Math.floor((MOCK_PARTNERS.findIndex(p => p.id === selectedPartner.id)) / 3) === i 
                ? '#8B5CF6' 
                : '#E5E7EB',
            }}
            transition={{ duration: 0.3 }}
            style={{
              height: 8,
              borderRadius: 4,
            }}
          />
        ))}
      </Box>

      <StarsContainer />
    </>
  );
};

export default PartnerCarousel;
```

---

<a name="компоненти"></a>
## 🧩 UI КОМПОНЕНТИ

### Toast повідомлення

**Файл: `src/components/common/Toast/Toast.jsx`**

```javascript
import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ open, onClose, severity = 'info', message, autoHideDuration = 4000 }) => {
  return (
    <AnimatePresence>
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={autoHideDuration}
          onClose={onClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <Alert 
              onClose={onClose} 
              severity={severity}
              sx={{ 
                width: '100%',
                boxShadow: 4,
              }}
            >
              {message}
            </Alert>
          </motion.div>
        </Snackbar>
      )}
    </AnimatePresence>
  );
};

export default Toast;
```

---

<a name="best-practices"></a>
## ⭐ BEST PRACTICES

### 1. Performance оптимізація

```javascript
// ✅ ПРАВИЛЬНО - використовуємо React.memo
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* складний UI */}</div>;
});

// ✅ ПРАВИЛЬНО - використовуємо useCallback для функцій
const MyForm = () => {
  const handleChange = useCallback((value) => {
    // логіка
  }, [/* dependencies */]);
};

// ✅ ПРАВИЛЬНО - використовуємо CSS transforms для анімацій
const AnimatedBox = () => (
  <motion.div
    animate={{ 
      x: 100,        // ✅ transform (GPU)
      opacity: 0.5,  // ✅ opacity (GPU)
    }}
  />
);

// ❌ НЕПРАВИЛЬНО - не використовуємо margin/padding для анімацій
const BadAnimatedBox = () => (
  <motion.div
    animate={{ 
      marginLeft: 100,  // ❌ викликає reflow
    }}
  />
);
```

### 2. Доступність (a11y)

```javascript
// ✅ ПРАВИЛЬНО - додаємо aria-labels
<Button
  aria-label="Додати сертифікат"
  onClick={handleAdd}
>
  <AddIcon />
</Button>

// ✅ ПРАВИЛЬНО - підтримуємо keyboard navigation
<Box
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyPress={(e) => e.key === 'Enter' && handleClick()}
>
  Натисніть мене
</Box>

// ✅ ПРАВИЛЬНО - респектуємо prefers-reduced-motion
const AnimatedComponent = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return (
    <motion.div
      animate={!prefersReducedMotion ? { scale: 1.1 } : {}}
    />
  );
};
```

### 3. Валідація форм

```javascript
// ✅ ПРАВИЛЬНО - використовуємо yup схеми
const schema = yup.object().shape({
  phone: yup
    .string()
    .required('Обов\'язкове поле')
    .matches(/^\+380\d{9}$/, 'Невірний формат'),
});

// ✅ ПРАВИЛЬНО - показуємо помилки тільки після touch
{touched && error && (
  <Typography color="error">{error.message}</Typography>
)}
```

### 4. Анімації

```javascript
// ✅ ПРАВИЛЬНО - cleanup анімацій
useEffect(() => {
  const animation = startAnimation();
  return () => {
    animation.stop(); // cleanup
  };
}, []);

// ✅ ПРАВИЛЬНО - використовуємо AnimatePresence для exit анімацій
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

---

<a name="чеклист"></a>
## ✅ ЧЕКЛИСТ РОЗРОБКИ

### Фаза 1: Базовий Setup (1-2 години)
- [ ] Створити React проект
- [ ] Встановити всі залежності
- [ ] Налаштувати MUI тему
- [ ] Створити структуру папок
- [ ] Налаштувати роутинг (якщо потрібно)

### Фаза 2: UI Компоненти (3-4 години)
- [ ] Створити базовий Button з анімаціями
- [ ] Створити PhoneInput з форматуванням
- [ ] Створити EmailInput з валідацією
- [ ] Створити CertificateInput з форматуванням
- [ ] Створити Toast компонент
- [ ] Створити Stars анімацію (hook + компонент)

### Фаза 3: Форма "Купити" (4-5 годин)
- [ ] Створити AmountSelector
- [ ] Інтегрувати react-hook-form
- [ ] Додати валідацію через yup
- [ ] Додати анімації для номіналів
- [ ] Додати анімації для кнопки
- [ ] Протестувати всі edge cases

### Фаза 4: Форма "Активувати" (6-8 годин)
- [ ] Створити Step1Verify
- [ ] Додати динамічні поля сертифікатів
- [ ] Створити логіку перевірки
- [ ] Створити Step2Select
- [ ] Створити PartnerCarousel
- [ ] Додати логіку вибору карток
- [ ] Додати перехід між кроками з анімацією

### Фаза 5: Анімації та Ефекти (4-5 годин)
- [ ] Імплементувати useStarAnimation hook
- [ ] Імплементувати MagicTransform компонент
- [ ] Додати ripple ефекти на кнопки
- [ ] Додати golden glow ефекти
- [ ] Додати shake анімацію для помилок
- [ ] Оптимізувати performance анімацій

### Фаза 6: Інтеграція та Тестування (3-4 години)
- [ ] З'єднати форми з API (заглушки)
- [ ] Додати error handling
- [ ] Додати loading states
- [ ] Протестувати на різних пристроях
- [ ] Протестувати accessibility
- [ ] Перевірити performance

### Фаза 7: Полірування (2-3 години)
- [ ] Фінальні правки анімацій
- [ ] Оптимізація bundle size
- [ ] Перевірка на типових помилках
- [ ] Code review
- [ ] Документація коду

---

## 🎯 ПРІОРИТЕТИ РОЗРОБКИ

### ВИСОКИЙ ПРІОРИТЕТ (Must Have)
1. ✅ Форма "Купити" з валідацією
2. ✅ Форма "Активувати" з 2 кроками
3. ✅ Анімація зірочок при взаємодії
4. ✅ Responsive дизайн (mobile-first)
5. ✅ Базова валідація полів

### СЕРЕДНІЙ ПРІОРИТЕТ (Should Have)
1. ✅ Магічне перетворення (інфографіка)
2. ✅ Карусель партнерів з анімацією
3. ✅ Toast повідомлення
4. ✅ Ripple ефекти на кнопках
5. ✅ Golden glow ефекти

### НИЗЬКИЙ ПРІОРИТЕТ (Nice to Have)
1. Складні мікроанімації
2. Прелоадери з магічною темою
3. Конфетті при успішній оплаті
4. Звукові ефекти (опціонально)

---

## 🚀 ГОТОВО ДО РОЗРОБКИ!

Цей документ містить:
✅ Повну структуру проекту  
✅ Детальні специфікації форм  
✅ Приклади коду для всіх компонентів  
✅ Систему анімацій з hooks  
✅ Best practices  
✅ Чеклист розробки  

**Наступні кроки:**
1. Скопіюйте цей документ в Claude Code
2. Починайте розробку з Фази 1
3. Використовуйте надані приклади коду як основу
4. Адаптуйте під конкретні потреби проекту

Успіхів! ✨🎴
