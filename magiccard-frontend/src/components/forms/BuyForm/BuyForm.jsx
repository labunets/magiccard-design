import { useState } from 'react';
import { Box, Paper, Typography, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PhoneInput from '../../common/Input/PhoneInput';
import EmailInput from '../../common/Input/EmailInput';
import AnimatedButton from '../../common/Button/AnimatedButton';
import AmountSelector from '../../common/AmountSelector/AmountSelector';
import { VALIDATION_PATTERNS } from '../../../utils/constants';

// Validation schema
const schema = yup.object().shape({
  amount: yup
    .number()
    .required('Оберіть суму сертифіката')
    .min(100, 'Мінімальна сума - 100 грн')
    .max(50000, 'Максимальна сума - 50000 грн'),
  phone: yup
    .string()
    .required('Телефон обов\'язковий')
    .matches(VALIDATION_PATTERNS.PHONE, 'Невірний формат телефону'),
  email: yup
    .string()
    .email('Невірний формат email')
    .notRequired(),
});

/**
 * BuyForm - Form for purchasing gift certificates
 * Features:
 * - Amount selection (preset + custom)
 * - Phone input (required)
 * - Email input (optional)
 * - Yup validation
 * - Animated submission
 */
const BuyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: 0,
      phone: '',
      email: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      // TODO: API call to backend
      console.log('Submitting buy form:', data);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock success
      setSubmitSuccess(true);
      reset();

      // Hide success message after 5s
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Buy form submission error:', error);
      setSubmitError(
        error.response?.data?.message ||
          'Сталася помилка. Спробуйте ще раз.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 3, md: 4 },
        maxWidth: 800,
        margin: '0 auto',
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: 'primary.dark',
          textAlign: 'center',
        }}
      >
        💳 Купити сертифікат
      </Typography>

      {submitSuccess && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
          onClose={() => setSubmitSuccess(false)}
        >
          Замовлення успішно оформлено! Ми зв'яжемося з вами найближчим часом.
        </Alert>
      )}

      {submitError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => setSubmitError('')}
        >
          {submitError}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Amount Selector */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <AmountSelector
                value={field.value}
                onChange={field.onChange}
                error={
                  touchedFields.amount && errors.amount
                    ? errors.amount.message
                    : undefined
                }
              />
            )}
          />

          {/* Phone Input */}
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                touched={touchedFields.phone}
                required
              />
            )}
          />

          {/* Email Input */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <EmailInput
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!errors.email}
                helperText={errors.email?.message}
                touched={touchedFields.email}
              />
            )}
          />

          {/* Submit Button */}
          <AnimatedButton
            type="submit"
            fullWidth
            disabled={isSubmitting}
            withStars
            size="large"
            variant="contained"
            color="primary"
          >
            {isSubmitting ? 'Обробка...' : 'Оформити замовлення'}
          </AnimatedButton>
        </Box>
      </form>

      <Typography
        variant="body2"
        sx={{
          mt: 3,
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        Після оформлення замовлення ми зв'яжемося з вами для підтвердження
      </Typography>
    </Paper>
  );
};

export default BuyForm;
