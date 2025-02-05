// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/dataSlices";
import patronageReducer from "./slices/patronageSlice";
import userReducer from "./slices/userSlice";
import disabilityDraftSliceReducer from "./slices/disabilityDraftSlice";
import disabilitiesSliceReducer from "./slices/disabilitiesSlice";

// Создание Redux store с фильтром
const store = configureStore({
  reducer: {
    filter: filterReducer,
    patronages: patronageReducer,
    user: userReducer,
    disabilityDraft: disabilityDraftSliceReducer,
    disabilities: disabilitiesSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Тип для получения состояния
export type AppDispatch = typeof store.dispatch; // Тип для диспатча

export default store;
