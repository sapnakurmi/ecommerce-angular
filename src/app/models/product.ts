
  
  export interface Category {
    id: number;
    name: string;
    image: string;
  }
  
  export interface Product {
    quantity: number;
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: {
      id: number;
      name: string;
      image: string;
    };
    sizes?: string[]; 
    colors?: string[]; 
  }
  
  