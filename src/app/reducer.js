import { combineReducers } from "@reduxjs/toolkit";

import localeSlice from "components/LanguageProvider/slice";
import restaurantsSlice from "services/restaurantsService/slice";
import pinSlice from "services/mapService/slice";

const reducer = combineReducers({
  [localeSlice.name]: localeSlice.reducer,
  [restaurantsSlice.name]: restaurantsSlice.reducer,
  [pinSlice.name]: pinSlice.reducer,
});

export default reducer;
