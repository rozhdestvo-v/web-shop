# CodeShop - Web Shop for IT Products

## 📋 Project Overview

**CodeShop** is a modern e-commerce web application designed for IT professionals, featuring a premium glassmorphism design with three interchangeable visual styles. Built with React, TypeScript, and Material UI, it offers a complete shopping experience with product catalog, cart management, and responsive design.

### Key Features

- **Two Design Styles**: Light and Dark (with real-time switching)
- **Glassmorphism UI**: Premium translucent design with blur effects and smooth animations
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Product Catalog**: 12 IT products across 7 categories (keyboards, mice, chairs, etc.)
- **Shopping Cart**: Full cart management with localStorage persistence
- **Product Details**: Detailed product pages with specifications and reviews
- **Favorites**: Save and manage favorite products
- **Theme Persistence**: User preferences saved to localStorage

### Tech Stack

| Category       | Technology                             |
| -------------- | -------------------------------------- |
| **Framework**  | React 19.2.4                           |
| **Language**   | TypeScript 4.9.5                       |
| **UI Library** | Material UI 7.3.9                      |
| **Routing**    | React Router DOM 7.13.2                |
| **Styling**    | CSS3 with CSS Variables                |
| **Build Tool** | Create React App (react-scripts 5.0.1) |
| **Deployment** | Vercel                                 |

---

## 🏗️ Project Structure

```
web-shop/
├── public/                 # Static assets
│   ├── index.html         # HTML template
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Footer/        # Site footer with navigation
│   │   ├── GlassButton/   # Glassmorphism button component
│   │   ├── GlassCard/     # Glassmorphism card component
│   │   ├── GlassInput/    # Glassmorphism input component
│   │   ├── Header/        # Site header with navigation & style switcher
│   │   └── ProductCard/   # Product card component
│   ├── context/           # React Context providers
│   │   ├── CartContext.tsx    # Shopping cart state management
│   │   └── ThemeContext.tsx   # Theme/style switching management
│   ├── data/              # Static data
│   │   └── products.ts    # Product catalog (12 items)
│   ├── pages/             # Page components
│   │   ├── CartPage/      # Shopping cart page
│   │   ├── CatalogPage/   # Product catalog with filters
│   │   ├── HomePage/      # Landing page with hero section
│   │   └── ProductPage/   # Individual product detail page
│   ├── App.tsx            # Main application component
│   ├── App.css            # App-specific styles
│   ├── index.tsx          # Application entry point
│   └── index.css          # Global styles & CSS variables
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vercel.json            # Vercel deployment configuration
├── DEPLOY.md              # Deployment instructions
└── DESIGN-STYLES.md       # Design system documentation
```

---

## 🚀 Building and Running

### Prerequisites

- Node.js 16+ and npm/yarn
- Modern web browser with CSS backdrop-filter support

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `build/` directory.

### Testing

```bash
npm test
```

Launches the test runner in interactive watch mode.

### Deployment

```bash
npm run deploy
# or
vercel --prod
```

Deploys to Vercel (requires Vercel CLI and authentication).

---

## 🎨 Design System

### Available Styles

The application supports two design styles, switchable via the header toggle:

| Style     | Icon | Description                              |
| --------- | ---- | ---------------------------------------- |
| **Light** | ☀️   | Light theme with white translucent cards |
| **Dark**  | 🌙   | Dark theme with dark translucent cards   |

### CSS Architecture

The design system uses CSS custom properties (variables) for theming:

```css
/* Example variables */
--glass-bg-light: rgba(255, 255, 255, 0.85);
--glass-blur: blur(24px) saturate(180%);
--accent-primary: #3b82f6;
--accent-gradient: linear-gradient(135deg, #3b82f6, #1d4ed8);
```

### Key Design Features

- **Backdrop Filter**: blur(24px)
- **Animations**: GPU-accelerated (transform, opacity, filter)
- **Transitions**: 0.3s ease
- **Accessibility**: WCAG AA/AAA contrast compliance

---

## 📦 Core Components

### Context Providers

#### ThemeContext

Manages theme switching:

```typescript
const { mode, toggleTheme } = useTheme();
// mode: 'light' | 'dark'
```

#### CartContext

Manages shopping cart state:

```typescript
const { items, addToCart, removeFromCart, getTotalPrice } = useCart();
```

#### FavoritesContext

Manages favorite products:

```typescript
const { favorites, toggleFavorite, isFavorite } = useFavorites();
```

### UI Components

| Component     | Description                           |
| ------------- | ------------------------------------- |
| `GlassCard`   | Glassmorphism card with hover effects |
| `GlassButton` | Gradient button with glow effects     |
| `GlassInput`  | Styled input with glass background    |
| `Header`      | Navigation with theme switcher        |
| `Footer`      | Compact footer with social links      |
| `ProductCard` | Product display with add-to-cart      |

---

## 🛣️ Routing

| Route          | Component   | Description                                  |
| -------------- | ----------- | -------------------------------------------- |
| `/`            | HomePage    | Landing page with hero and featured products |
| `/catalog`     | CatalogPage | Full product catalog with filters            |
| `/cart`        | CartPage    | Shopping cart with checkout                  |
| `/product/:id` | ProductPage | Product details with tabs                    |
| `/profile`     | ProfilePage | User profile with favorites                  |

---

## 📊 Data Model

### Product Interface

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  rating?: number;
  description?: string;
}
```

### Categories

- Коврики (Mousepads)
- Клавиатуры (Keyboards)
- Мышки (Mice)
- Кресла (Chairs)
- Антистресс (Stress Relief)
- Подставки (Stands)

---

## 🔧 Development Conventions

### TypeScript

- Strict mode enabled
- ES5 target for compatibility
- Module resolution: node

### Code Style

- Functional components with hooks
- TypeScript for type safety
- MUI for consistent UI components
- CSS-in-JS via MUI sx prop

### Testing Practices

- React Testing Library for component tests
- Jest as test runner
- Tests located alongside components (\*.test.tsx)

### File Naming

- PascalCase for components (ProductCard.tsx)
- camelCase for utilities
- kebab-case for CSS files

---

## 🌐 Browser Support

| Browser | Version |
| ------- | ------- |
| Chrome  | 88+     |
| Firefox | 87+     |
| Safari  | 14+     |
| Edge    | 88+     |

**Required CSS Features:**

- `backdrop-filter`
- `background-clip: text`
- CSS Custom Properties

---

## 📝 Key Files Reference

| File                           | Purpose                                  |
| ------------------------------ | ---------------------------------------- |
| `src/index.css`                | Global styles, CSS variables, animations |
| `src/context/ThemeContext.tsx` | Theme switching logic                    |
| `src/context/CartContext.tsx`  | Cart state management                    |
| `src/data/products.ts`         | Product catalog data                     |
| `vercel.json`                  | Deployment configuration                 |
| `DESIGN-STYLES.md`             | Design system documentation              |
| `DEPLOY.md`                    | Deployment instructions                  |

---

## 🔗 Related Documentation

- [Design Styles Guide](./DESIGN-STYLES.md) - Complete design system reference
- [Deployment Guide](./DEPLOY.md) - Vercel deployment instructions
- [Create React App Docs](https://facebook.github.io/create-react-app/docs/getting-started)
- [Material UI Documentation](https://mui.com/material-ui/)
- [React Router Documentation](https://reactrouter.com/)

---

## 📌 Notes

- The project uses Create React App's default configuration
- Ejecting is not recommended for this project
- All text content is in Russian (target audience)
- Product images are sourced from Unsplash
- Cart data persists in localStorage
