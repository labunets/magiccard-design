# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**MagicCard.com.ua** - A gift certificate platform with a magical, Disney-inspired UI/UX design.

This repository contains comprehensive design documentation for developing a React frontend application for buying and activating gift certificates. The project emphasizes:
- "Magical transformation" theme (certificates → gifts)
- Mobile-first, minimalist design with delightful animations
- Purple (#8B5CF6) and gold (#F59E0B) color palette
- Animation-on-interaction philosophy (NO scroll-triggered animations)

**Target Audience:** Women aged 18-45 who give gifts
**Experience Level:** 10 years in UI/UX design

**IMPORTANT: Primary Language is Ukrainian (Українська)**
- All UI text must be in Ukrainian
- Form labels, buttons, error messages - Ukrainian
- Content, instructions, tooltips - Ukrainian
- Only technical code (variables, functions) in English

---

## Repository Structure

This is a **design documentation repository**, not a code repository. It contains:

- [MagicCard_Design_Concept.md](MagicCard_Design_Concept.md) - Complete design specification including:
  - Visual language and color palette
  - Detailed screen layouts and specifications
  - Animation specifications and timing
  - Component specifications (buttons, inputs, cards, modals)
  - UX principles and user flows
  - Technical recommendations

- [MagicCard_Development_Guide.md](MagicCard_Development_Guide.md) - Technical implementation guide with:
  - Full project architecture and folder structure
  - Complete React component code examples
  - Form implementations (Buy form, Activate form with 2 steps)
  - Animation hooks and implementations
  - Material-UI theme configuration
  - Validation schemas using Yup
  - Best practices and development checklist

---

## Key Design Principles

### Visual & Animation Philosophy

1. **Animation Triggers:** ONLY on user interaction (tap/click), NEVER on scroll
2. **Magic Elements:** Gold star animations (⭐) appear on every interaction
3. **Timing:** Fast animations (200-500ms) to avoid boredom
4. **Performance:** Use CSS transforms and opacity (GPU-accelerated)
5. **Easing:** Natural curves (ease-out for appearance, ease-in for disappearance)

### Design System

**Colors:**
- Primary Purple: `#8B5CF6` (main actions)
- Dark Purple: `#6D28D9` (text/accents)
- Light Purple: `#DDD6FE` (backgrounds)
- Gold Accent: `#F59E0B` (magic stars/highlights)
- Success: `#10B981`, Error: `#EF4444`, Info: `#3B82F6`

**Typography:**
- Headers: 'Nunito' (rounded, friendly, fairytale-like)
- Body: 'Inter' (readable, modern)
- Mobile sizes: H1: 28px, H2: 24px, H3: 20px, Body: 16px

**Components:**
- Border radius: 12px (buttons/inputs), 16px (cards), 20px (modals)
- Input height: 56px
- Button height: 56px (large)
- Spacing unit: 8px

---

## Technical Stack (Recommended)

### Frontend Framework
- **React 18.2+** with functional components and hooks
- **Material-UI (MUI) 5.14+** - UI component library with customizable theme
- **Framer Motion 10.16+** - Complex animations and transitions
- **React Hook Form 7.45+** - Form state management
- **Yup 1.2+** - Schema validation
- **Axios 1.4+** - API requests
- **React Router DOM 6.15+** - Navigation (if multi-page)

### Project Setup Commands

```bash
# Create React app
npx create-react-app magiccard-frontend
cd magiccard-frontend

# Install dependencies
npm install @mui/material @emotion/react @emotion/styled
npm install framer-motion
npm install react-hook-form
npm install yup @hookform/resolvers
npm install axios
npm install react-router-dom
```

---

## Architecture Overview

### Folder Structure

```
magiccard-frontend/
├── src/
│   ├── components/
│   │   ├── common/              # Reusable UI components
│   │   │   ├── Button/          # Animated buttons
│   │   │   ├── Input/           # PhoneInput, EmailInput
│   │   │   ├── Card/            # Card components
│   │   │   └── Stars/           # Star animation component
│   │   ├── forms/               # Form components
│   │   │   ├── BuyForm/         # Certificate purchase form
│   │   │   │   ├── BuyForm.jsx
│   │   │   │   └── AmountSelector.jsx
│   │   │   └── ActivateForm/    # Certificate activation (2-step)
│   │   │       ├── ActivateForm.jsx
│   │   │       ├── Step1Verify.jsx
│   │   │       ├── Step2Select.jsx
│   │   │       ├── PartnerCarousel.jsx
│   │   │       └── CertificateInput.jsx
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── FloatingNav.jsx  # Sticky navigation tabs
│   │   │   └── Footer.jsx
│   │   └── infographic/         # Info graphics
│   │       ├── HowItWorks.jsx
│   │       └── MagicTransform.jsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── useFormValidation.js
│   │   ├── useLocalStorage.js
│   │   ├── useStarAnimation.js  # Star particles animation
│   │   └── useMagicTransform.js # Certificate→gift transformation
│   ├── utils/
│   │   ├── validation.js        # Validation helpers
│   │   ├── animations.js        # Animation utilities
│   │   └── constants.js         # Colors, spacing, breakpoints
│   ├── styles/
│   │   ├── theme.js             # MUI theme configuration
│   │   ├── animations.css       # CSS keyframe animations
│   │   └── global.css
│   └── App.jsx
```

### Key Components

#### 1. BuyForm (Purchase Certificate)
- **AmountSelector**: Grid of amount cards (100-10000 UAH) with star animations on select
- **PhoneInput**: Auto-formats to +380XXXXXXXXX, animated validation icons
- **EmailInput**: Optional field with real-time validation
- **Features**:
  - Yup validation schema
  - React Hook Form for state management
  - Stars burst animation on amount selection
  - Animated submit button with Monobank payment redirect

#### 2. ActivateForm (2-Step Wizard)
- **Step1Verify**:
  - Dynamic certificate input fields (up to 10 certificates)
  - Format: XXXX-XXXX-XXXX (auto-formatted)
  - Verification results with success/error indicators
  - Total amount calculation
- **Step2Select**:
  - Partner carousel (horizontal scroll, animated selection)
  - Dynamic card selection based on available balance
  - Real-time balance tracking (Available/Selected/Remaining)
  - Instructions panel for selected partner
- **Features**:
  - Animated step transitions (slide + fade)
  - Stepper component showing progress
  - Field array management with React Hook Form

#### 3. Custom Hooks

**useStarAnimation**
```javascript
// Creates burst of gold star particles
const { triggerStars, StarsContainer } = useStarAnimation();
triggerStars(x, y, count); // x,y = position, count = number of stars
// Stars radially disperse, rotate 360°, and fade out in 0.6-0.8s
```

**useMagicTransform**
```javascript
// Multi-phase transformation animation
const { playAnimation, phase } = useMagicTransform();
// Phases: idle → pulsing → swirling → transforming → complete
// Certificate visually transforms into a gift with star swirl
```

---

## Form Validation Patterns

### Phone Validation
- Format: `+380` followed by 9 digits
- Auto-prefixes `+380` if empty
- Strips non-digits and formats as XXXX-XXX-XXXX
- Yup schema: `.matches(/^\+380\d{9}$/, 'Format: +380XXXXXXXXX')`

### Certificate Number Validation
- Format: XXXX-XXXX-XXXX (12 digits total)
- Auto-formatting with dashes every 4 digits
- Monospace font for better readability
- Pattern: `/^\d{4}-?\d{4}-?\d{4}$/`

### Email Validation
- Standard email format
- Optional field (not required for purchase)
- Yup schema: `.email('Invalid email').notRequired()`

---

## Animation Guidelines

### Star Animation Specification

**When to trigger:**
- On amount selection in BuyForm
- On partner selection in ActivateForm
- On button clicks (submit, continue)
- On tab switches
- On successful form completion

**Parameters:**
```javascript
{
  count: 5-7,              // Number of stars
  size: 12-24px,           // Random size range
  color: '#F59E0B',        // Gold
  duration: 0.6-0.8s,      // Animation length
  distance: 50-150px,      // Travel distance
  rotation: 360°           // Full rotation
}
```

### Magic Transformation Animation

**Phases & Timing:**
1. **Pulsing** (0.5s): Certificate scales 1 → 1.15 → 1
2. **Swirling** (0.8s): 12 stars spiral around certificate, blur + fade
3. **Transforming** (0.6s): Certificate disappears, gift appears from center
4. **Complete** (0.5s): Gift glows with golden radial gradient

**Usage:** In "How It Works" infographic, triggered on step interaction

### Component Animation States

**Button States:**
- Hover: `scale(1.02)`, gold shadow
- Active/Click: `scale(0.98)`, star burst
- Disabled: No animations, gray colors
- Loading: Rotating star icon + "Redirecting..." text

**Input States:**
- Focus: Purple border, box-shadow glow, icon wiggle
- Error: Shake animation, red border, error text slide-down
- Success: Green border, checkmark icon with scale-in animation

**Card Selection:**
- Hover: `scale(1.05)`, lifted shadow
- Selected: Purple border, light purple bg, star badge top-right
- Disabled: `opacity(0.3)`, grayscale

---

## Material-UI Theme Configuration

The [MagicCard_Development_Guide.md](MagicCard_Development_Guide.md) contains the complete MUI theme in `src/styles/theme.js`.

**Key customizations:**
- Custom color palette (purple/gold)
- Typography with Nunito/Inter fonts and responsive sizes
- Component overrides for Button, TextField, Card
- Border radius: 12px globally
- Spacing unit: 8px (use theme.spacing(n))

**Usage:**
```javascript
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
```

---

## Development Workflow

### Phase 1: Base Setup (1-2 hours)
- Create React app
- Install dependencies (MUI, Framer Motion, React Hook Form, Yup)
- Configure MUI theme
- Set up folder structure
- Configure routing if needed

### Phase 2: UI Components (3-4 hours)
- Create Button with animations
- Create PhoneInput with formatting
- Create EmailInput with validation
- Create CertificateInput with formatting
- Create Toast notification component
- Create Stars animation hook + component

### Phase 3: BuyForm (4-5 hours)
- Build AmountSelector grid
- Integrate React Hook Form
- Add Yup validation
- Implement amount selection animations
- Add button animations
- Test edge cases

### Phase 4: ActivateForm (6-8 hours)
- Build Step1Verify with dynamic fields
- Implement certificate verification logic
- Build Step2Select
- Create PartnerCarousel
- Add card selection logic
- Implement step transitions with animations

### Phase 5: Animations & Effects (4-5 hours)
- Implement useStarAnimation hook
- Implement MagicTransform component
- Add ripple effects to buttons
- Add golden glow effects
- Add shake animation for errors
- Optimize animation performance

### Phase 6: Integration & Testing (3-4 hours)
- Connect forms to API (mock endpoints)
- Add error handling
- Add loading states
- Test on multiple devices
- Test accessibility
- Performance testing

### Phase 7: Polish (2-3 hours)
- Final animation tweaks
- Bundle size optimization
- Code review
- Documentation

---

## Important Implementation Notes

### Language Requirements
**All user-facing text MUST be in Ukrainian:**
- Button labels: "Оплатити", "Перевірити", "Додати ще сертифікат"
- Form labels: "Телефон", "Email", "Номер сертифікату"
- Error messages: "Обов'язкове поле", "Невірний формат"
- Success messages: "Сертифікат успішно куплено!"
- Placeholders: "+380XXXXXXXXX", "XXXX-XXXX-XXXX"
- Instructions and help text in Ukrainian

**Code can be in English:**
- Component names: `BuyForm`, `AmountSelector`
- Variable names: `isSubmitting`, `totalAmount`
- Function names: `handleSubmit`, `triggerStars`
- Comments can be in English or Ukrainian

### Form State Management
- Use React Hook Form's `useForm` and `Controller` for all forms
- Validation mode: `onBlur` (validate when field loses focus)
- Use `useFieldArray` for dynamic certificate inputs in Step1
- Store form state in localStorage for persistence (FloatingNav tab selection)

### Animation Performance
- Use CSS `transform` and `opacity` only (GPU-accelerated)
- Avoid animating `margin`, `padding`, `width`, `height` (causes reflow)
- Use `will-change` CSS property sparingly for complex animations
- Clean up animations in useEffect return functions
- Use `React.memo` for expensive components

### Accessibility Requirements
- All interactive elements need `aria-label` attributes
- Support keyboard navigation (Tab, Enter, Escape)
- Use proper semantic HTML (`<form>`, `<button>`, not `<div onClick>`)
- Respect `prefers-reduced-motion` media query
- Error messages must be announced to screen readers

### Mobile-First Approach
- Design for 320px width first
- Use MUI breakpoints: `theme.breakpoints.up('sm')` for tablet
- Touch targets: minimum 44x44px
- Test on real iOS and Android devices
- Optimize images and bundle size

---

## Common Patterns

### Creating an Animated Component
```javascript
import { motion } from 'framer-motion';
import { useStarAnimation } from '../../hooks/useStarAnimation';

const AnimatedCard = ({ onClick, children }) => {
  const { triggerStars, StarsContainer } = useStarAnimation();

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerStars(rect.left + rect.width/2, rect.top + rect.height/2, 5);
    onClick?.(e);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        {children}
      </motion.div>
      <StarsContainer />
    </>
  );
};
```

### Form with Validation
```javascript
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  phone: yup.string()
    .required('Phone is required')
    .matches(/^\+380\d{9}$/, 'Format: +380XXXXXXXXX'),
});

const MyForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <PhoneInput
            {...field}
            error={errors.phone}
            helperText={errors.phone?.message}
          />
        )}
      />
    </form>
  );
};
```

---

## Testing Strategy

### Unit Tests
- Test validation functions (phone, email, certificate format)
- Test form submission logic
- Test animation trigger conditions
- Test localStorage utilities

### Integration Tests
- Full form submission flows (BuyForm, ActivateForm)
- Tab switching and state persistence
- Multi-step form navigation
- Error handling scenarios

### E2E Tests (Recommended: Cypress)
- Complete purchase flow
- Complete activation flow (both steps)
- Form validation error states
- Responsive behavior on mobile/tablet/desktop

---

## API Integration Points

### Backend Endpoints (To Be Implemented)

**Purchase Certificate:**
```javascript
POST /api/buy
Body: { amount: number, phone: string, email?: string }
Response: { paymentUrl: string, certificateId: string }
```

**Verify Certificates:**
```javascript
POST /api/verify-certificates
Body: { certificates: [{ number: string, code: string }] }
Response: {
  certificates: [{ number: string, isValid: boolean, amount: number }],
  totalAmount: number
}
```

**Activate Certificates:**
```javascript
POST /api/activate
Body: {
  certificates: string[],
  partnerId: string,
  cards: [{ amount: number }],
  phone: string,
  email?: string
}
Response: { success: boolean, cards: [{ code: string, amount: number }] }
```

---

## Troubleshooting

### Common Issues

**Stars not appearing:**
- Ensure `StarsContainer` is rendered in the component
- Check z-index (should be 9999)
- Verify `triggerStars` is called with correct x, y coordinates

**Forms not validating:**
- Check Yup schema matches field names
- Ensure `mode: 'onBlur'` is set in useForm
- Verify `touched` state is being checked before showing errors

**Animations laggy on mobile:**
- Use `transform` and `opacity` only
- Reduce number of simultaneous animations
- Add `will-change` to animated elements
- Test on actual devices, not just browser DevTools

**MUI theme not applying:**
- Ensure `ThemeProvider` wraps entire app
- Import theme correctly: `import theme from './styles/theme'`
- Check for CSS specificity conflicts

---

## Resources

### Documentation Files
- [MagicCard_Design_Concept.md](MagicCard_Design_Concept.md) - Full design specification
- [MagicCard_Development_Guide.md](MagicCard_Development_Guide.md) - Complete code examples

### External Documentation
- [Material-UI Documentation](https://mui.com)
- [Framer Motion API](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com)
- [Yup Validation](https://github.com/jquense/yup)

---

## Summary

This is a **design specification repository** for MagicCard.com.ua, a gift certificate platform. The documentation provides:

1. **Complete visual design** - colors, typography, spacing, components
2. **Detailed component specifications** - exact measurements, states, animations
3. **Full React implementation examples** - ready-to-use code for all major components
4. **Animation specifications** - timing, easing, trigger conditions
5. **Development workflow** - phase-by-phase implementation guide

When implementing features, always refer to the detailed specifications in the two markdown files. The design emphasizes magical, delightful interactions through star animations and smooth transitions, while maintaining simplicity and usability.

**Key principle:** Every user interaction should feel magical but remain fast and intuitive. Animations enhance the experience but never slow it down.
