export interface Variant {
    id: number;
    color: string;
    capacity: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    variants: Variant[];
  }