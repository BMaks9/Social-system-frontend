import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetDisabylities } from "../api/Api";
import axios from "axios";
import Cookies from "js-cookie";

interface DisabilitiesState {
  disabilities: GetDisabylities[];
  loading: boolean;
  status: string;
  startDate: string;
  endDate: string;
  creatorFilter: string;
}

const initialState: DisabilitiesState = {
  disabilities: [],
  loading: true,
  status: "",
  startDate: "",
  endDate: "",
  creatorFilter: "",
};

export const getDisabilities = createAsyncThunk(
  "disability/disabilities",
  async (_, { getState, rejectWithValue }) => {
    const { disabilities }: any = getState(); // Получаем из состояния фильтр по имени
    const { status, startDate, endDate } = disabilities;

    const csrfToken = Cookies.get("csrftoken"); // Убедитесь, что путь корректный
    const response = await axios.get(`/disabilities/`, {
      params: { status: status, start_date: startDate, end_date: endDate },
      withCredentials: true,
      headers: {
        "X-CSRFToken": csrfToken, // Добавление CSRF-токена в заголовки
      },
    });
    return response.data;
  }
);

export const completedDisabilities = createAsyncThunk(
  "disability/completedDisabilities",
  async ({ id, action }: { id: number; action: string }) => {
    const csrfToken = Cookies.get("csrftoken"); // Убедитесь, что путь корректный
    const response = await axios.put(
      `/disabilities/${id}/complete/`,
      {},
      {
        params: { action: action },
        withCredentials: true,
        headers: {
          "X-CSRFToken": csrfToken, // Добавление CSRF-токена в заголовки
        },
      }
    );
    return response.data;
  }
);

const disabilitiesSlice = createSlice({
  name: "disabilities",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
    setCreator(state, action) {
      state.creatorFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDisabilities.pending, (state) => {
        state.loading = true;
      })

      .addCase(getDisabilities.fulfilled, (state, action) => {
        state.loading = false;
        state.disabilities = action.payload;
      })

      .addCase(getDisabilities.rejected, (state) => {
        state.loading = true;
        console.log("error");
      })

      .addCase(completedDisabilities.pending, (state) => {
        state.loading = true;
      })

      .addCase(completedDisabilities.fulfilled, (state, action) => {
        state.loading = false;
      })

      .addCase(completedDisabilities.rejected, (state) => {
        state.loading = true;
        console.log("error");
      });
  },
});
export const { setStatus, setEndDate, setStartDate, setCreator } =
  disabilitiesSlice.actions;
export default disabilitiesSlice.reducer;
