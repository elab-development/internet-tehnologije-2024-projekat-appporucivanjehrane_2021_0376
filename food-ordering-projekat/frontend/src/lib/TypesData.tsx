export interface User {
  _id: string;
  email: string;
  role: "admin" | "restaurant" | "customer";
  profileImage?: string;
  balance: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Customer {
  _id: string;
  user: User;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  location?: {
    lat: number;
    lng: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Restaurant {
  _id: string;
  user: User;
  name: string;
  description?: string;
  category?: string;
  phone?: string;
  address?: string;
  location?: {
    lat: number;
    lng: number;
  };
  verified: boolean;
  commission: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Dish {
  _id: string;
  restaurant: Restaurant;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  _id: string;
  customer: Customer;
  restaurant: Restaurant;
  dishes: {
    dish: Dish;
    quantity: number;
  }[];
  totalPrice: number;
  status: string;
  minutesToPrepare: number;
  minutesToDeliver: number;
  createdAt?: string;
  updatedAt?: string;
}
