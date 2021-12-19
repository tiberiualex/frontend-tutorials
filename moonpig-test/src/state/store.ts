import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

const store = configureStore({
  reducer: rootReducer,
});

export function getStoreWithState(preloadedState?: RootState) {
  return configureStore({ reducer: rootReducer, preloadedState });
}

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
