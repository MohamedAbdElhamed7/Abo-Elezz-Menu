export interface MenuItem {
  category: string;
  name: string;
  description: string;
  small_price: string;
  medium_price: string;
  large_price: string;
  special: string;
}

export interface MenuData {
  categories: string[];
  items: Record<string, MenuItem[]>;
}