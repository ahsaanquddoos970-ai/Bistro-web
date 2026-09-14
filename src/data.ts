import type { MenuItem, GalleryItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // PIZZA
  {
    id: 'pizza-1',
    name: 'Gourmet Margherita',
    description: 'Fresh mozzarella di bufala, organic san marzano tomatoes, fresh basil, and extra virgin olive oil drizzle on hand-stretched sourdough crust.',
    price: 16.99,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    rating: 4.9,
    prepTime: '12 min',
    calories: 820
  },
  {
    id: 'pizza-2',
    name: 'Signature Pepperoni',
    description: 'Double portion of artisanal spicy pepperoni, aged provolone, whole-milk mozzarella, and robust herb marinara sauce.',
    price: 18.50,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    isFeatured: false,
    rating: 4.8,
    prepTime: '15 min',
    calories: 950
  },
  {
    id: 'pizza-3',
    name: 'Truffle Mushroom',
    description: 'Wild forest cremini and porcini mushrooms, white truffle oil, caramelized onions, smoked gouda, and fresh microgreens.',
    price: 21.00,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    rating: 4.9,
    prepTime: '14 min',
    calories: 890
  },

  // BURGERS
  {
    id: 'burger-1',
    name: 'Classic Bistro Burger',
    description: 'Flame-grilled prime Angus beef patty, sharp cheddar cheese, house-pickled cucumbers, crisp heirloom tomato, butter lettuce, and signature garlic aioli.',
    price: 14.99,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    rating: 4.7,
    prepTime: '10 min',
    calories: 780
  },
  {
    id: 'burger-2',
    name: 'Truffle Bacon Double',
    description: 'Two flame-grilled beef patties, applewood smoked bacon, caramelized balsamic onions, Swiss cheese, and luxurious black truffle butter.',
    price: 19.99,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    rating: 4.9,
    prepTime: '12 min',
    calories: 1150
  },
  {
    id: 'burger-3',
    name: 'Spicy Avocado Chicken',
    description: 'Crispy hand-breaded buttermilk chicken breast, fresh sliced avocado, spicy jalapeño slaw, and pepperjack cheese on a toasted brioche bun.',
    price: 15.50,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80',
    isFeatured: false,
    rating: 4.6,
    prepTime: '11 min',
    calories: 720
  },

  // PASTA
  {
    id: 'pasta-1',
    name: 'Fettuccine Truffle Alfredo',
    description: 'House-made egg fettuccine tossed in a rich, velvety parmigiano cream sauce with white truffle essence and cracked black pepper.',
    price: 18.99,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80',
    isFeatured: false,
    rating: 4.8,
    prepTime: '12 min',
    calories: 680
  },
  {
    id: 'pasta-2',
    name: 'Spicy Penne Arrabiata',
    description: 'Al dente penne pasta in a fiery, slow-simmered garlic tomato sauce, enriched with fresh chili flakes, kalamata olives, and fresh parsley.',
    price: 15.99,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    isFeatured: false,
    rating: 4.5,
    prepTime: '10 min',
    calories: 590
  },
  {
    id: 'pasta-3',
    name: 'Seafood Linguine',
    description: 'Linguine pasta tossed with premium wild-caught shrimp, sea scallops, and mussels in a garlic white wine and lemon butter sauce.',
    price: 24.50,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    rating: 4.9,
    prepTime: '16 min',
    calories: 840
  },

  // DESSERTS
  {
    id: 'dessert-1',
    name: 'Molten Lava Cake',
    description: 'Decadent dark chocolate cake with a molten, liquid chocolate center. Served warm with a scoop of Madagascar vanilla bean gelato.',
    price: 9.50,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    rating: 4.9,
    prepTime: '8 min',
    calories: 450
  },
  {
    id: 'dessert-2',
    name: 'Classic Espresso Tiramisu',
    description: 'Delicate ladyfingers soaked in robust espresso and dark rum, layered with whipped sweet mascarpone cheese and dusted with Belgian cocoa powder.',
    price: 8.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    isFeatured: false,
    rating: 4.8,
    prepTime: '5 min',
    calories: 380
  },
  {
    id: 'dessert-3',
    name: 'Velvety Strawberry Cheesecake',
    description: 'New York style cheesecake with a rich graham cracker crust, topped with fresh strawberry compote and organic sweet cream.',
    price: 9.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    isFeatured: false,
    rating: 4.7,
    prepTime: '5 min',
    calories: 520
  },

  // DRINKS
  {
    id: 'drink-1',
    name: 'Passionfruit Mint Mocktail',
    description: 'A vibrant blend of fresh passionfruit pulp, muddled organic mint, lime juice, sparkling water, and a touch of agave nectar.',
    price: 6.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80',
    isFeatured: false,
    rating: 4.7,
    prepTime: '4 min',
    calories: 120
  },
  {
    id: 'drink-2',
    name: 'Cold Brew Macchiato',
    description: '18-hour cold brew infused with organic vanilla bean syrup, topped with a cold foam of oat milk and caramel drizzle.',
    price: 5.50,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    isFeatured: false,
    rating: 4.8,
    prepTime: '3 min',
    calories: 180
  },
  {
    id: 'drink-3',
    name: 'Signature Emerald Mojito',
    description: 'Refreshing muddled limes, garden-fresh wild mint, premium cane sugar, sparkling soda water, and botanical cold press herbal essence.',
    price: 7.50,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    rating: 4.9,
    prepTime: '4 min',
    calories: 140
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'The Sourdough Pizza Oven',
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g-2',
    title: 'Exquisite Plating Detail',
    category: 'Craftsmanship',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g-3',
    title: 'Ambient Main Seating',
    category: 'Ambiance',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g-4',
    title: 'Chef Preparing Garnishes',
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g-5',
    title: 'Crafting the Signature Mojito',
    category: 'Mixology',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g-6',
    title: 'Decadent Sweet Dusting',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80'
  }
];

export const RESTAURANT_STATS = [
  { number: 12, label: 'Years in Business', prefix: '', suffix: '+' },
  { number: 4.9, label: 'Average Rating', prefix: '', suffix: '/5' },
  { number: 180, label: 'Customers Daily', prefix: '~', suffix: '' },
  { number: 25, label: 'Signature Dishes', prefix: '', suffix: '' }
];
