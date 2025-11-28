# 🎨 Магічні анімації для полів форми
## Спецефекти для правильно заповнених полів

---

## 🌟 ВАРІАНТ 1: "Магічна хвиля" (РЕКОМЕНДОВАНИЙ)

### Ефект:
1. Золота хвиля пробігає по полю зліва направо
2. Поле підсвічується фіолетовим свіченням
3. З'являються 3-5 зірочок що розлітаються
4. Галочка з'являється з обертанням
5. Легка пульсація border

### Код компонента:

**Файл: `src/components/common/Input/MagicInput.jsx`**

```javascript
import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const MagicInput = ({ 
  value, 
  onChange, 
  onBlur,
  error, 
  helperText, 
  touched,
  isValid, // передаємо ззовні результат валідації
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showMagic, setShowMagic] = useState(false);
  const [stars, setStars] = useState([]);

  // Тригер магічного ефекту при валідації
  useEffect(() => {
    if (isValid && touched && !showMagic) {
      triggerMagicEffect();
    }
  }, [isValid, touched]);

  const triggerMagicEffect = () => {
    setShowMagic(true);

    // Генеруємо зірочки
    const newStars = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: 30 + Math.random() * 60, // % позиція
      delay: i * 0.1,
      angle: -45 + Math.random() * 90,
      distance: 40 + Math.random() * 40,
    }));
    
    setStars(newStars);

    // Очищаємо зірочки через 1 секунду
    setTimeout(() => {
      setStars([]);
    }, 1000);
  };

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
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          onFocus={() => setIsFocused(true)}
          error={touched && !!error}
          helperText={touched && helperText}
          fullWidth
          InputProps={{
            ...props.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <AnimatePresence>
                  {isValid && touched && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.3, 1],
                        rotate: [180, -10, 0],
                        opacity: 1,
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.6,
                        type: 'spring',
                        stiffness: 200,
                      }}
                    >
                      <CheckCircleIcon 
                        sx={{ 
                          color: 'success.main',
                          filter: 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.5))',
                        }} 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              height: 56,
              position: 'relative',
              overflow: 'visible',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              
              // Магічне свічення при успіху
              ...(showMagic && {
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(245, 158, 11, 0.2)',
                animation: 'magicPulse 2s ease-in-out',
              }),

              '&.Mui-focused': {
                boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)',
              },

              '&.Mui-error': {
                animation: error && touched ? 'shake 0.5s' : 'none',
              },
            },

            // Анімація пульсації
            '@keyframes magicPulse': {
              '0%, 100%': { 
                boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)',
              },
              '50%': { 
                boxShadow: '0 0 25px rgba(139, 92, 246, 0.6), 0 0 50px rgba(245, 158, 11, 0.3)',
              },
            },

            '@keyframes shake': {
              '0%, 100%': { transform: 'translateX(0)' },
              '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
              '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
            },
          }}
        />
      </motion.div>

      {/* Магічна хвиля */}
      <AnimatePresence>
        {showMagic && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ 
              x: '200%',
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 0.8,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.6), transparent)',
              filter: 'blur(10px)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        )}
      </AnimatePresence>

      {/* Зірочки що розлітаються */}
      <AnimatePresence>
        {stars.map(star => (
          <motion.div
            key={star.id}
            initial={{
              x: `${star.x}%`,
              y: '50%',
              scale: 0,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              x: `${star.x + Math.cos(star.angle * Math.PI / 180) * star.distance}%`,
              y: `${50 + Math.sin(star.angle * Math.PI / 180) * star.distance}%`,
              scale: [0, 1.5, 0],
              rotate: 360,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.8,
              delay: star.delay,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              fontSize: 16,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            ⭐
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Магічний пил (частинки) */}
      <AnimatePresence>
        {showMagic && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                initial={{
                  x: '50%',
                  y: '50%',
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.05,
                  ease: 'easeOut',
                }}
                style={{
                  position: 'absolute',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: i % 2 === 0 ? '#F59E0B' : '#8B5CF6',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default MagicInput;
```

---

## 🪄 ВАРІАНТ 2: "Магічна паличка"

