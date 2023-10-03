// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { DtPicker } from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/style.css'

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./backButton";
import { useUrlLocation } from "../hooks/useUrlPosition";
import Message from './Message'
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

function Form() {

  const [lat, lng] = useUrlLocation()
  const { createCity } = useCities()
  const navigate = useNavigate()

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("")
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [geocodingError, setGeocodingError] = useState("")
  
  useEffect(function () {
    if (!lat && lng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true)
        setGeocodingError('')
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json();

        if (!data.countryCode) throw new Error('اونجایی که انتخاب کردی احتمالن شهری نیست.یه جا دیگرو انتخاب کن 😉')

        setCityName(data.city || data.locality || "")
        setCountry(data.countryName)
        setEmoji((data.countryCode).toLowerCase())
      }
      catch (err) {
        setGeocodingError(err.message)
      }
      finally {
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData();
  }, [lat, lng])




  async function handleSubmit(e) {
    e.preventDefault()
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng }
    }

    await createCity(newCity)
    navigate("/app/cities")
  }
  if (isLoadingGeocoding) return <Spinner />;
  if (!lat && !lng) return <Message message={'با کلیک روی نقشه شروع کنید'} />
  if (geocodingError) return <Message message={geocodingError} />


  return (
    <form className={`${styles.form} ${isLoadingGeocoding ? styles.loadin : ' '}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">اسم شهر</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={`${styles.emoji} ${styles.flag} fi-${emoji}`} />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">کی رفتی {cityName}؟</label>
        <DtPicker onChange={setDate} value={date} local='fa' id="date" />
      </div>
      <div className={styles.row}>
        <label htmlFor="notes">نکاتی در مورد سفر شما به {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />

      </div>

      <div className={styles.buttons}>
        <BackButton />
        <Button type="primary">اضافه</Button>
      </div>
    </form>
  );
}

export default Form;
