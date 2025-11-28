import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { AMOUNTS } from '../../../utils/constants';
import { useStarAnimation } from '../../../hooks/useStarAnimation';

/**
 * AmountSelector - Grid of certificate amounts
 *
 * @param {number} value - Selected amount
 * @param {function} onChange - Change handler
 * @param {string} error - Error message
 */
const AmountSelector = ({ value, onChange, error }) => {
  const { triggerStars } = useStarAnimation();

  const handleAmountClick = (amount, event) => {
    onChange(amount);

    // Trigger stars
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    triggerStars(x, y, 5);
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
        Оберіть суму сертифіката (грн)
      </Typography>

      {/* Preset amounts grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          mb: 3,
        }}
      >
        {AMOUNTS.map((amount) => {
          const isSelected = value === amount;

          return (
            <motion.div
              key={amount}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Paper
                onClick={(e) => handleAmountClick(amount, e)}
                elevation={0}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: 2,
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  bgcolor: isSelected ? 'primary.main' : 'background.paper',
                  '&:hover': {
                    borderColor: 'primary.light',
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: isSelected ? '#FFFFFF' : 'text.primary',
                    transition: 'color 0.3s',
                  }}
                >
                  {amount}
                </Typography>
              </Paper>
            </motion.div>
          );
        })}
      </Box>

      {error && (
        <Typography
          variant="body2"
          sx={{
            color: 'error.main',
            mb: 2,
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default AmountSelector;