### Ефект:
Магічна паличка "малює" зелену галочку поверх поля

**Файл: `src/components/common/Input/WandEffect.jsx`**

```javascript
import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

const WandEffect = ({ trigger }) => {
  if (!trigger) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'visible',
      }}
    >
      {/* Магічна паличка */}
      <motion.div
        initial={{ x: -50, y: -20, rotate: -45, opacity: 0 }}
        animate={{ 
          x: '100%',
          y: 0,
          rotate: 0,
          opacity: [0, 1, 1, 0],
        }}
        transition={{ 
          duration: 0.8,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          fontSize: 24,
          filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.8))',
        }}
      >
        🪄
      </motion.div>

      {/* Слід від палички */}
      <motion.div
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1,
          opacity: [0, 1, 0],
        }}
        transition={{ 
          duration: 1,
          delay: 0.2,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 60"
          style={{ position: 'absolute' }}
        >
          <motion.path
            d="M 10 30 Q 30 10, 50 30 T 90 30"
            stroke="#F59E0B"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.8))',
            }}
          />
        </svg>
      </motion.div>

      {/* Зірочки що з'являються по ходу палички */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            x: `${i * 20 + 10}%`,
            y: [0, -20, -40],
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.15,
          }}
          style={{
            position: 'absolute',
            fontSize: 12,
          }}
        >
          ✨
        </motion.div>
      ))}
    </Box>
  );
};

export default WandEffect;
```

---

## 🌈 ВАРІАНТ 3: "Райдужний блиск"

### Ефект:
Радіальний градієнт розширюється від центру з райдужними кольорами

```javascript
const RainbowGlowEffect = ({ trigger }) => {
  if (!trigger) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 2, 4],
        opacity: [0, 0.8, 0],
      }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,158,11,0.6) 0%, rgba(139,92,246,0.4) 50%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(15px)',
      }}
    />
  );
};
```

---

## ✨ ВАРІАНТ 4: "Конфетті зірочки" (найбільш святковий)

### Ефект:
Багато маленьких зірочок "вибухають" з поля

```javascript
const StarConfetti = ({ trigger }) => {
  if (!trigger) return null;

  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (360 / 12) * i;
        const distance = 60 + Math.random() * 40;
        
        return (
          <motion.div
            key={i}
            initial={{
              x: '50%',
              y: '50%',
              scale: 0,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              x: `${50 + Math.cos(angle * Math.PI / 180) * distance}%`,
              y: `${50 + Math.sin(angle * Math.PI / 180) * distance}%`,
              scale: [0, 1.5, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.2,
              delay: i * 0.03,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              fontSize: 12 + Math.random() * 8,
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            {i % 3 === 0 ? '⭐' : i % 3 === 1 ? '✨' : '🌟'}
          </motion.div>
        );
      })}
    </>
  );
};
```

---

## 🎯 РЕКОМЕНДАЦІЯ: Комбінований ефект

### Найкращий варіант - комбінація всіх ефектів з різною інтенсивністю:

**Файл: `src/components/common/Input/UltimateMagicInput.jsx`**

