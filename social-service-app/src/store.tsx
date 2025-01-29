// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/dataSlices';
import authReducer from './slices/authSlice';
import patronageReducer from './slices/patronageSlice'
import userReducer from './slices/userSlice'; 
import disabilityDraftSliceReducer from './slices/disabilityDraftSlice';
// Создание Redux store с фильтром
const store = configureStore({
  reducer: {
    filter: filterReducer,
    patronages: patronageReducer,
    user: userReducer,  
    disabilityDraft: disabilityDraftSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Тип для получения состояния
export type AppDispatch = typeof store.dispatch; // Тип для диспатча

export default store;
