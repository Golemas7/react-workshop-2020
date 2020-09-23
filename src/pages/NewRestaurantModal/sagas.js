import { put, takeLatest } from "redux-saga/effects";
import {
  addNewRestaurantLoading,
  addNewRestaurantError,
  addNewRestaurantSuccess,
} from "services/restaurantsService/slice";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* addNewRestaurantSaga({ payload }) {
  yield delay(1000);
  if (!payload) {
    yield put(
      addNewRestaurantError("Failed to add restaurant. Please try again.")
    );
  } else {
    yield put(addNewRestaurantSuccess(payload));
  }
}

export default function* newRestaurantModalSagas() {
  yield takeLatest(addNewRestaurantLoading.type, addNewRestaurantSaga);
}
