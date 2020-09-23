import { put, takeLatest } from "redux-saga/effects";

import { addPinData, addPinDataSuccess, addPinDataError } from "./slice";

export function* addPinDataSaga({ payload }) {
  try {
    yield put(addPinDataSuccess(payload));
  } catch ({ message }) {
    yield put(addPinDataError(message));
  }
}

export default function* pinSagas() {
  yield takeLatest(addPinData.type, addPinDataSaga);
}
