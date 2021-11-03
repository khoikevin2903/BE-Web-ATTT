import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const FetchList = createAsyncThunk('fetchList', async (params, thunkAPI) => {

    const dataUser = axios.get('http://localhost:4000/me/stored/courses',
    {
        headers: {
            'Authorization': `Bearer ${params}`
        }
    }
    ).then(res => thunkAPI.dispatch(fetchListMusic(res.data)));
    return dataUser;
})

const listMusic = createSlice({
    name: 'login',
    initialState: [],
    reducers: {
        fetchListMusic: (state, action) => {
            return action.payload;
        }
    },
    extraReducers: {
        [FetchList.fulfilled]: (state, action) => {
           state = action.payload;
        }
    }
});

const { reducer, actions } = listMusic;
export const { fetchListMusic } = actions;
export default reducer;