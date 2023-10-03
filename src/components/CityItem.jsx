



import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCities } from '../contexts/CitiesContext';

// const formatdate = (date) => {
//     return new Intl.DateTimeFormat('fa',
//         {
//             day: 'numeric',
//             month: "long",
//             year: "numeric",
//         }).format(new Date(date));
// }

export default function CityItem({ city }) {
    const { currentCity, deleteCity } = useCities();
    const { emoji, cityName, date, id, position } = city;


    function handleClick(e) {
        e.preventDefault()
        deleteCity(id)
    }
    return (
        <li >
            <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={`${styles.cityItem} ${id === currentCity.id ?
                styles['cityItem--active'] : ""}`}>
                <span className={`${styles.emoji} fi-${emoji}`} />
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{date.year}/{date.month}/{date.day}</time>
                <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
            </Link>

        </li>
    )
}
