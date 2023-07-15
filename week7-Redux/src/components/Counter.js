import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counterSlice";

const Counter = () => {
  const dispatch = useDispatch();
  // state.slice접근용 키 이름.그 slice 상태에서 우리가 가지고 있는 프로퍼티
  const counter = useSelector((state) => state.counter.counter);
  const showCounter = useSelector((state) => state.counter.showCounter);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const increaseHandelr = () => {
    dispatch(counterActions.increase(5));
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle());
  };

  const multiplyHandler = () => {
    dispatch(counterActions.multiply(2));
  };

  const resetHandler = () => {
    dispatch(counterActions.resetCounter());
  };

  console.log(showCounter);

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandelr}>Increment by 5</button>
        <button onClick={decrementHandler}>decrement</button>
        <button onClick={multiplyHandler}>Multiply by 2</button>
        <button onClick={resetHandler}>reset</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
