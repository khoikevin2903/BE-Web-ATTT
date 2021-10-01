import { createSlice } from '@reduxjs/toolkit';

const login = createSlice({
    name: 'login',
    initialState: {
        info: {
            _id: "",
            firstName: "",
            lastName: "",
            role: 0
        },
        accessToken: "",
        refreshToken: ""

    },
    reducers: {
        onLogout: () => {
            return {
                info: {
                    _id: "",
                    firstName: "",
                    lastName: ""
                },
                accessToken: "",
                refreshToken: ""
            }
        },
        onLogin: (state, action) => {
            console.log(action.payload)
            return action.payload;
        }
    }
});

const { reducer, actions } = login;
export const { onLogout, onLogin } = actions;
export default reducer;