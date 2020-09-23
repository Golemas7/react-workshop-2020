import { put, takeLatest } from "redux-saga/effects";
import {
  loadRestaurantData,
  loadRestaurantDataSuccess,
  loadRestaurantDataError,
} from "./slice";
import { getData } from "./api";

export function* loadRestaurantDataSaga({ payload }) {
  if (payload) {
    try {
      const response = yield getData(payload.payload);
      yield put(loadRestaurantDataSuccess(response));
    } catch ({ message }) {
      yield put(loadRestaurantDataError(message));
    }
  }
}

export default function* counterSagas() {
  yield takeLatest(loadRestaurantData.type, loadRestaurantDataSaga);
}
