import { useState, useEffect } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';

/**
 * MagicInput - Animated input with magical validation effects
 * Features:
 * - Golden wave animation on validation success
 * - Star particles that disperse radially
 * - Magical glow and pulse effects
 * - Animated checkmark icon
 * - Magic dust particles
 *
 * @param {string} value - Current input value
 * @param {function} onChange - Change handler
 * @param {function} onBlur - Blur handler
 * @param {object} error - Error object from validation
 * @param {string} helperText - Helper or error text
 * @param {boolean} touched - Whether field was touched
 * @param {boolean} isValid - Whether field is valid (passed validation)
 * @param {object} InputProps - Additional InputProps to merge
 */
const MagicInput = ({
  value,
  onChange,
  onBlur,
  error,
  helperText,
  touched,
  isValid, // передаємо ззовні результат валідації
  InputProps,
  ...props
}) => {
  const [showMagic, setShowMagic] = useState(false);

  // Тригер магічного ефекту при валідації
  useEffect(() => {
    if (isValid && !showMagic) {
      setShowMagic(true);
    } else if (!isValid && showMagic) {
      // Скидаємо ефект якщо дані стали невалідними
      setShowMagic(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <motion.div
        animate={showMagic ? {
          scale: [1, 1.02, 1],
        } : {}}
        transition={{ duration: 0.4 }}
      >
        <TextField
          {...props}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={touched && !!error}
          helperText={touched && helperText}
          fullWidth
          InputProps={{
            ...InputProps,
            startAdornment: InputProps?.startAdornment,
            endAdornment: (
              <>
                {InputProps?.endAdornment}
                <InputAdornment position="end">
                  <AnimatePresence>
                    {isValid && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: 'backOut',
                        }}
                      >
                        <CheckIcon
                          sx={{
                            color: '#10B981',
                            fontSize: 24,
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </InputAdornment>
              </>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              height: 56,
              position: 'relative',
              overflow: 'visible',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',


              // Зелений border для валідного поля
              ...(isValid && {
                borderColor: '#10B981',
                '& fieldset': {
                  borderColor: '#10B981 !important',
                },
              }),

              '&.Mui-focused': {
                borderColor: 'primary.main',
              },
            },

            // Зелений label для валідного поля
            '& .MuiInputLabel-root': {
              transition: 'color 0.3s',
              ...(isValid && {
                color: '#10B981 !important',
              }),
            },
          }}
        />
      </motion.div>

    </Box>
  );
};

export default MagicInput;
