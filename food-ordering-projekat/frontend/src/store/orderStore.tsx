/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";

import { Order } from "../lib/TypesData";

axios.defaults.withCredentials = true;

const API_URL_ORDERS = "http://localhost:8000/api/orders";

interface OrderState {
  orders: Order[];
  order: Order | null;
  isLoading: boolean;
  error: string | null;

  createOrder: (orderData: any) => Promise<void>;
  getOrdersByCustomer: (customerId: string) => Promise<void>;
  getOrdersByRestaurant: (restaurantId: string) => Promise<void>;
  getOrderById: (orderId: string) => Promise<void>;
  updateOrderStatus: (orderId: string, orderData: any) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  order: null,
  isLoading: false,
  error: null,

  // CREATE ORDER
  createOrder: async (orderData: any) => {
    set({ isLoading: true, error: null });
    try {
      const postResponse = await axios.post(`${API_URL_ORDERS}`, orderData);

      if (postResponse.data.success) {
        const getResponse = await axios.get(
          `${API_URL_ORDERS}/${postResponse.data.order.customer}/customer`,
        );
        set({
          orders: getResponse.data.orders,
          order: postResponse.data.order,
          isLoading: false,
        });
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while creating the order",
      );
      set({ isLoading: false });
      throw error;
    }
  },

  // GET ORDERS BY CUSTOMER
  getOrdersByCustomer: async (customerId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL_ORDERS}/${customerId}/customer`,
      );

      set({
        orders: response.data.orders,
        isLoading: false,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while fetching orders",
      );
      set({ isLoading: false });
      throw error;
    }
  },

  // GET ORDERS BY RESTAURANT
  getOrdersByRestaurant: async (restaurantId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL_ORDERS}/${restaurantId}/restaurant`,
      );

      set({
        orders: response.data.orders,
        isLoading: false,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while fetching orders",
      );
      set({ isLoading: false });
      throw error;
    }
  },

  // GET ORDER BY ID
  getOrderById: async (orderId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL_ORDERS}/${orderId}`);

      set({
        order: response.data.order,
        isLoading: false,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while fetching order",
      );
      set({ isLoading: false });
      throw error;
    }
  },

  // UPDATE ORDER STATUS
  updateOrderStatus: async (orderId: string, orderData: any) => {
    set({ isLoading: true, error: null });
    try {
      const putResponse = await axios.put(
        `${API_URL_ORDERS}/${orderId}/update-status`,
        orderData,
      );

      if (putResponse.data.success) {
        const getResponse = await axios.get(
          `${API_URL_ORDERS}/${putResponse.data.order.restaurant._id}/restaurant`,
        );

        set({
          orders: getResponse.data.orders,
          order: putResponse.data.order,
          isLoading: false,
        });
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while updating orders status",
      );
      set({ isLoading: false });
      throw error;
    }
  },
}));
