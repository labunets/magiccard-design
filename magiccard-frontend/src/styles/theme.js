import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B5CF6',      // Магічний фіолетовий
      dark: '#6D28D9',      // Темний фіолетовий
      light: '#DDD6FE',     // Світлий фіолетовий
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F59E0B',      // Золотий акцент
      dark: '#D97706',      // Темне золото
      light: '#FEF3C7',     // Світле золото
      contrastText: '#1F2937',
    },
    success: {
      main: '#10B981',
      light: '#D1FAE5',
    },
    error: {
      main: '#EF4444',
      light: '#FEE2E2',
    },
    info: {
      main: '#3B82F6',
      light: '#DBEAFE',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F9FAFB',
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
    },
  },
  typography: {
    fontFamily: '"Nunito", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.2,
      '@media (min-width:768px)': {
        fontSize: '36px',
      },
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 1.3,
      '@media (min-width:768px)': {
        fontSize: '32px',
      },
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '16px',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '14px',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '16px',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8, // 1 unit = 8px
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '16px 24px',
          fontSize: '16px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(139, 92, 246, 0.2)',
          },
        },
        sizeLarge: {
          height: '56px',
          fontSize: '16px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export default theme;
