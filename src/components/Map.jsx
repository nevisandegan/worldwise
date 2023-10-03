
import { useNavigate } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';

import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation';
import { useUrlLocation } from '../hooks/useUrlPosition';
import Button from './Button'

export default function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([35.8, 51])
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation()
  const [lat, lng] = useUrlLocation()


  useEffect(function () {
    if (lat && lng) setMapPosition([lat, lng])
  }, [lat, lng])

  useEffect(function () {
    if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
  }, [geolocationPosition])
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && <Button type='position' onClick={getPosition}>{isLoadingPosition ? 'در حال بارگذاری...' : 'از موقعیت خود استفاده کنید'}</Button>}
      <MapContainer
        center={mapPosition}
        zoom={11}
        scrollWheelZoom={true}
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city =>
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span className={`${styles.emoji} fi-${city.emoji}`}></span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>)}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div >
  )
}


function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position)
  return null;
}


function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}