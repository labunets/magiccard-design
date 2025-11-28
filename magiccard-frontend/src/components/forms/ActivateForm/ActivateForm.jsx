import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AnimatedButton from '../../common/Button/AnimatedButton';
import PhoneInput from '../../common/Input/PhoneInput';
import EmailInput from '../../common/Input/EmailInput';
import CertificateInput from '../../common/Input/CertificateInput';
import ActivationCodeInput from '../../common/Input/ActivationCodeInput';
import { VALIDATION_PATTERNS } from '../../../utils/constants';

// LocalStorage keys
const STORAGE_KEYS = {
  CERTIFICATE_NUMBER: 'magiccard_activate_certificate_number',
  ACTIVATION_CODE: 'magiccard_activate_activation_code',
  PHONE: 'magiccard_phone', // Общий ключ для телефона (используется в обеих формах)
  EMAIL: 'magiccard_email', // Общий ключ для email (используется в обеих формах)
};

// Validation schema
const schema = yup.object().shape({
  certificateNumber: yup
    .string()
    .required('Номер сертифікату обов\'язковий')
    .min(6, 'Номер сертифікату занадто короткий'),
  activationCode: yup
    .string()
    .required('Код активації обов\'язковий')
    .matches(/^\d{4}-\d{4}-\d{4}$/, 'Формат: XXXX-XXXX-XXXX'),
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
 * ActivateForm - Form for activating gift certificates
 * Features:
 * - Certificate number input
 * - Activation code input
 * - Yup validation
 * - Animated submission
 *
 * @param {function} onSuccess - Callback when activation is successful, receives activation data
 */
const ActivateForm = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Load saved values from localStorage
  const getSavedValues = () => {
    try {
      const savedCertificateNumber = localStorage.getItem(STORAGE_KEYS.CERTIFICATE_NUMBER);
      const savedActivationCode = localStorage.getItem(STORAGE_KEYS.ACTIVATION_CODE);
      const savedPhone = localStorage.getItem(STORAGE_KEYS.PHONE);
      const savedEmail = localStorage.getItem(STORAGE_KEYS.EMAIL);

      return {
        certificateNumber: savedCertificateNumber || '',
        activationCode: savedActivationCode || '',
        phone: savedPhone || '',
        email: savedEmail || '',
      };
    } catch (error) {
      console.error('Error loading saved form data:', error);
      return {
        certificateNumber: '',
        activationCode: '',
        phone: '',
        email: '',
      };
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: getSavedValues(),
    mode: 'onTouched',
  });

  // Watch form values to save them to localStorage
  const watchedValues = watch();

  // Save form values to localStorage when they change
  useEffect(() => {
    try {
      if (watchedValues.certificateNumber) {
        localStorage.setItem(STORAGE_KEYS.CERTIFICATE_NUMBER, watchedValues.certificateNumber);
      }
      if (watchedValues.activationCode) {
        localStorage.setItem(STORAGE_KEYS.ACTIVATION_CODE, watchedValues.activationCode);
      }
      if (watchedValues.phone) {
        localStorage.setItem(STORAGE_KEYS.PHONE, watchedValues.phone);
      }
      if (watchedValues.email) {
        localStorage.setItem(STORAGE_KEYS.EMAIL, watchedValues.email);
      }
    } catch (error) {
      console.error('Error saving form data to localStorage:', error);
    }
  }, [watchedValues]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // TODO: API call to backend
      console.log('Submitting activate form:', data);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to success page with activation data
      if (onSuccess) {
        onSuccess({
          certificateNumber: data.certificateNumber,
          activationCode: data.activationCode,
          phone: data.phone,
          email: data.email,
        });
      }

      // Reset form after successful submission
      reset();
    } catch (error) {
      console.error('Activate form submission error:', error);
      setSubmitError(
        error.response?.data?.message ||
          'Сталася помилка. Перевірте дані та спробуйте ще раз.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      number: 1,
      icon: '🎫',
      title: 'Введіть дані',
      description: 'Номер сертифікату та код активації',
    },
    {
      number: 2,
      icon: '📱',
      title: 'Вкажіть контакти',
      description: 'Телефон і email для зв\'язку',
    },
    {
      number: 3,
      icon: '🎁',
      title: 'Отримайте подарунок',
      description: 'Використайте сертифікат у партнерів',
    },
  ];

  return (
    <>
      {/* Form */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          maxWidth: 800,
          margin: '0 auto',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Certificate Number Input */}
          <Controller
            name="certificateNumber"
            control={control}
            render={({ field }) => (
              <CertificateInput
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!errors.certificateNumber}
                helperText={errors.certificateNumber?.message}
                touched={touchedFields.certificateNumber}
                required
              />
            )}
          />

          {/* Activation Code Input */}
          <Controller
            name="activationCode"
            control={control}
            render={({ field }) => (
              <ActivationCodeInput
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!errors.activationCode}
                helperText={errors.activationCode?.message}
                touched={touchedFields.activationCode}
                required
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
            {isSubmitting ? 'Обробка...' : 'Активувати сертифікат'}
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
          Номер сертифікату та код активації вказані у вашому сертифікаті
        </Typography>
      </Paper>

      {/* How It Works Section */}
      <Box
        sx={{
          mt: 4,
          p: { xs: 3, md: 4 },
          bgcolor: 'background.paper',
          borderRadius: 3,
          maxWidth: 900,
          margin: '32px auto 0 auto',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            fontWeight: 700,
            color: 'primary.dark',
            textAlign: 'center',
          }}
        >
          Як це працює?
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {steps.map((step, index) => (
            <Box
              key={step.number}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Step Number Badge */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: 'primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  fontSize: '40px',
                  border: 3,
                  borderColor: 'primary.main',
                  position: 'relative',
                }}
              >
                {step.icon}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  {step.number}
                </Box>
              </Box>

              {/* Arrow between steps (desktop only) */}
              {index < steps.length - 1 && (
                <Box
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    top: 35,
                    left: '60%',
                    width: '80%',
                    height: 2,
                    bgcolor: 'primary.light',
                    '&::after': {
                      content: '"→"',
                      position: 'absolute',
                      right: -10,
                      top: -12,
                      fontSize: 20,
                      color: 'primary.main',
                    },
                  }}
                />
              )}

              {/* Step Title */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: 'primary.dark',
                  mb: 1,
                }}
              >
                {step.title}
              </Typography>

              {/* Step Description */}
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                {step.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ActivateForm;
