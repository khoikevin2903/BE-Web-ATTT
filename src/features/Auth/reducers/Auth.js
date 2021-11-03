import { createSlice } from '@reduxjs/toolkit';

const login = createSlice({
    name: 'login',
    initialState: {
        info: {},
        accessToken: ""
    },
    reducers: {
        onLogout: () => {
            return {
                info: {},
                accessToken: ""
            }
        },
        onLogin: (state, action) => {
            return {
                info: action.payload.info,
                accessToken: action.payload.accessToken
            }
        }
    }
});

const { reducer, actions } = login;
export const { onLogout, onLogin } = actions;
export default reducer;