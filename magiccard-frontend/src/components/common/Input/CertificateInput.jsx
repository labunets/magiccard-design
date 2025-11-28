import React, { useState } from 'react';
import { InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MagicInput from './MagicInput';

/**
 * CertificateInput - Input for certificate numbers with auto-formatting
 * Format: XXXX-XXXX-XXXX (12 digits)
 * Uses MagicInput for validation effects (simpler than UltimateMagicInput)
 *
 * @param {string} value - Current input value
 * @param {function} onChange - Change handler
 * @param {function} onBlur - Blur handler
 * @param {object} error - Error object from validation
 * @param {string} helperText - Helper or error text
 * @param {boolean} touched - Whether field was touched
 * @param {boolean} required - Whether field is required
 */
const CertificateInput = ({
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

  // Validate certificate format (12 digits)
  const isValid = value && /^\d{4}-?\d{4}-?\d{4}$/.test(value.replace(/-/g, ''));

  const handleChange = (e) => {
    let input = e.target.value;

    // Remove all non-digits
    const digits = input.replace(/\D/g, '');

    // Format as XXXX-XXXX-XXXX
    let formatted = '';
    for (let i = 0; i < Math.min(digits.length, 12); i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += '-';
      }
      formatted += digits[i];
    }

    onChange(formatted);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <MagicInput
      {...props}
      value={value || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      error={error}
      helperText={helperText}
      touched={touched}
      isValid={isValid}
      label={required ? 'Номер сертифікату *' : 'Номер сертифікату'}
      placeholder="XXXX-XXXX-XXXX"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <motion.div
              animate={isFocused ? { rotate: [0, -15, 15, 0] } : {}}
              transition={{ duration: 0.6 }}
            >
              <ConfirmationNumberIcon
                sx={{
                  color: isValid ? '#10B981' : (isFocused ? '#8B5CF6' : 'rgba(0, 0, 0, 0.54)'),
                  transition: 'color 0.3s',
                }}
              />
            </motion.div>
          </InputAdornment>
        ),
      }}
      sx={{
        '& input': {
          fontFamily: 'monospace',
          fontSize: '1.1rem',
          letterSpacing: '0.05em',
        },
      }}
    />
  );
};

export default CertificateInput;
