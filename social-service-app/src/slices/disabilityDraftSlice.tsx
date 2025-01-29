import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import axios from 'axios';
import { RootState } from '../store';
import Cookies from 'js-cookie';
import { GetPatronages, GetPatronagesDetail } from '../api/Api';

export interface Patronage {
  id?: number;
  title?: string;
  img?: string;
  disabilities_id?: number;
  current_count?: number;
  comment?: string;
}

export interface DisabilityData {
  id?: number;
  disability_phone?: string | '';
  disability_address?: string | '';
  disability_patronages?: Patronage[] | [],
}

export interface DisabilityState {
  id?: number;
  current_count: number | undefined;
  disabilityData: DisabilityData; // поля заявки
  error: string | null;
  isDraft: boolean;
}

const initialState: DisabilityState = {
  id: 0,
  current_count: 0,

  disabilityData: {
    disability_address: '',
    disability_phone: '',
    disability_patronages: [],
  },
  error: null,
  isDraft: false,
};

export const getDisability = createAsyncThunk(
  'disabilityApplication/getDisabilityApplication',
  async (id: string) => {
    const csrfToken = Cookies.get('csrftoken'); // Убедитесь, что путь корректный
    const response = await axios.get(`/disabilities/${id}/`, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrfToken, // Добавление CSRF-токена в заголовки
      },
    });

    return response.data;
  }
);


export const addPatronageToDisability = createAsyncThunk(
  'patronages/addPatronageToDisability',
  async (id: number) => {
    const csrfToken = Cookies.get('csrftoken'); // Убедитесь, что путь корректный
    const response = await axios.post(`/patronages/${id}/draft/`, {}, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrfToken, // Добавление CSRF-токена в заголовки
      },
    });

    return response.data;
  }
);

export const deleteDisability = createAsyncThunk(
  'disability/deleteDisability',
  async (id: string) => {
    const csrfToken = Cookies.get('csrftoken'); // Убедитесь, что путь корректный
    const response = await axios.delete(`/disabilities/${id}/`, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrfToken, // Добавление CSRF-токена в заголовки
      },
    });

    return response.data;
  }
);

export const saveDisability = createAsyncThunk(
  'disability/modifyDisability',
  async ({ appId, disabilityData }: { appId: string; disabilityData: DisabilityData }) => {
    const csrfToken = Cookies.get('csrftoken');

    // 1. Сначала обновляем данные
    const disabilityDataToSend = {
      address: disabilityData?.disability_address ?? '',
      phone: disabilityData?.disability_phone ?? '',
    };

    await axios.put(`/disabilities/${appId}/`, disabilityDataToSend, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrfToken,
      },
    });

    // 2. Затем отправляем "submit"
    const response = await axios.put(`/disabilities/${appId}/submit/`, {}, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrfToken,
      },
    });

    return response.data;
  }
);

export const deletePatronagesFromDisability = createAsyncThunk(
  'patronages/deletePatronagesFromDisability',
  async ({ disabilityId, patronageId }: { disabilityId: number; patronageId: number }) => {
    const csrfToken = Cookies.get('csrftoken'); // Убедитесь, что путь корректный
    const response = await axios.delete(`/disabilities/${disabilityId}/patronage/${patronageId}/`, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrfToken, // Добавление CSRF-токена в заголовки
      },
    });
    return response.data
  });


const disabilityDraftSlice = createSlice({
  name: 'disabilityDraft',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setCount: (state, action) => {
      state.current_count = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
  },
    setDisabilityData: (state, action) => {
      state.disabilityData = {
          ...state.disabilityData,
          ...action.payload,
      };
    },
    setPatronages: (state, action) => {
      state.disabilityData.disability_patronages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDisability.fulfilled, (state, action) => {
        
        const { id, phone, address, patronages, status } = action.payload;
        if (id && patronages) {
            state.id = id;
            state.isDraft = status === 'draft';
            state.disabilityData = {
                id: id,
                disability_address: address,
                disability_phone: phone,
                disability_patronages: patronages || [],
            };
        }
      })
      .addCase(getDisability.rejected, (state) => {
        state.error = 'Ошибка при загрузке данных';
      })
      .addCase(deleteDisability.fulfilled, (state) => {
        state.id = NaN;
        state.current_count = NaN;
        state.disabilityData = {
          disability_patronages: [],
          disability_address: '',
          disability_phone: ''
        };
      })
      .addCase(deleteDisability.rejected, (state) => {
        state.error = 'Ошибка при удалении вакансии';
      })
      .addCase(saveDisability.fulfilled, (state, action) => {
        state.disabilityData = action.payload;
      })
      .addCase(saveDisability.rejected, (state) => {
        state.error = 'Ошибка при обновлении данных';
      })
  },
});


  export const { setId, setCount, setError, setDisabilityData, setPatronages } = disabilityDraftSlice.actions;
  export default disabilityDraftSlice.reducer;