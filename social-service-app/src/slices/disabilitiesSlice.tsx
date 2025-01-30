import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetDisabylities } from "../api/Api";
import axios from "axios";
import Cookies from "js-cookie";

interface DisabilitiesState {
  disabilities: GetDisabylities[];
  loading: boolean;
}

const initialState: DisabilitiesState = {
  disabilities: [],
  loading: true,
};

export const getDisabilities = createAsyncThunk(
  "disability/disabilities",
  async () => {
    const csrfToken = Cookies.get("csrftoken"); // Убедитесь, что путь корректный
    const response = await axios.get(`/disabilities/`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": csrfToken, // Добавление CSRF-токена в заголовки
      },
    });
    return response.data;
  }
);

const disabilitiesSlice = createSlice({
  name: "disabilities",
  initialState,
  reducers: {},
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
      });
  },
});

export default disabilitiesSlice.reducer;
