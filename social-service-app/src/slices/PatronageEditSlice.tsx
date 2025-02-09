import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";
import { GetPatronages, GetPatronagesDetail } from "../api/Api";
import { PATRONAGES_MOCK } from "../modules/mock"; // мок-данные
import { setId, setCount } from "./disabilityDraftSlice";
import axios from "axios";
import Cookies from "js-cookie";

interface PatronageDetailState {
  patronage: GetPatronagesDetail | null;
  loading: boolean;
  file: File | null;
}

const initialState: PatronageDetailState = {
  patronage: null,
  loading: false,
  file: null,
};

export const getPatronageDetail = createAsyncThunk(
  "patronage/getPatronageDetail",
  async (id: string) => {
    const csrfToken = Cookies.get("csrftoken"); // Убедитесь, что путь корректный
    const response = await axios.get(`/patronages/${id}/`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": csrfToken, // Добавление CSRF-токена в заголовки
      },
    });

    return response.data;
  }
);

export const updatePatronageAsync = createAsyncThunk(
  "patronage/updatePatronageAsync",
  async (
    { id, patronage }: { id: string; patronage: GetPatronagesDetail | null },
    { rejectWithValue }
  ) => {
    const csrfToken = Cookies.get("csrftoken");
    try {
      const { data } = await axios.put(
        `http://192.168.56.1:8000/patronages/${id}/`,
        patronage,
        {
          withCredentials: true, // Включаем отправку cookies
          headers: {
            "X-CSRFToken": csrfToken,
          }, // Для передачи cookies
        }
      );
      return data; // Возвращаем данные из ответа
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Ошибка"); // Возвращаем более информативную ошибку
    }
  }
);
export const addPatronageAsync = createAsyncThunk(
  "patronage/addPatronageAsync",
  async (
    { patronage }: { patronage: GetPatronagesDetail | null },
    { rejectWithValue }
  ) => {
    const csrfToken = Cookies.get("csrftoken");
    try {
      const { data } = await axios.post(
        `http://192.168.56.1:8000/patronages/`,
        patronage,
        {
          withCredentials: true, // Включаем отправку cookies
          headers: {
            "X-CSRFToken": csrfToken,
          }, // Для передачи cookies
        }
      );
      return data; // Возвращаем данные из ответа
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Ошибка"); // Возвращаем более информативную ошибку
    }
  }
);

export const deletePatronageAsync = createAsyncThunk(
  "patronage/deletePatronageAsync",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    const csrfToken = Cookies.get("csrftoken");
    try {
      const { data } = await axios.delete(
        `http://192.168.56.1:8000/patronages/${id}/`,
        {
          withCredentials: true, // Включаем отправку cookies
          headers: {
            "X-CSRFToken": csrfToken,
          }, // Для передачи cookies
        }
      );
      return data; // Возвращаем данные из ответа
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Ошибка"); // Возвращаем более информативную ошибку
    }
  }
);

export const imgPatronageAsync = createAsyncThunk(
  "patronage/imgPatronageAsync",
  async (
    { id, file }: { id: string; file: File | null },
    { rejectWithValue }
  ) => {
    const csrfToken = Cookies.get("csrftoken");

    // Создаем объект FormData
    const formData = new FormData();
    if (file) {
      formData.append("pic", file); // Добавляем файл в FormData, если он существует
    }
    try {
      const { data } = await axios.post(
        `http://192.168.56.1:8000/patronages/${id}/image/`,
        formData,
        {
          withCredentials: true, // Включаем отправку cookies
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "multipart/form-data", // Указываем, что передаем файл
          },
        }
      );
      return data; // Возвращаем данные из ответа
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Ошибка загрузки изображения"
      );
    }
  }
);

const patronageEditSlice = createSlice({
  name: "patronage",
  initialState,
  reducers: {
    setPatronage: (state, action) => {
      if (Object.keys(action.payload).length === 0) {
        // Если передан пустой объект, очищаем patronage
        state.patronage = null;
      } else {
        // В другом случае обновляем patronage
        state.patronage = {
          ...state.patronage,
          ...action.payload,
        };
      }
    },
    setFile: (state, action: PayloadAction<File | null>) => {
      return { ...state, file: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPatronageDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPatronageDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.patronage = action.payload;
      })
      .addCase(getPatronageDetail.rejected, (state) => {
        state.loading = false;
      })

      .addCase(updatePatronageAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePatronageAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.patronage = action.payload;
      })
      .addCase(updatePatronageAsync.rejected, (state) => {
        state.loading = false;
      })

      .addCase(addPatronageAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPatronageAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.patronage = action.payload;
      })
      .addCase(addPatronageAsync.rejected, (state) => {
        state.loading = false;
      })

      .addCase(deletePatronageAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePatronageAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deletePatronageAsync.rejected, (state) => {
        state.loading = false;
      })

      .addCase(imgPatronageAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(imgPatronageAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.patronage = action.payload;
      })
      .addCase(imgPatronageAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const { setPatronage, setFile } = patronageEditSlice.actions;
export default patronageEditSlice.reducer;
