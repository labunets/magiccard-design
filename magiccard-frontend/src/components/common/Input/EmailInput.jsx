import React, { useState } from 'react';
import { InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import UltimateMagicInput from './UltimateMagicInput';

/**
 * EmailInput - Animated email input with validation
 * Uses UltimateMagicInput for magical validation effects
 *
 * @param {string} value - Current input value
 * @param {function} onChange - Change handler
 * @param {function} onBlur - Blur handler
 * @param {object} error - Error object from validation
 * @param {string} helperText - Helper or error text
 * @param {boolean} touched - Whether field was touched
 * @param {boolean} required - Whether field is required
 */
const EmailInput = ({
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

  // Email regex для перевірки валідності
  // Формат: xxx@yyy.zzz (після @ обов'язково має бути домен з точкою)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Перевірка: email має бути заповнений і валідний
  const isValid = value && value.length > 0 && emailRegex.test(value) && !error;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <UltimateMagicInput
      {...props}
      type="email"
      value={value || ''}
      onChange={onChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      error={error}
      helperText={helperText}
      touched={touched}
      isValid={isValid}
      label={required ? 'Email *' : "Email (необов'язково)"}
      placeholder="example@email.com"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <motion.div
              animate={isFocused ? { rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <EmailIcon
                sx={{
                  color: isValid ? '#10B981' : (isFocused ? '#8B5CF6' : 'rgba(0, 0, 0, 0.54)'),
                  transition: 'color 0.3s',
                }}
              />
            </motion.div>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default EmailInput;
