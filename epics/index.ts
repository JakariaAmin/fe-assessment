import {combineEpics, StateObservable} from 'redux-observable';
import {catchError, Observable} from "rxjs";
import {
  fetchPlaceAutocompleteEpic,
  clearPlaceAutocompleteEpic,
  toggleDropdownPlaceAutocompleteEpic,
  onSelectPlaceAutocompleteEpic,
} from "@/epics/placeAutocompleteEpic";

export const rootEpic = (action$: Observable<unknown>, store$: StateObservable<void>, dependencies: any) =>
  combineEpics(
    toggleDropdownPlaceAutocompleteEpic,
    fetchPlaceAutocompleteEpic,
    clearPlaceAutocompleteEpic,
    onSelectPlaceAutocompleteEpic,
  )(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );
