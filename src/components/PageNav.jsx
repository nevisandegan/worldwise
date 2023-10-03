import { NavLink } from "react-router-dom";
import styles from './PageNav.module.css'
import Logo from "./Logo";

export default function PageNav() {
    return (
        <nav className={styles.nav} dir="ltr">
            <Logo />
            <ul >
                <li>
                    <NavLink to='/product'>محصولات</NavLink>
                </li>
                <li>
                    <NavLink to='/pricing'>قیمت ها</NavLink>
                </li>
                <li>
                    <NavLink to='/login' className={styles.ctaLink}>ورود</NavLink>
                </li>
            </ul>
        </nav>
    )
}
