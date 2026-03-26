# 🎨 Стили дизайна - CodeShop

Этот проект поддерживает **три стиля дизайна** с возможностью переключения в реальном времени.

## 📋 Доступные стили

### 1. ☀️ Glass Light (Светлый Glassmorphism)
**Иконка:** ❄️

Классический glassmorphism в светлой теме:
- Светлый фон с градиентами
- Полупрозрачные белые карточки
- Мягкие тени
- Синие акценты

**CSS класс:** `glass-light`

---

### 2. 🌙 Glass Dark (Тёмный Glassmorphism)
**Иконка:** 🌙

Классический glassmorphism в тёмной теме:
- Тёмный фон (#0f0f23)
- Полупрозрачные тёмные карточки
- Контрастные светлые элементы
- Яркие синие акценты

**CSS класс:** `glass-dark`

---

### 3. 💧 Liquid Glass (Жидкое Стекло)
**Иконка:** 💧

Продвинутый glassmorphism с эффектами жидкости:
- Анимированный градиентный фон
- Усиленный blur (30px)
- Shimmer-эффект (плавающий блик)
- Morphing-анимация при hover
- Inset тени для объёма
- Неоновое свечение (в тёмной версии)

**CSS класс:** `liquid-glass`

### Особенности Liquid Glass:

#### Анимации:
- **liquid-shimmer** — плавающий градиентный блик
- **liquid-morph** — плавное изменение border-radius
- **liquid-ripple** — эффект ряби при клике
- **liquid-glow-pulse** — пульсирующее свечение

#### Визуальные эффекты:
- Более прозрачные поверхности (50-60%)
- Усиленная сатурация (150%)
- Внутренние тени (inset)
- Динамическое свечение

---

## 🔄 Переключение стилей

### В хедере (десктоп)
Три кнопки с иконками:
- ❄️ — Glass Light
- 🌙 — Glass Dark
- 💧 — Liquid Glass

### В мобильном меню
Расширенный toggle с подписями:
- Светлое
- Тёмное
- Liquid

### Программно
```typescript
import { useTheme } from './context/ThemeContext';

const { mode, setMode } = useTheme();

// Переключение
setMode('glass-light');
setMode('glass-dark');
setMode('liquid-glass');
```

---

## 🎯 Отличия стилей

| Характеристика | Glass Light/Dark | Liquid Glass |
|---------------|------------------|--------------|
| **Backdrop Filter** | blur(24px) | blur(30px) |
| **Прозрачность** | 70-85% | 30-60% |
| **Анимация фона** | Нет | Есть (shimmer) |
| **Hover эффект** | Scale + translateY | Morph + shimmer |
| **Transition** | 0.3s | 0.5s |
| **Border Radius** | 20px | 24px |
| **Тени** | Стандартные | + inset + glow |

---

## 🎨 CSS Переменные

### Liquid Glass (светлая версия):
```css
--glass-bg-light: rgba(255, 255, 255, 0.6);
--glass-blur: blur(30px) saturate(120%);
--liquid-glow: rgba(59, 130, 246, 0.5);
--accent-gradient: linear-gradient(135deg, #3b82f6, #8b5cf6, #1d4ed8);
```

### Liquid Glass (тёмная версия):
```css
--glass-bg-light: rgba(30, 30, 50, 0.5);
--glass-blur: blur(30px) saturate(150%);
--liquid-glow: rgba(100, 150, 255, 0.6);
--accent-gradient: linear-gradient(135deg, #60a5fa, #a78bfa, #3b82f6);
```

---

## ⚡ Производительность

Все анимации используют GPU-ускоренные свойства:
- `transform`
- `opacity`
- `filter`

Для переключения стилей добавлен класс `.theme-transitioning`, который обеспечивает плавный переход (0.5s) всех свойств.

---

## 📱 Адаптивность

- **Десктоп:** Компактный toggle group в хедере
- **Мобильный:** Развёрнутый toggle с подписями в меню
- **Планшет:** Автоматическая адаптация

---

## 🎯 Рекомендации по использованию

**Glass Light:** Для дневного использования, офисной среды
**Glass Dark:** Для вечернего использования, снижения нагрузки на глаза
**Liquid Glass:** Для вау-эффекта, презентаций, демонстраций

---

## 🔧 Технические детали

### Хранение выбора
Выбранный стиль сохраняется в `localStorage` (ключ: `themeMode`) и восстанавливается при следующей загрузке.

### Структура классов
```
body.glass-light → Светлый Glassmorphism
body.glass-dark → Тёмный Glassmorphism  
body.liquid-glass → Liquid Glass (адаптируется под data-theme)
```

### Совместимость
- Chrome 88+
- Firefox 87+
- Safari 14+
- Edge 88+
