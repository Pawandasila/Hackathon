export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  ecoPoints: number;
  rating: number;
  reviews: number;
  image: string;
  shortDesc: string;
  description: string;
  features: string[];
  environmentalImpact: {
    positive: string[];
    negative: string[];
  };
  specifications: { [key: string]: string };
  whereToFind: Array<{
    platform: string;
    link: string;
    price: string;
  }>;
}

export interface Category {
  id: string;
  name: string;
  icon: any; // LucideIcon type
}
