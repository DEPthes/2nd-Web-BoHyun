import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter", // 슬라이스의 이름, 식별자
  initialState: initialCounterState, // 이 슬라이스 객체의 초기 값
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.payload;
    },
    toggle(state) {
      state.showCounter = !state.showCounter;
    },
    resetCounter(state) {
      state.counter = 0;
    },
    multiply(state, action) {
      state.counter *= action.payload;
    },
  }, // 객체 혹은 맵
});
export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
