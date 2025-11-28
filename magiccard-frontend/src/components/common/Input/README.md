# 🪄 Магічні Input компоненти

Цей каталог містить компоненти полів вводу з магічними анімаційними ефектами для форм MagicCard.

---

## 📦 Доступні компоненти

### 1. **MagicInput** - Базовий магічний input
**Файл:** `MagicInput.jsx`

**Призначення:** Використовується для другорядних полів, де потрібні прості але ефектні анімації.

**Ефекти:**
- ✨ Золота хвиля пробігає по полю зліва направо
- ⭐ 5 зірочок розлітаються радіально
- 💫 8 частинок магічного пилу
- 🟣 Фіолетове пульсуюче свічення
- ✅ Анімована галочка з обертанням

**Коли використовувати:**
- Поля коду активації
- Додаткові поля в формах
- Поля з низьким пріоритетом

**Приклад використання:**
```jsx
import MagicInput from './MagicInput';

<MagicInput
  value={value}
  onChange={handleChange}
  onBlur={handleBlur}
  error={error}
  helperText={helperText}
  touched={touched}
  isValid={isValidFunction(value)}
  label="Код активації *"
  placeholder="Введіть код"
/>
```

---

### 2. **UltimateMagicInput** - Розширений магічний input
**Файл:** `UltimateMagicInput.jsx`

**Призначення:** Використовується для важливих полів, де потрібен максимальний WOW-ефект.

**Ефекти (4 фази):**
1. **Фаза 1 (0.3s):** Золота хвиля пробігає полем
2. **Фаза 2 (0.6s):** 8 зірочок вибухають конфетті
3. **Фаза 3 (0.6s):** 15 частинок магічного пилу (золото, фіолетовий, зелений)
4. **Фаза 4 (0.8s):** Фінальне зелене свічення + галочка

**Коли використовувати:**
- Поле телефону ✅
- Поле email ✅
- Критично важливі поля

**Приклад використання:**
```jsx
import UltimateMagicInput from './UltimateMagicInput';

<UltimateMagicInput
  value={value}
  onChange={handleChange}
  onBlur={handleBlur}
  error={error}
  helperText={helperText}
  touched={touched}
  isValid={isValidFunction(value)}
  label="Телефон *"
  placeholder="+380XXXXXXXXX"
  InputProps={{
    startAdornment: <Icon />
  }}
/>
```

---

### 3. **PhoneInput** - Поле для телефону
**Файл:** `PhoneInput.jsx`

**Призначення:** Спеціалізоване поле для українських номерів телефону.

**Особливості:**
- Автоматичне форматування: `+380XXXXXXXXX`
- Автоматично додає префікс `+380`
- Валідація по паттерну (9 цифр після +380)
- Використовує `UltimateMagicInput` для ефектів
- Анімована іконка телефону

**Приклад використання:**
```jsx
import PhoneInput from './PhoneInput';

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
```

---

### 4. **EmailInput** - Поле для email
**Файл:** `EmailInput.jsx`

**Призначення:** Спеціалізоване поле для email адрес.

