import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSingleImg } from './../../service/apis/img';

interface IndexSlice {
  num: number;
  imageUrl: string;
  isFetchImg: boolean;
}
const initialState: IndexSlice = {
  num: 1,
  imageUrl: "",
  isFetchImg: false,
};

export const getSingleImgThunk = createAsyncThunk(
  "index/getSingleImgThunk",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getSingleImg();
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const indexSlice = createSlice({
  name: "index",
  initialState,
  reducers: {
    addOne(state) {
      state.num++;
    },
    subtract(state) {
      state.num--;
    },
  },
  extraReducers(build) {
    build.addCase(getSingleImgThunk.pending, (state) => {
      state.isFetchImg = true;
    });

    build.addCase(getSingleImgThunk.fulfilled, (state, action) => {
      state.imageUrl = action.payload.url
      state.isFetchImg = false;
    });
  },
});

export const { addOne, subtract } = indexSlice.actions;

export default indexSlice.reducer;
