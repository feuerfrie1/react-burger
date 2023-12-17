import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuid} from "uuid";

const initialState = {
  bun: null,
  filling: []
}

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialState,
  reducers: {
    setBun: (state, action) => {
      state.bun = action.payload;
    },
    addFilling: (state, action) => {
      const fillingItem = {...action.payload};
      fillingItem.constructorId = uuid();
      state.filling.push(fillingItem);
    },
    removeFilling: (state, action) => {
      state.filling.splice(action.payload, 1);
    },
    clearConstructorState: (state) => {
      state.bun = null;
      state.filling = [];
    },
    sortFilling: (state, action) => {
      state.filling.splice(action.payload.from, 1);
      state.filling.splice(action.payload.to, 0, action.payload.item);
    }
  },
  selectors: {
    selectBun: state => state.bun,
    selectFilling: state => state.filling
  }
})

const {reducer, selectors, actions} = burgerConstructorSlice;

export const {setBun, addFilling, removeFilling, clearConstructorState, sortFilling} = actions;
export const {selectBun, selectFilling} = selectors;
export default reducer;