**Особливості:**
- Валідація email формату
- Використовує `UltimateMagicInput` для ефектів
- Анімована іконка email
- Може бути optional (необов'язкове)

**Приклад використання:**
```jsx
import EmailInput from './EmailInput';

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
```

---

### 5. **CertificateInput** - Поле для номеру сертифікату
**Файл:** `CertificateInput.jsx`

**Призначення:** Спеціалізоване поле для вводу номерів сертифікатів.

**Особливості:**
- Автоматичне форматування: `XXXX-XXXX-XXXX`
- Тільки цифри (12 символів)
- Monospace шрифт для кращої читабельності
- Використовує `MagicInput` (простіші ефекти)
- Анімована іконка сертифікату

**Приклад використання:**
```jsx
import CertificateInput from './CertificateInput';

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
```

---

## 🎨 Рекомендації по використанню

### Вибір між MagicInput та UltimateMagicInput

| Ситуація | Компонент |
|----------|-----------|
| Поле телефону | `UltimateMagicInput` ✅ |
| Поле email | `UltimateMagicInput` ✅ |
| Номер сертифікату | `MagicInput` |
| Код активації | `MagicInput` |
| Звичайні текстові поля | `MagicInput` |
| Критично важливі поля | `UltimateMagicInput` |

### Анімації - кращі практики

1. **Performance:**
   - Всі анімації використовують CSS `transform` та `opacity` (GPU-прискорені)
   - Не впливають на reflow/repaint
   - Оптимізовані для мобільних пристроїв

2. **Accessibility:**
   - Анімації тригеряться тільки на успішну валідацію
   - Не блокують взаємодію з формою
   - Не заважають screen readers

3. **UX:**
   - Анімації короткі (0.3-0.8s) - не набридають
   - Тригеряться один раз після валідації
   - Дають чіткий feedback про успішність

---

## 🔧 Технічні деталі

### Параметри (Props)

Всі компоненти приймають стандартні MUI TextField props + додаткові:

```typescript
interface MagicInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: (e: FocusEvent) => void;
  error?: boolean;
  helperText?: string;
  touched?: boolean;
  isValid: boolean;  // ⚠️ ОБОВ'ЯЗКОВИЙ для тригеру магії
  label?: string;
  placeholder?: string;
  required?: boolean;
  InputProps?: object;  // Додаткові InputProps (startAdornment, etc.)
}
```

### ⚠️ Важливо про `isValid`

Параметр `isValid` відповідає за тригер магічних ефектів:
- Має бути `true` коли поле валідне
- Має бути `false` коли поле невалідне або порожнє
- Перевіряється разом з `touched` (ефект спрацьовує тільки якщо обидва `true`)

**Приклад логіки:**
```jsx
// Для PhoneInput
const isValid = value && VALIDATION_PATTERNS.PHONE.test(value);

// Для EmailInput
const isValid = touched && !error && value && value.length > 0;

// Для CertificateInput
const isValid = value && /^\d{4}-?\d{4}-?\d{4}$/.test(value);

// Для довільного поля
const isValid = touched && !errors.fieldName && value?.length >= minLength;
```

---

## 📱 Mobile-First підхід

Всі компоненти оптимізовані для мобільних:
- Touch-friendly (height: 56px)
- Responsive анімації
- Швидкий feedback
- Не блокують скрол

---

## 🎯 Приклади інтеграції

### BuyForm (Форма купівлі)
```jsx
import PhoneInput from '../../common/Input/PhoneInput';
import EmailInput from '../../common/Input/EmailInput';

// Телефон - UltimateMagicInput через PhoneInput
<PhoneInput
  value={field.value}
  onChange={field.onChange}
  onBlur={field.onBlur}
  error={!!errors.phone}
  helperText={errors.phone?.message}
  touched={touchedFields.phone}
  required
/>

// Email - UltimateMagicInput через EmailInput
<EmailInput
  value={field.value}
  onChange={field.onChange}
  onBlur={field.onBlur}
  error={!!errors.email}
  helperText={errors.email?.message}
  touched={touchedFields.email}
/>
```

### ActivateForm (Форма активації)
```jsx
import CertificateInput from '../../common/Input/CertificateInput';
import MagicInput from '../../common/Input/MagicInput';
import PhoneInput from '../../common/Input/PhoneInput';

// Номер сертифікату - MagicInput через CertificateInput
<CertificateInput
  value={field.value}
  onChange={field.onChange}
  onBlur={field.onBlur}
  error={!!errors.certificateNumber}
  helperText={errors.certificateNumber?.message}
  touched={touchedFields.certificateNumber}
  required
/>

// Код активації - базовий MagicInput
<MagicInput
  value={field.value}
  onChange={field.onChange}
  onBlur={field.onBlur}
  error={!!errors.activationCode}
  helperText={errors.activationCode?.message}
  touched={touchedFields.activationCode}
  isValid={touched && !errors.activationCode && value?.length >= 4}
  label="Код активації *"
/>

// Телефон - UltimateMagicInput через PhoneInput
<PhoneInput ... />
```

---

## 🐛 Troubleshooting

### Анімації не спрацьовують
- ✅ Перевірте що передаєте `isValid={true}` коли поле валідне
- ✅ Перевірте що передаєте `touched={true}` після onBlur
- ✅ Перевірте console на помилки

### Анімації лагають
- ✅ Перевірте що не використовуєте надто багато компонентів одночасно
- ✅ Перевірте performance на реальному пристрої (не тільки DevTools)
- ✅ Використовуйте `MagicInput` замість `UltimateMagicInput` для другорядних полів

### Компонент не приймає InputProps
- ✅ Використовуйте spread: `InputProps={{ ...yourProps }}`
- ✅ Для `startAdornment` та `endAdornment` - передавайте в `InputProps`

---

## 📚 Додаткова інформація

Детальні специфікації анімацій та ефектів дивіться у файлі:
[MagicInput_Effects.md](/MagicInput_Effects.md)

---

**Створено для проєкту MagicCard.com.ua** 🎴✨
