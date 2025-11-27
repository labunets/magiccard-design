import { useState } from 'react';
import { Box, Paper, Typography, TextField, InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import { AMOUNTS } from '../../../utils/constants';
import { useStarAnimation } from '../../../hooks/useStarAnimation';

/**
 * AmountSelector - Grid of certificate amounts + custom input
 *
 * @param {number} value - Selected amount
 * @param {function} onChange - Change handler
 * @param {string} error - Error message
 */
const AmountSelector = ({ value, onChange, error }) => {
  const { triggerStars } = useStarAnimation();
  const [customValue, setCustomValue] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const handleAmountClick = (amount, event) => {
    setIsCustom(false);
    setCustomValue('');
    onChange(amount);

    // Trigger stars
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    triggerStars(x, y, 5);
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/\D/g, ''); // Only digits
    setCustomValue(val);
    setIsCustom(true);

    if (val) {
      const numValue = parseInt(val, 10);
      onChange(numValue);
    } else {
      onChange(0);
    }
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: 'text.primary'
        }}
      >
        Оберіть суму сертифіката
      </Typography>

      {/* Preset amounts grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 2,
          mb: 3,
        }}
      >
        {AMOUNTS.map((amount) => {
          const isSelected = value === amount && !isCustom;

          return (
            <motion.div
              key={amount}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Paper
                onClick={(e) => handleAmountClick(amount, e)}
                elevation={isSelected ? 8 : 1}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: 2,
                  borderColor: isSelected ? 'primary.main' : 'transparent',
                  bgcolor: isSelected ? 'primary.light' : 'background.paper',
                  '&:hover': {
                    borderColor: 'primary.light',
                    boxShadow: 3,
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: isSelected ? 'primary.dark' : 'text.primary',
                    transition: 'color 0.3s',
                  }}
                >
                  {amount}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isSelected ? 'primary.main' : 'text.secondary',
                    transition: 'color 0.3s',
                  }}
                >
                  грн
                </Typography>
              </Paper>
            </motion.div>
          );
        })}
      </Box>

      {/* Custom amount input */}
      <Box>
        <Typography
          variant="body1"
          sx={{
            mb: 1,
            fontWeight: 500,
            color: 'text.secondary'
          }}
        >
          Або введіть іншу суму
        </Typography>

        <TextField
          fullWidth
          value={customValue}
          onChange={handleCustomChange}
          placeholder="Введіть суму"
          error={!!error}
          helperText={error}
          InputProps={{
            endAdornment: <InputAdornment position="end">грн</InputAdornment>,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderColor: isCustom ? 'primary.main' : undefined,
              '&.Mui-focused': {
                '& > fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: 2,
                },
              },
            },
          }}
        />
      </Box>

      {value > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              mt: 3,
              p: 2,
              bgcolor: 'secondary.light',
              borderRadius: 2,
              border: 2,
              borderColor: 'secondary.main',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'secondary.dark',
              }}
            >
              Вибрано: {value} грн
            </Typography>
          </Box>
        </motion.div>
      )}
    </Box>
  );
};

export default AmountSelector;
