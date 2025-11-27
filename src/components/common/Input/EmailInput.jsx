import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/**
 * EmailInput - Animated email input with validation
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
  const isValid = touched && !error && value && value.length > 0;

  const handleFocus = () => {
    setIsFocused(true);
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
        type="email"
        value={value || ''}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        error={touched && !!error}
        helperText={touched && helperText}
        label={required ? 'Email *' : "Email (необов'язково)"}
        fullWidth
        placeholder="example@email.com"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <motion.div
                animate={isFocused ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <EmailIcon color={isFocused ? 'primary' : 'action'} />
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

export default EmailInput;
