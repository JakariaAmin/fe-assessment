import {combineReducers} from "redux";
import placeAutocompleteReducer from "@/reducers/placeAutocompleteSlice";

export const rootReducer = combineReducers(
  {
    placeAutocomplete: placeAutocompleteReducer
  });
