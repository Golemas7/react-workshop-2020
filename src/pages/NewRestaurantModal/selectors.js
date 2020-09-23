import { createSelector } from "@reduxjs/toolkit";

import slice from "services/restaurantsService/slice";

function selectRestaurantsState(state) {
  return state[slice.name];
}

export const selectAddNewRestaurantPending = createSelector(
  selectRestaurantsState,
  (state) => state.addNewRestaurantPending
);

export const selectAddNewRestaurantError = createSelector(
  selectRestaurantsState,
  (state) => state.addNewRestaurantError
);

export const selectAddNewRestaurantSuccess = createSelector(
  selectRestaurantsState,
  (state) => state.addNewRestaurantSuccess
);