```javascript
import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const UltimateMagicInput = ({ 
  value, 
  onChange, 
  onBlur,
  error, 
  helperText, 
  touched,
  isValid,
  ...props 
}) => {
  const [showMagic, setShowMagic] = useState(false);
  const [effectPhase, setEffectPhase] = useState(0); // 0: idle, 1: wand, 2: stars, 3: complete

  useEffect(() => {
    if (isValid && touched && !showMagic) {
      playMagicSequence();
    }
  }, [isValid, touched]);

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
            ...props.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <AnimatePresence>
                  {isValid && touched && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ 
                        scale: [0, 1.4, 1],
                        rotate: [180, 360],
                      }}
                      transition={{ 
                        duration: 0.5,
                        delay: 0.8, // З'являється після ефектів
                      }}
                    >
                      <CheckCircleIcon 
                        sx={{ 
                          color: 'success.main',
                          filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.6))',
                        }} 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              height: 56,
              transition: 'all 0.3s',
              
              ...(showMagic && {
                animation: 'magicGlow 1.5s ease-in-out',
              }),

              '@keyframes magicGlow': {
                '0%': { 
                  boxShadow: '0 0 0 rgba(139, 92, 246, 0)',
                },
                '50%': { 
                  boxShadow: '0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(245, 158, 11, 0.3)',
                  borderColor: '#F59E0B',
                },
                '100%': { 
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)',
                  borderColor: '#10B981',
                },
              },
            },
          }}
        />
      </motion.div>

      {/* ЕФЕКТ 1: Золота хвиля */}
      <AnimatePresence>
        {effectPhase === 1 && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ 
              x: '150%',
              opacity: [0, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '40%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.7), transparent)',
              filter: 'blur(8px)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        )}
      </AnimatePresence>

      {/* ЕФЕКТ 2: Зірочки конфетті */}
      <AnimatePresence>
        {effectPhase === 2 && (
          <>
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (360 / 8) * i;
              const distance = 50;
              
              return (
                <motion.div
                  key={i}
                  initial={{
                    x: '90%',
                    y: '50%',
                    scale: 0,
                    rotate: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: `${90 + Math.cos(angle * Math.PI / 180) * distance}%`,
                    y: `${50 + Math.sin(angle * Math.PI / 180) * distance}%`,
                    scale: [0, 1.5, 0.8, 0],
                    rotate: 360,
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.05,
                  }}
                  style={{
                    position: 'absolute',
                    fontSize: 14,
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                >
                  {i % 2 === 0 ? '⭐' : '✨'}
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* ЕФЕКТ 3: Магічний пил */}
      <AnimatePresence>
        {effectPhase >= 2 && (
          <>
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: '50%',
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.03,
                }}
                style={{
                  position: 'absolute',
                  width: 3,
                  height: 3,
                  borderRadius: '50%',
                  background: ['#F59E0B', '#8B5CF6', '#10B981'][i % 3],
                  pointerEvents: 'none',
                  zIndex: 1,
                  filter: 'blur(0.5px)',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* ЕФЕКТ 4: Фінальне свічення */}
      <AnimatePresence>
        {effectPhase === 3 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.5, 2],
              opacity: [0, 0.6, 0],
            }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute',
              top: '50%',
              right: 0,
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              zIndex: 0,
              filter: 'blur(20px)',
            }}
          />
        )}
      </AnimatePresence>
    </Box>
  );
};

export default UltimateMagicInput;
```

---

## 📊 ПОРІВНЯННЯ ВАРІАНТІВ

| Варіант | Інтенсивність | Performance | Чарівність | Рекомендація |
|---------|---------------|-------------|------------|--------------|
| Магічна хвиля | ⭐⭐⭐ | ✅✅✅ | ⭐⭐⭐⭐ | **Best** |
| Магічна паличка | ⭐⭐⭐⭐ | ✅✅ | ⭐⭐⭐⭐⭐ | Для особливих полів |
| Райдужний блиск | ⭐⭐ | ✅✅✅ | ⭐⭐⭐ | Мінімалістичний |
| Конфетті зірочки | ⭐⭐⭐⭐⭐ | ✅✅ | ⭐⭐⭐⭐⭐ | Для фінальної кнопки |
| Комбінований | ⭐⭐⭐⭐ | ✅✅ | ⭐⭐⭐⭐⭐ | **Recommended** |

---

## 🎯 МОЯ РЕКОМЕНДАЦІЯ

Використовуйте **Комбінований ефект** (`UltimateMagicInput`) для:
- Поля телефону ✅
- Поля email ✅
- Коду сертифікату ✅

Використовуйте **простішу Магічну хвилю** (`MagicInput`) для:
- Номеру сертифікату
- Інших другорядних полів

**Чому саме так?**
1. 🎭 Драматичний, але не надто
2. ⚡ Добрий performance
3. ✨ Справжнє відчуття магії
4. 📱 Працює на мобільних
5. ♿ Не заважає accessibility

Який варіант вам найбільше подобається? Можу адаптувати або створити щось унікальне! 🪄✨
