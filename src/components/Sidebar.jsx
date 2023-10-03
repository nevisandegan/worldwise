import styles from './Sidebar.module.css'
import AppNav from './AppNav'
import Logo from './Logo'
import { Outlet } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />

            <Outlet />
            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; کپی رایت {new Date().getFullYear()} توسط  تیم worldwise
                </p>
            </footer>
        </div>
    )
}


