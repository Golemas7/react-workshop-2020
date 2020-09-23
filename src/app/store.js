import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducer";
import sagas from "./sagas";
import {
  loadFromStorage,
  localStorageSyncMiddleware,
} from "./localStorageSync";

function getStore(preloadedState = loadFromStorage()) {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    preloadedState: preloadedState,
    middleware: [
      ...getDefaultMiddleware({ thunk: false }),
      sagaMiddleware,
      localStorageSyncMiddleware,
    ],
    reducer: rootReducer,
  });
  sagaMiddleware.run(sagas);
  return store;
}

export { getStore };
