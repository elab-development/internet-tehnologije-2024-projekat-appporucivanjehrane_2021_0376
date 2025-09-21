/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";

import { Dish } from "../lib/TypesData";

axios.defaults.withCredentials = true;

const API_URL_DISHES = "http://localhost:8000/api/dishes";

interface DishState {
  dishes: Dish[];
  dish: Dish | null;
  isLoading: boolean;
  error: string | null;

  createDish: (dishData: any) => Promise<void>;
  getRestaurantsDishes: (restaurantId: string) => Promise<void>;
  updateDish: (dishData: any, dishId: string) => Promise<void>;
  deleteDish: (dishId: string) => Promise<void>;
}

export const useDishStore = create<DishState>((set) => ({
  dishes: [],
  dish: null,
  error: null,
  isLoading: false,

  // CREATE DISH
  createDish: async (dishData: any) => {
    set({ isLoading: true, error: null });
    try {
      const postResponse = await axios.post(`${API_URL_DISHES}`, dishData);

      if (postResponse.data.success) {
        const getResponse = await axios.get(
          `${API_URL_DISHES}/${postResponse.data.dish.restaurant}/restaurant`,
        );
        set({
          dishes: getResponse.data.dishes,
          isLoading: false,
        });
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while creating the dish",
      );
      set({ isLoading: false });
      throw error;
    }
  },

  // GET RESTAURANTS DISHES
  getRestaurantsDishes: async (restaurantId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL_DISHES}/${restaurantId}/restaurant`,
      );

      set({
        dishes: response.data.dishes,
        isLoading: false,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while fetching dishes",
      );
      set({ isLoading: false });
      throw error;
    }
  },

  // UPDATE DISH
  updateDish: async (dishData: any, dishId: string) => {
    set({ isLoading: true, error: null });
    try {
      const putResponse = await axios.put(
        `${API_URL_DISHES}/${dishId}`,
        dishData,
      );

      if (putResponse.data.success) {
        const getResponse = await axios.get(
          `${API_URL_DISHES}/${putResponse.data.dish.restaurant}/restaurant`,
        );
        set({
          dishes: getResponse.data.dishes,
          isLoading: false,
        });
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while updating the dish",
      );
      set({ isLoading: false });
      throw error;
    }
  },

  // DELETE DISH
  deleteDish: async (dishId: string) => {
    set({ isLoading: true, error: null });
    try {
      const deleteResponse = await axios.delete(`${API_URL_DISHES}/${dishId}`);

      if (deleteResponse.data.success) {
        const getResponse = await axios.get(
          `${API_URL_DISHES}/${deleteResponse.data.resId}/restaurant`,
        );
        set({
          dishes: getResponse.data.dishes,
          isLoading: false,
        });
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while deleting the dish",
      );
      set({ isLoading: false });
      throw error;
    }
  },
}));
