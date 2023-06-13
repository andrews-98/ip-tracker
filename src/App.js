import { useEffect, useState } from 'react';
import './App.scss';
import { LocalizationBox } from './components/LocalizationBox';
import { Map } from './components/Map';


function App() {
  const [ipAddress, setIpAddress] = useState('');
  const [locationDetails, setLocationDetails] = useState({})
  const [errMessage, setErrorMessage] = useState('')
  const [geoPosition, setGeoPosition] = useState([51.50853, -0.12574])



  const findLocationByIpAddress = async (ip) => {
    try {
      const apiKey = process.env.REACT_APP_BASE_GEO_API_KEY;
      const response = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&ipAddress=${ip}`)
      const jsonData = response.json();
      jsonData.then(data => {
        setLocationDetails({ ...locationDetails, ...data })
        setErrorMessage(data.messages)
        if (data.location) {
          setGeoPosition([data.location?.lat, data.location?.lng])
        }
      })

    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    findLocationByIpAddress(ipAddress)
  }

  useEffect(() => {
    const getCurrentUserIpAddress = async () => {
      const currentUserLocation = await fetch('https://api.db-ip.com/v2/free/self');
      const jsonData = currentUserLocation.json()
      jsonData.then(data => findLocationByIpAddress(data.ipAddress))
    }

    getCurrentUserIpAddress()

  }, [])


  return (
    <div className="App">
      <div className='search-area'>
        <h1 className='search-area__heading'>IP Address Tracker</h1>
        <form className='search-area__form' onSubmit={handleSubmit}>
          <input className='search-area__form__input'
            placeholder='Search for any IP adress or domain'
            onChange={(e) => setIpAddress(e.target.value)} />
          <button className='search-area__form__btn'>{'>'}</button>
        </form>
        <p className='error-msg'>{errMessage && errMessage}</p>
      </div>

      <div className='map-container'>
        <div className='map-details-container'>
          <LocalizationBox locationDetails={locationDetails} />
        </div>

        <Map position={geoPosition} />
      </div>
    </div>
  );
}

export default App;
