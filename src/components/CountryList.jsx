import Spinner from './Spinner'
import CountryItem from './CountryItem'
import Message from './Message'

import styles from './CountryList.module.css'
import { useCities } from '../contexts/CitiesContext'



export default function CountryList() {

    const { isLoading, cities } = useCities()

    if (isLoading) return <Spinner />
    if (!cities.length) return <Message message={'اولین شهر را از درون نقشه انتخاب کن'} />
    const countries = cities.reduce((arr, city) => {
        if (!arr.map(el => el.country).includes(city.country)) return [...arr, { country: city.country, emoji: city.emoji }]
        else return arr
    }, [])
    return <ul className={styles.countryList}>
        {
            countries.map(country => <CountryItem country={country} key={country.country}/>)
        }
    </ul>
}