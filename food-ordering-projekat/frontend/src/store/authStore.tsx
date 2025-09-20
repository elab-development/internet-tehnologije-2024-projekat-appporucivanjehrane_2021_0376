/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";

import { Customer, Restaurant, User } from "../lib/TypesData";

axios.defaults.withCredentials = true;

// API URLs
const API_URL_USERS = "http://localhost:8000/api/users";
const API_URL_CUSTOMERS = "http://localhost:8000/api/customers";
const API_URL_RESTAURANTS = "http://localhost:8000/api/restaurants";

interface AuthState {
  user: User | null;
  customerData: Customer | null;
  restaurantData: Restaurant | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  error: string | null;
  adminData: any;

  registerCustomer: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;
  registerRestaurant: (
    email: string,
    password: string,
    name: string,
  ) => Promise<void>;
  loginCustomer: (email: string, password: string) => Promise<void>;
  loginRestaurant: (email: string, password: string) => Promise<void>;
  loginAdmin: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  updateProfileInformation: (profileData: any) => Promise<void>;
  getAdminData: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  customerData: null,
  restaurantData: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  adminData: null,

  // REGISTER CUSTOMER
  registerCustomer: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL_CUSTOMERS}/register`, {
        email,
        password,
        firstName,
        lastName,
      });

      set({
        user: response.data.customer.user,
        customerData: response.data.customer,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while registering the customer",
      );
      set({ isLoading: false });
      throw error;
    }
  },

  // LOGIN CUSTOMER
  loginCustomer: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL_CUSTOMERS}/login`, {
        email,
        password,
      });

      set({
        user: response.data.customer.user,
        customerData: response.data.customer,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while loggin in the customer",
      );
      set({ isLoading: false });
      throw error;
    }
  },

  // REGISTER RESTAURANT
  registerRestaurant: async (email: string, password: string, name: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL_RESTAURANTS}/register`, {
        email,
        password,
        name,
      });

      set({
        user: response.data.restaurant.user,
        restaurantData: response.data.restaurant,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while registering the restaurant",
      );
      set({ isLoading: false });
      throw error;
    }
  },

  // LOGIN RESTAURANT
  loginRestaurant: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL_RESTAURANTS}/login`, {
        email,
        password,
      });

      set({
        user: response.data.restaurant.user,
        restaurantData: response.data.restaurant,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while logging in the restaurant",
      );
      set({ isLoading: false });
      throw error;
    }
  },
// LOGIN ADMIN
  loginAdmin: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL_USERS}/admin-login`, {
        email,
        password,
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while logging in the admin",
      );
      set({ isLoading: false });
      throw error;
    }
  },
  // LOGOUT
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL_USERS}/logout`);

      set({
        user: null,
        customerData: null,
        restaurantData: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while logging out",
      );
      set({ isLoading: false });
      throw error;
    }
  },

  // CHECK AUTH
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });

    try {
      const response = await axios.get(`${API_URL_USERS}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });

      if (response.data.user.role === "customer") {
        set({
          customerData: response.data.additionalData,
        });
      } else if (response.data.user.role === "restaurant") {
        set({
          restaurantData: response.data.additionalData,
        });
      }

      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      set({
        error: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },
  // UPDATE PROFILE
  updateProfileInformation: async (profileData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.put(
        `${API_URL_USERS}/update-profile`,
        profileData,
      );

      set({
        user: response.data.user,
        isLoading: false,
      });
      if (response.data.user.role === "customer") {
        set({
          customerData: response.data.additionalData,
        });
      } else if (response.data.user.role === "restaurant") {
        set({
          restaurantData: response.data.additionalData,
        });
      }

      // eslint-disable-next-line no-unused-vars
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while updating profile information",
      );
      set({ isLoading: false });
      throw error;
    }
  },

  // GET ADMIN DATA
  getAdminData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL_USERS}/admin-data`);

      set({
        adminData: response.data.adminData,
        isLoading: false,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while fetching admin data",
      );
      set({ isLoading: false });
      throw error;
    }
  },
}));