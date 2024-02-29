import {createSlice} from "@reduxjs/toolkit";

// Define the interface for Google map center lat long.
interface Coordinates {
  lat: number,
  lng: number,
}

// Define the interface for place autocomplete.
export interface PlaceAutocomplete {
  title: string,
  coordinates: Coordinates,
  isPastSearch: boolean,
}

// Define the interface for the state managed by this slice.
interface PlaceAutocompleteState {
  isShowDropdown: boolean;
  isFetching: boolean;
  searches: string[];
  list: PlaceAutocomplete[];
  selected: PlaceAutocomplete;
}

// Define the initial state for this slice.
const initialState: PlaceAutocompleteState = {
  isShowDropdown: false,
  isFetching    : false,
  searches      : [],
  list          : [],
  selected      : {
    title       : 'Kuala Lumpur',
    coordinates : {
      lat: 3.1319,
      lng: 101.6841,
    },
    isPastSearch: false,
  },
};

// Create a Redux slice for managing placeAutocomplete data.
const placeAutocompleteSlice = createSlice(
  {
    name    : "placeAutocomplete",
    initialState,
    reducers: {
      // Toggle show drop down.
      toggleDropdownPlaceAutocompleteSuccess(state, action) {
        state.isShowDropdown = action.payload;
      },

      // Reducer for updating api call status.
      fetchPlaceAutocompleteInProgress(state, action) {
        state.isFetching = action.payload;

        // Show matching previous searches.
        state.list = [
          ...state
            .searches
            .filter(word => word.includes(action.payload))
            .map(obj => {
              return {
                title       : obj,
                coordinates : {lat: 0, lng: 0},
                isPastSearch: true,
              }
            })
        ];
      },

      // Reducer for updating placeAutocomplete list after a successful resource fetch.
      fetchPlaceAutocompleteSuccess(state, action) {
        state.isShowDropdown = true;
        state.isFetching     = false;

        // Keep record of user searches. Prevent duplicate entry of user searches history.
        if (!state.searches.includes(action.payload.input)) {
          state.searches = [...state.searches, action.payload.input];
        }

        // Get server api call result of place autocomplete.
        const predictions: [] = action.payload.response?.data?.predictions;

        state.list = [
          ...state
            .searches
            .filter(word => word.includes(action.payload.input))
            .map(obj => {
              return {
                title       : obj,
                coordinates : {lat: 0, lng: 0},
                isPastSearch: true,
              }
            }),

          // Run through place autocomplete result and store in list state.
          ...Array.isArray(predictions) && predictions.length ? predictions.map(obj => {
            return {
              title       : obj['description'],
              coordinates : {lat: 0, lng: 0},
              isPastSearch: false,
            }
          }) : [],
        ];
      },

      // Reducer for updating placeAutocomplete list after a failed resource fetch.
      // Generally would show error to inform the user.
      fetchPlaceAutocompleteFailed(state) {
        state.isFetching = false;
      },

      // Clear data of this state.
      clearPlaceAutocompleteSuccess: (state) => {
        state.isShowDropdown = false;
        state.list           = [];
      },

      // Update active auto complete object.
      onSelectPlaceAutocompleteSuccess(state, action) {
        // Get server api call result of place autocomplete.
        const result: any = action.payload.response?.results?.[0];

        if (result?.['geometry']?.['location']) {
          state.selected = {
            title       : action.payload.item.title,
            coordinates : {lat: result['geometry']['location']['lat'], lng: result['geometry']['location']['lng']},
            isPastSearch: action.payload.item.isPastSearch,
          };
        }
      },
    },
  });

// Export the action creator for placeAutocompleteSlice.
export const {
               toggleDropdownPlaceAutocompleteSuccess,
               fetchPlaceAutocompleteInProgress,
               fetchPlaceAutocompleteSuccess,
               fetchPlaceAutocompleteFailed,
               clearPlaceAutocompleteSuccess,
               onSelectPlaceAutocompleteSuccess,
             } = placeAutocompleteSlice.actions;

// Export the reducer.
export default placeAutocompleteSlice.reducer;
