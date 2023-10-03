import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";

const FAKE_USER = {
  name: "hossein",
  email: "hossein@gmail.com",
  password: "1234",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function User() {
  const user = FAKE_USER;
  const {logout}=useAuth()
  const navigate=useNavigate()


  function handleClick(){
    logout();
    navigate('/')
  }
  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span> {user.name} ،خوش آمدید</span>
      <button onClick={handleClick}>خارج شوید</button>
    </div>
  );
}

export default User;