import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/**
 * PhoneInput - Animated phone input with Ukrainian format validation
 * Automatically formats to +380XXXXXXXXX
 *
 * @param {string} value - Current input value
 * @param {function} onChange - Change handler
 * @param {function} onBlur - Blur handler
 * @param {object} error - Error object from validation
 * @param {string} helperText - Helper or error text
 * @param {boolean} touched - Whether field was touched
 * @param {boolean} required - Whether field is required
 */
const PhoneInput = ({
  value,
  onChange,
  onBlur,
  error,
  helperText,
  touched,
  required = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isValid = touched && !error && value && value.length > 4;

  const handleChange = (e) => {
    let input = e.target.value;

    // Автоматично додаємо +380 якщо порожнє
    if (!input) {
      input = '+380';
    }

    // Дозволяємо тільки +380 на початку
    if (!input.startsWith('+380')) {
      input = '+380' + input.replace(/[^\d]/g, '');
    }

    // Дозволяємо тільки цифри після +380
    if (input.startsWith('+380')) {
      const digits = input.slice(4).replace(/\D/g, '');
      input = '+380' + digits.slice(0, 9); // Максимум 9 цифр після +380
    }

    onChange(input);
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Якщо поле порожнє, додаємо +380
    if (!value) {
      onChange('+380');
    }
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <motion.div
      animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <TextField
        {...props}
        value={value || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        error={touched && !!error}
        helperText={touched && helperText}
        label={required ? 'Телефон *' : 'Телефон'}
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
