import Spinner from './Spinner'
import CityItem from './CityItem'
import Message from './Message'

import styles from './CityList.module.css'
import { useCities } from '../contexts/CitiesContext'


export default function CityList() {
    const { isLoading, cities } =useCities()
    if (isLoading) return <Spinner />
    if(!cities.length ) return <Message message={'اولین شهر را از درون نقشه انتخاب کن'}/>
    return <ul className={styles.cityList}>
        {
            cities.map(city => <CityItem key={city.id} city={city} />)
        }
    </ul>
}