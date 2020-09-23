import restaurantsSlice from "services/restaurantsService/slice";
import throttle from "lodash/throttle";

const REDUX_LOCAL_STORAGE = "reduxState";

const saveToStorage = throttle((store) => {
  const state = store.getState();

  const stateToSave = {};
  const restaurants = state[restaurantsSlice.name]?.restaurants;
  if (restaurants) {
    stateToSave[restaurantsSlice.name] = { restaurants };
  }
  localStorage.setItem(REDUX_LOCAL_STORAGE, JSON.stringify(stateToSave));
}, 1000);

export const loadFromStorage = () => {
  try {
    const store = JSON.parse(localStorage.getItem(REDUX_LOCAL_STORAGE));
    if (!store) {
      return void 0;
    }
    return store;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return void 0;
  }
};

export const localStorageSyncMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  saveToStorage(store);
  return result;
};
