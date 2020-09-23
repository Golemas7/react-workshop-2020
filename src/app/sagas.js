import { all } from "redux-saga/effects";
import languageProviderSagas from "components/LanguageProvider/sagas";
import newRestaurantModalSagas from "pages/NewRestaurantModal/sagas";
import restaurantsServiceSagas from "services/restaurantsService/sagas";
import pinSagas from "../services/mapService/sagas";

export default function* rootSaga() {
  yield all([
    languageProviderSagas(),
    newRestaurantModalSagas(),
    restaurantsServiceSagas(),
    pinSagas(),
  ]);
}
