import { FunctionComponent, useState, useEffect } from "react";
import axios from 'axios'; // To make API requests
import styles from "./FrameComponent.module.css";

export type FrameComponentType = {
  className?: string;
  data: JSON;
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
  data, 
}) => {

  const [stateName, setStateName] = useState('');  // State for storing the state name
  // API Key for Google Geocoding API (use your actual API key)
  const API_KEY = 'AIzaSyCPujiAjmpSYsNOHxNAUDP5-_aMxXWZhj8';

  // Function to make API call and get the state from the city name
  const getGeocode = async (cityName: string) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      const results = response.data.results;

      if (results.length > 0) {
        const addressComponents = results[0].address_components;
        const stateInfo = addressComponents.find(component =>
          component.types.includes('administrative_area_level_1')
        );
        
        if (stateInfo) {
          setStateName(stateInfo.long_name);  // Set the state name from the response
        } else {
          setStateName('State not found');
          console.log(stateName)
        }
      } else {
        setStateName('No results found');
      }
    } catch (error) {
      console.error('Error fetching geocode data:', error);
      setStateName('Error fetching state');
    }
  };

  // Call getGeocode whenever data.name (city name) is available
  useEffect(() => {
    if (data.name) {
      getGeocode(data.name);
    }
  }, [data.name]);  // Trigger the effect when the city name changes

  // Function to get the current date in the desired format
  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = now.toLocaleString('default', { month: 'short' });
    const year = now.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  // Function to get the current day of the week
  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    return days[now.getDay()]; 
  };

  const getWeatherIcon = (description: string) => {
    switch (description.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return '/sunny.png';
      case 'rain':
      case 'drizzle':
        return '/rain.png'; 
      case 'mist':
      case 'fog':
        return '/mist.png'; 
      case 'clouds':
        return '/cloudy.png';
      case 'overcast':
        return '/cloudy.png'; 
      default:
        return '/default-icon.png'; 
    }
  };

  // Call the functions to get the current date and day
  const currentDate = getCurrentDate();
  const currentDay = getCurrentDay();
  const weatherCondition = data.weather && data.weather[0] ? data.weather[0].main : null;
  const WeatherIcon = weatherCondition ? getWeatherIcon(weatherCondition) : '/default-icon.png';

  return (
    <section className={[styles.weatherDisplayParent, className].join(" ")}>
      <div className={styles.weatherDisplay}>
        <div className={styles.weatherInnerDisplay}>
          <div className={styles.frameParent}>
            <div className={styles.mondayParent}>
              <div className={styles.monday}>{currentDay}</div>
              <div className={styles.dec2023}>{currentDate}</div>
            </div>
            <div className={styles.separatorParent}>
              <div className={styles.separator}>
                {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
              </div>
              <div className={styles.temperatureCircleWrapper}>
                <div className={styles.temperatureCircle} />
              </div>
              <div className={styles.c}></div>
            </div>
          </div>
          <div className={styles.imageAndDescriptionParent}>
            <div className={styles.imageAndDescription}>
              <img
                className={styles.weatherImageIcon}
                loading="lazy"
                alt=""
                src={WeatherIcon} // Use the icon determined by weather conditions
              />
              <div className={styles.description}>
                <div className={styles.cloudy}>
                  {data.weather ? <p>{data.weather[0].main}</p> : null}
                </div>
                <div className={styles.dec2023}>
                  Feels Like {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
                </div>
              </div>
            </div>
            <div className={styles.losAngelesCalifornia}>
              {data.name ? (<>{data.name}{stateName && `, ${stateName}`}</>) : ('Loading location...')}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.weatherSpecifics}>
        <div className={styles.humidityDetailsWrapper}>
          <div className={styles.humidityDetails}>
            <div className={styles.humidity}>Humidity</div>
            <div className={styles.humidityValue}>
              {data.main ? <span className="bold">{data.main.humidity}%</span> : null}
            </div>
          </div>
        </div>
        <div className={styles.windSpeedContainer}>
          <div className={styles.windSpeedWrapper}>
            <div className={styles.windSpeed}>Wind Speed</div>
          </div>
          <div className={styles.humidityValue}>
            {data.wind ? <span className="bold">{data.wind.speed.toFixed()} MPH</span> : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent;
