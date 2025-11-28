import { useState, useEffect } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';

/**
 * UltimateMagicInput - Advanced animated input with multi-phase magical effects
 * Features:
 * - Phase 1: Golden wand wave effect
 * - Phase 2: Star confetti explosion
 * - Phase 3: Magic dust particles
 * - Phase 4: Final glow and checkmark
 * - Smooth transitions between phases
 *
 * Use for important fields like Phone, Email, Certificate Code
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
const UltimateMagicInput = ({
  value,
  onChange,
  onBlur,
  error,
  helperText,
  touched,
  isValid,
  InputProps,
  ...props
}) => {
  const [showMagic, setShowMagic] = useState(false);
  const [effectPhase, setEffectPhase] = useState(0); // 0: idle, 1: wand, 2: stars, 3: complete

  useEffect(() => {
    if (isValid && !showMagic) {
      playMagicSequence();
    } else if (!isValid && showMagic) {
      // Скидаємо ефект якщо дані стали невалідними
      setShowMagic(false);
      setEffectPhase(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);

  const playMagicSequence = async () => {
    setShowMagic(true);

    // Фаза 1: Паличка (0.3s)
    setEffectPhase(1);
    await new Promise(resolve => setTimeout(resolve, 300));

    // Фаза 2: Зірочки (0.6s)
    setEffectPhase(2);
    await new Promise(resolve => setTimeout(resolve, 600));

    // Фаза 3: Завершення (0.5s)
    setEffectPhase(3);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Reset
    setEffectPhase(0);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Основне поле */}
      <motion.div
        animate={effectPhase > 0 ? {
          scale: [1, 1.02, 1],
        } : {}}
        transition={{ duration: 0.3 }}
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
            endAdornment: (
              <>
                {InputProps?.endAdornment}
                <InputAdornment position="end">
                  <AnimatePresence>
                    {isValid && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 0.8, // З'являється після ефектів
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
              transition: 'all 0.3s',


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

export default UltimateMagicInput;
