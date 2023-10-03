import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect  } from "react";
import { useCities } from '../contexts/CitiesContext'
import BackButton from "./backButton";
import Snipper from './Spinner'

// const formatdate = (date) => {
//   return new Intl.DateTimeFormat('fa',
//     {
//       day: 'numeric',
//       month: "long",
//       year: "numeric",
//     }).format(new Date(date));
// }

function City() {

  const { id } = useParams()
  const { currentCity, getCity, isLoading } = useCities()

  useEffect(function () {
    getCity(id)
  }, [id,getCity])

  const { cityName, emoji, date, notes } = currentCity
  return (<>

    {isLoading ? <Snipper/>: <div className={styles.city}>
      <div className={styles.row}>
        <h6>نام شهر</h6>
        <h3>
          <span className={`${styles.emoji} fi-${emoji}`} /> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>رفتی به {cityName} در تاریخ</h6>
        {/* <p>{formatdate(date || null)}</p> */}
        <p>{date?.year}/{date?.month}/{date?.day}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>یادداشت</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>بیشتر بدانید</h6>
        <a
          href={`https://fa.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          اطلاعات بیشتر درباره ی شهر {cityName}
        </a>
      </div>
      <div>
        <BackButton />
      </div>
    </div>}
  </>
  )
}

export default City;
