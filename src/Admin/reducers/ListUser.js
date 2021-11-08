import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const FetchList = createAsyncThunk('fetchList', async (params, thunkAPI) => {

    const dataUser = axios.get('http://localhost:4000/me/user-management',
    {
        headers: {
            'Authorization': `Bearer ${params}`
        }
    }
    ).then(res => thunkAPI.dispatch(fetchListUser(res.data)));
    return dataUser;
})

const listUser = createSlice({
    name: 'login',
    initialState: [],
    reducers: {
        fetchListUser: (state, action) => {
            return action.payload;
        }
    },
    extraReducers: {
        [FetchList.fulfilled]: (state, action) => {
            console.log(action.payload)
           state = action.payload;
        }
    }
});

const { reducer, actions } = listUser;
export const { fetchListUser } = actions;
export default reducer;