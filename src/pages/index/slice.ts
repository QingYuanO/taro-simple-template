import { createSlice } from "@reduxjs/toolkit";

interface IndexSlice {
  num: number;
}
const initialState: IndexSlice = {
  num: 1,
};

export const IndexSlice = createSlice({
  name: "index",
  initialState,
  reducers: {
    addOne(state){
      state.num++
    },
    subtract(state){
      state.num--
    }
  },
  extraReducers(build) {},
});

export const {addOne,subtract} = IndexSlice.actions;

export default IndexSlice.reducer;
