import { Product } from '../components/ProductCard/ProductCard';

// Заглушки для изображений (временно)
const placeholderImages = {
  mousepad: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%233b82f6" width="400" height="300"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-size="24"%3EКоврик%3C/text%3E%3C/svg%3E',
  keyboard: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%238b5cf6" width="400" height="300"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-size="24"%3EКлавиатура%3C/text%3E%3C/svg%3E',
  mouse: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%2310b981" width="400" height="300"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-size="24"%3EМышка%3C/text%3E%3C/svg%3E',
  chair: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f59e0b" width="400" height="300"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-size="24"%3EКресло%3C/text%3E%3C/svg%3E',
  antistress: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23ef4444" width="400" height="300"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-size="24"%3EАнтистресс%3C/text%3E%3C/svg%3E',
  stand: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%236366f1" width="400" height="300"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-size="24"%3EПодставка%3C/text%3E%3C/svg%3E',
};

export const products: Product[] = [
  // Коврики для мышек
  {
    id: 1,
    name: 'XL Gaming Desk Mat',
    price: 2490,
    oldPrice: 3290,
    image: placeholderImages.mousepad,
    category: 'Коврики',
    rating: 4.8,
    description: 'Огромный коврик для мышки и клавиатуры с антибактериальным покрытием',
  },
  {
    id: 2,
    name: 'Minimalist Wool Felt',
    price: 1890,
    image: placeholderImages.mousepad,
    category: 'Коврики',
    rating: 4.5,
    description: 'Минималистичный коврик из войлока премиум класса',
  },
  // Клавиатуры
  {
    id: 3,
    name: 'Mechanical Keychron K2',
    price: 12990,
    oldPrice: 15990,
    image: placeholderImages.keyboard,
    category: 'Клавиатуры',
    rating: 4.9,
    description: 'Беспроводная механическая клавиатура с горячими клавишами',
  },
  {
    id: 4,
    name: 'Custom GMK Keycaps Set',
    price: 8490,
    image: placeholderImages.keyboard,
    category: 'Клавиатуры',
    rating: 4.7,
    description: 'Набор кастомных кейкапов для механических клавиатур',
  },
  // Мышки
  {
    id: 5,
    name: 'Logitech MX Master 3S',
    price: 9990,
    oldPrice: 11990,
    image: placeholderImages.mouse,
    category: 'Мышки',
    rating: 4.9,
    description: 'Флагманская беспроводная мышь для профессионалов',
  },
  {
    id: 6,
    name: 'Razer DeathAdder V3',
    price: 7490,
    image: placeholderImages.mouse,
    category: 'Мышки',
    rating: 4.6,
    description: 'Эргономичная игровая мышь с оптическим сенсором',
  },
  // Кресла
  {
    id: 7,
    name: 'Herman Miller Aeron',
    price: 125000,
    image: placeholderImages.chair,
    category: 'Кресла',
    rating: 5.0,
    description: 'Легендарное эргономичное офисное кресло',
  },
  {
    id: 8,
    name: 'Secretlab TITAN Evo',
    price: 54990,
    oldPrice: 64990,
    image: placeholderImages.chair,
    category: 'Кресла',
    rating: 4.8,
    description: 'Премиальное геймерское кресло с 4D подлокотниками',
  },
  // Антистресс
  {
    id: 9,
    name: 'Fidget Cube Pro',
    price: 890,
    image: placeholderImages.antistress,
    category: 'Антистресс',
    rating: 4.3,
    description: 'Кубик-антистресс с 6 различными механиками',
  },
  {
    id: 10,
    name: 'Pop It Giant',
    price: 590,
    oldPrice: 890,
    image: placeholderImages.antistress,
    category: 'Антистресс',
    rating: 4.4,
    description: 'Большая поп-ит игрушка для снятия напряжения',
  },
  // Подставки
  {
    id: 11,
    name: 'Monitor Arm Dual',
    price: 8990,
    image: placeholderImages.stand,
    category: 'Подставки',
    rating: 4.7,
    description: 'Крепление для двух мониторов с газлифтом',
  },
  {
    id: 12,
    name: 'Laptop Stand Aluminum',
    price: 3490,
    oldPrice: 4490,
    image: placeholderImages.stand,
    category: 'Подставки',
    rating: 4.6,
    description: 'Алюминиевая подставка для ноутбука с охлаждением',
  },
];

export const categories = [
  { id: 'all', name: 'Все', icon: '🛍️' },
  { id: 'mousepads', name: 'Коврики', icon: '🖱️' },
  { id: 'keyboards', name: 'Клавиатуры', icon: '⌨️' },
  { id: 'mice', name: 'Мышки', icon: '🐭' },
  { id: 'chairs', name: 'Кресла', icon: '🪑' },
  { id: 'antistress', name: 'Антистресс', icon: '🎮' },
  { id: 'stands', name: 'Подставки', icon: '📐' },
];
