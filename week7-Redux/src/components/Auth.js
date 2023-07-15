import classes from "./Auth.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./../store/authSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const loginHandler = (event) => {
    event.preventDefault();
    const user = { id: 1, username: username };
    dispatch(authActions.login(user));
  };
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor="email">이름을 입력하세요.</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={usernameChangeHandler}
            />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
