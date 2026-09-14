export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'pizza' | 'burgers' | 'pasta' | 'desserts' | 'drinks';
  image: string;
  isFeatured: boolean;
  rating: number;
  prepTime: string;
  calories: number;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}
