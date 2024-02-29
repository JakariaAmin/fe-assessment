import {catchError, from, map, startWith, switchMap} from "rxjs";
import {Epic, ofType} from "redux-observable";
import {CLEAR_PLACE_AUTOCOMPLETE, FETCH_PLACE_AUTOCOMPLETE, ON_SELECT_PLACE_AUTOCOMPLETE, TOGGLE_DROPDOWN_PLACE_AUTOCOMPLETE,} from "@/actions/actionTypes";
import {
  clearPlaceAutocompleteSuccess,
  fetchPlaceAutocompleteFailed,
  fetchPlaceAutocompleteInProgress,
  fetchPlaceAutocompleteSuccess,
  onSelectPlaceAutocompleteSuccess,
  toggleDropdownPlaceAutocompleteSuccess,
} from "@/reducers/placeAutocompleteSlice";


// Action creators for redux observable.
export const fetchPlaceAutocomplete          = (input: string) => ({type: FETCH_PLACE_AUTOCOMPLETE, payload: input});
export const clearPlaceAutocomplete          = () => ({type: CLEAR_PLACE_AUTOCOMPLETE});
export const toggleDropdownPlaceAutocomplete = (value: boolean) => ({type: TOGGLE_DROPDOWN_PLACE_AUTOCOMPLETE, payload: value});
export const onSelectPlaceAutocomplete       = (value: any) => ({type: ON_SELECT_PLACE_AUTOCOMPLETE, payload: value});


// Toggle drop down menu of place autocomplete search input.
export const toggleDropdownPlaceAutocompleteEpic: Epic = (action$) =>
  action$.pipe(
    ofType(TOGGLE_DROPDOWN_PLACE_AUTOCOMPLETE),
    map((action: any) => toggleDropdownPlaceAutocompleteSuccess(action.payload)),
  );

// Get place autocomplete from google map api.
export const fetchPlaceAutocompleteEpic: Epic = (action$) =>
  action$.pipe(
    ofType(FETCH_PLACE_AUTOCOMPLETE),
    switchMap(
      (action: any) => from(fetch(`https://test.jakariaamin.com/api/app/v1/place-autocomplete?input=${action.payload}`, {
        method: 'POST',
        body  : JSON.stringify({input: action.payload}),
      }).then(res => res.json())).pipe(
        map((response: Response) => fetchPlaceAutocompleteSuccess({input: action.payload, response: response})),
        catchError(async () => fetchPlaceAutocompleteFailed()),
        startWith(fetchPlaceAutocompleteInProgress(action.payload))
      )
    )
  );

// Triggers when user clicks on search input clear button.
export const clearPlaceAutocompleteEpic: Epic = (action$) =>
  action$.pipe(
    ofType(CLEAR_PLACE_AUTOCOMPLETE),
    map(() => clearPlaceAutocompleteSuccess()),
  );

// Triggers when user click on search hint item.
export const onSelectPlaceAutocompleteEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ON_SELECT_PLACE_AUTOCOMPLETE),
    switchMap(
      (action: any) => from(fetch(`https://maps.google.com/maps/api/geocode/json?address=${action.payload.title}&key=${process.env.GOOGLE_MAPS_API_KEY}`).then(res => res.json())).pipe(
        map((response: Response) => onSelectPlaceAutocompleteSuccess({item: action.payload, response: response})),
      )
    )
  );
