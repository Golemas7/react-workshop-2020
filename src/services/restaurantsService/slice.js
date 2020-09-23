import { createSlice } from "@reduxjs/toolkit";
import shortid from "shortid";

import defaultRestaurants from "./defaultRestaurants.json";

const slice = createSlice({
  name: "restaurants",
  initialState: {
    restaurants: defaultRestaurants,
    loadingRestaurants: false,
    restaurantsLoaded: false,
    addNewRestaurantError: null,
    addNewRestaurantSuccess: null,
    addNewRestaurantPending: false,
    addRestaurantsFromApiError: null,
    addRestaurantsFromApiSuccess: null,
    addRestaurantsFromApiLoading: false,
  },
  reducers: {
    addNewRestaurantLoading: (state, action) => {
      state.addNewRestaurantPending = true;
      state.addNewRestaurantSuccess = false;
    },
    addNewRestaurantSuccess: (state, action) => {
      state.addNewRestaurantPending = false;
      state.addNewRestaurantSuccess = true;
      state.restaurants = [
        ...state.restaurants,
        { ...action.payload, id: shortid.generate() },
      ];
      state.error = null;
    },
    addNewRestaurantError: (state, action) => {
      state.addNewRestaurantPending = false;
      state.addNewRestaurantError = action.payload;
      state.addNewRestaurantSuccess = false;
    },
    loadRestaurantData: (state, action) => {
      state.loadingRestaurants = true;
    },
    loadRestaurantDataSuccess: (state, action) => {
      const filteredItems = action.payload.filter((item) => {
        const exists = state.restaurants.some(
          (restaurant) => restaurant.id === item.id
        );

        return !exists;
      });

      state.restaurants = [...state.restaurants, ...filteredItems];
      state.loadingRestaurants = false;
      state.restaurantsLoaded = true;
    },
    loadRestaurantDataError: (state, action) => {
      state.loadingRestaurants = false;
    },
    resetAddNewRestaurantState: (state, action) => {
      state.addNewRestaurantError = null;
      state.addNewRestaurantSuccess = null;
      state.addNewRestaurantPending = false;
    },
    setRestaurantRating: (state, action) => {
      state.restaurants = state.restaurants.map((singleRestaurant) => {
        if (singleRestaurant.id === action.payload.restaurantId) {
          return { ...singleRestaurant, rating: action.payload.rating };
        }
        return singleRestaurant;
      });
    },
  },
});
export const {
  addNewRestaurantLoading,
  addNewRestaurantSuccess,
  addNewRestaurantError,
  setRestaurantRating,
  resetAddNewRestaurantState,
  loadRestaurantData,
  loadRestaurantDataSuccess,
  loadRestaurantDataError,
} = slice.actions;

export default slice;
