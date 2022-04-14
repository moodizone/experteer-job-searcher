import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PERSIST, REHYDRATE } from "redux-persist/es/constants";
import { PersistConfig, Persistor } from "redux-persist/es/types";
import { persistStore, persistReducer } from "redux-persist";

import { RootState } from "../type";
import jobsReducer from "../slice/jobs";

const rootReducer = combineReducers({
  jobs: jobsReducer,
});

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  version: 1,
};
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // https://github.com/rt2zz/redux-persist/issues/988#issuecomment-647508240
        ignoredActions: [REHYDRATE, PERSIST],
      },
    }),
});
const persistor: Persistor = persistStore(store);

export { store, persistor, rootReducer };
