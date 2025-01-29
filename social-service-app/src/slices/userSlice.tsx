import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import axios from 'axios';
import Cookies from 'js-cookie';
interface UserState {
  username: string;
  isAuthenticated: boolean;
  error?: string | null; 
}

const initialState: UserState = {
  username: '',
  isAuthenticated: false,
  error: null,
};

// Асинхронное действие для авторизации


export const loginUserAsync = createAsyncThunk(
    'user/loginUserAsync',
    async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
        const csrfToken = Cookies.get('csrftoken');
        const session_id = Cookies.get('session_id');
      try {
        const { data } = await axios.post('http://192.168.56.1:8000/login/', { username, password }, {
            withCredentials: true, // Включаем отправку cookies
            headers: {
              'X-CSRFToken': csrfToken, 
            //   'session_id' : session_id,// Добавляем CSRF токен в заголовок
            }, // Для передачи cookies
        });
        return data; // Возвращаем данные из ответа
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.error || 'Ошибка авторизации'); // Возвращаем более информативную ошибку
      }
    }
  );
  


// Асинхронное действие для деавторизации

export const logoutUserAsync = createAsyncThunk(
  'user/logoutUserAsync',
  async (_, { rejectWithValue }) => {
    const csrfToken = Cookies.get('csrftoken');
    const session_id = Cookies.get('session_id');
    try {
      const { data } = await axios.post('http://192.168.56.1:8000/logout/', null, {
        withCredentials: true, // Включаем отправку cookies
        headers: {
          'X-CSRFToken': csrfToken,
          
        }, // Для передачи cookies с запросом
      });
      return data; // Возвращаем данные из ответа
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Ошибка при выходе из системы');
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const { username, password} = action.payload;
        state.username = username;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthenticated = false; 
      })

      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.username = '';
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      });      
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;