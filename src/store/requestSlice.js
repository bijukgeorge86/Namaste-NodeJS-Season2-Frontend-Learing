import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequest: (state, action) => action.payload,
        removeRequest: (state, action) => {
            const newArray = state.filter(
                (req) => req.id !== action.payload._id
            );
            return newArray;
        },
    },
});

export const { addRequest, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
