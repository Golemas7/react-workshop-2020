import { createSelector } from "@reduxjs/toolkit";

import slice from "./slice";

function selectRestaurantsState(state) {
  return state[slice.name];
}

export const selectRestaurants = createSelector(
  selectRestaurantsState,
  (state) => state.restaurants
);

export const selectAreRestaurantsLoaded = createSelector(
  selectRestaurantsState,
  (state) => state.restaurantsLoaded
);

export const selectAreRestaurantsLoading = createSelector(
  selectRestaurantsState,
  (state) => state.loadingRestaurants
);
