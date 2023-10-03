import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from "./Login.module.css";
import PageNav from '../components/PageNav';
import { useAuth } from '../contexts/FakeAuthContext';
import Button from '../components/Button';


export default function Login() {
  const [email, setEmail] = useState("hossein@gmail.com");
  const [password, setPassword] = useState("1234");
  const navigate = useNavigate()
  const { login, isAthenticated, error, dispatch } = useAuth()
  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password)
    else dispatch({ type: "error", payload: "رمز یا پسورد خود را وارد کنید" })
  }
  useEffect(function () {
    if (isAthenticated === true) {
      navigate('/app')
    }
  }, [isAthenticated, navigate])
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">آدرس ایمیل</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">رمز عبور</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {error && <p className={styles.error}>{error}</p>}
        </div>

        <div>
          <Button onClick={handleSubmit} type='back'>ورود</Button>
        </div>
      </form>
    </main>
  );
}
