import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { GetPatronages, GetPatronagesDetail } from '../api/Api';
import { PATRONAGES_MOCK } from "../modules/mock"; // мок-данные
import { setId, setCount } from './disabilityDraftSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
interface PatronageState {
    searchValue: string;
    patronage: GetPatronages[];
    loading: boolean;
  }

const initialState : PatronageState = {
  searchValue: '',
  patronage: [],
  loading: false,
};

export const getPatronageList = createAsyncThunk(
  'patronage/getPatronageList',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { patronages }: any = getState();  // Получаем из состояния фильтр по имени
    const { searchValue } = patronages;
    try {
      // Запрос с учетом сессионной авторизации, с передачей cookies
      const response = await axios.get('http://192.168.56.1:8000/patronages/', {
        params: { patronageName: searchValue },
        withCredentials: true, // Включаем отправку cookies
      });
      
      

      // Обработка ответа
      const app_id = response.data[response.data.length - 1].disabilities_id; // ID черновой заявки
      const count = response.data[response.data.length - 1].current_count; // количество услуг в черновой заявке

      dispatch(setId(app_id));  // Диспатчим в состояние ID
      dispatch(setCount(count));  // Диспатчим в состояние количество

      return response.data;
    } 
    catch (error) {
      return rejectWithValue('Ошибка при загрузке данных');
    }
  }
);



const patronageSlice = createSlice({
  name: 'patronage',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPatronageList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPatronageList.fulfilled, (state, action) => {
        state.loading = false;
        state.patronage = action.payload;
      })
      .addCase(getPatronageList.rejected, (state) => {
        state.loading = false;
        state.patronage = PATRONAGES_MOCK.filter((item) =>
          item.title.toLocaleLowerCase().startsWith(state.searchValue.toLocaleLowerCase())
        );
      });
  },
});

export const { setSearchValue } = patronageSlice.actions;
export default patronageSlice.reducer;