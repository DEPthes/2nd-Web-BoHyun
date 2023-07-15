import { useSelector } from "react-redux";
import classes from "./UserProfile.module.css";

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <main className={classes.profile}>
      <p>{user.username}님, 환영합니다.</p>
      <h2>My User Profile</h2>
    </main>
  );
};

export default UserProfile;
