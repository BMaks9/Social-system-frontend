import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface UserState {
  username: string;
  isAuthenticated: boolean;
  isStaff: boolean;
  error?: string | null;
}

const initialState: UserState = {
  username: "",
  isAuthenticated: false,
  isStaff: false,
  error: null,
};

// Асинхронное действие для авторизации

export const loginUserAsync = createAsyncThunk(
  "user/loginUserAsync",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    const csrfToken = Cookies.get("csrftoken");
    try {
      const { data } = await axios.post(
        "/api/users/login/",
        { username, password },
        {
          withCredentials: true, // Включаем отправку cookies
          headers: {
            "X-CSRFToken": csrfToken,
          }, // Для передачи cookies
        }
      );
      return data; // Возвращаем данные из ответа
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Ошибка авторизации"
      ); // Возвращаем более информативную ошибку
    }
  }
);

// Асинхронное действие для деавторизации

export const logoutUserAsync = createAsyncThunk(
  "user/logoutUserAsync",
  async (_, { rejectWithValue }) => {
    const csrfToken = Cookies.get("csrftoken");
    try {
      const { data } = await axios.post("/api/users/logout/", null, {
        withCredentials: true, // Включаем отправку cookies
        headers: {
          "X-CSRFToken": csrfToken,
        }, // Для передачи cookies с запросом
      });
      return data; // Возвращаем данные из ответа
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Ошибка при выходе из системы"
      );
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUserAsync",
  async (
    {
      username,
      password,
      email,
    }: { username?: string; password?: string; email?: string },
    { rejectWithValue }
  ) => {
    const csrfToken = Cookies.get("csrftoken");
    try {
      const { data } = await axios.put(
        "/api/users/update_profile/",
        { username, password, email },
        {
          withCredentials: true, // Включаем отправку cookies
          headers: {
            "X-CSRFToken": csrfToken,
          }, // Для передачи cookies
        }
      );
      return data; // Возвращаем данные из ответа
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Ошибка регистрации"
      ); // Возвращаем более информативную ошибку
    }
  }
);
export const regUserAsync = createAsyncThunk(
  "user/regUserAsync",
  async (
    {
      username,
      password,
      email,
    }: { username: string; password: string; email: string },
    { rejectWithValue }
  ) => {
    const csrfToken = Cookies.get("csrftoken");
    try {
      const { data } = await axios.post(
        "/api/users/register/",
        { username, password, email },
        {
          withCredentials: true, // Включаем отправку cookies
          headers: {
            "X-CSRFToken": csrfToken,
          }, // Для передачи cookies
        }
      );
      return data; // Возвращаем данные из ответа
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Ошибка авторизации"
      ); // Возвращаем более информативную ошибку
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const { username, is_staff } = action.payload;
        state.username = username;
        state.isStaff = is_staff;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })

      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.username = "";
        state.isAuthenticated = false;
        state.isStaff = false;
        state.error = null;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const { username } = action.payload;
        state.username = username;
        state.error = null;
      })

      .addCase(updateUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(regUserAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(regUserAsync.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(regUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
