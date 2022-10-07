import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser: (state, action) => {
            const userLogin = action.payload;
            return userLogin;
        }
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
