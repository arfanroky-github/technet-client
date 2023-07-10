import { createSlice } from '@reduxjs/toolkit';
import { CartType, ProductCart } from './cartInterface';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: CartType = {
  products: [],
  total: 0,
};


const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductCart>) => {
      const isExist = state.products.some(item => item.id.includes(action.payload.id))
      if(!isExist){
        // increase quantity
        state.products.push({
          ...action.payload,
          quantity: 1,
        });
      }
      state.total += action.payload.price;
    },
    decrecingQuantity: (
      state,
      action: PayloadAction<ProductCart>
    ) => {
      const existingProductIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingProduct = state.products[existingProductIndex];
      if (existingProduct && existingProduct.quantity! > 1) {
        existingProduct.quantity = existingProduct.quantity! - 1;
      } else {
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      }
      state.total -= action.payload.price!;
    },
    removeFromCart: (state, action: PayloadAction<ProductCart>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );

      state.total -= action.payload.price! * action.payload.quantity!;
    },
  },
});

export const { addToCart, removeFromCart, decrecingQuantity } = cart.actions;

export const cartReducer = cart.reducer;
