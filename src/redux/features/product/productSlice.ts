import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
interface ProductFilter {
  status: boolean;
  priceRange: number;
}

const initialState: ProductFilter = {
  status: false,
  priceRange: 150000,
};

const product = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggleState: (state) => {
      state.status = !state.status
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload
    }
  },
});


export const {toggleState, setPriceRange} = product.actions
export const productReducer = product.reducer;
