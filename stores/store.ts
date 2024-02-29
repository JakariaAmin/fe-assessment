import {configureStore} from "@reduxjs/toolkit";
import {createEpicMiddleware} from "redux-observable";
import {rootEpic} from "@/epics";
import {rootReducer} from "@/reducers";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore(
  {
    reducer   : rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware(
        {
          serializableCheck: false,
          immutableCheck   : false,
        }
      ).concat(epicMiddleware),
  });

epicMiddleware.run(rootEpic);

// Define the root state type using the ReturnType utility of TypeScript
export type RootState = ReturnType<typeof rootReducer>;

// Define the type for dispatching actions from the store
export type AppDispatch = typeof store.dispatch;
