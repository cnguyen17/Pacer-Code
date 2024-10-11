import { FunctionComponent } from "react";
import styles from "./FrameComponent.module.css";
// import sunnyIcon from '/sunny.png'; // Local icon paths
// import rainyIcon from '/rainy.png';
// import mistIcon from '/mist.png';
// import cloudIcon from "/weather-image@2x.png"; 


export type FrameComponentType = {
  className?: string;
  data: JSON
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
  data, 
}) => {



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
    return days[now.getDay()]; // Get the current day as a number (0-6)
  };

  const getWeatherIcon = (description) => {
    switch (description.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return '/sunny.png'; // Path relative to the public folder
      case 'rain':
      case 'drizzle':
        return '/rain.png'; // Path relative to the public folder
      case 'mist':
      case 'fog':
        return '/mist.png'; // Path relative to the public folder
      case 'clouds':
        return '/cloudy.png';
      case 'overcast':
        return '/cloudy.png'; // If you have a cloudy image
      // Add more cases for other weather descriptions
      default:
        return '/default-icon.png'; // Path to a default icon if none matches
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
                <div className={styles.dec2023}>Feels Like 
                  {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                </div>
              </div>
            </div>
            <div className={styles.losAngelesCalifornia}>
              {data.name}, California
            </div>
          </div>
        </div>
      </div>
      <div className={styles.weatherSpecifics}>
        <div className={styles.humidityDetailsWrapper}>
          <div className={styles.humidityDetails}>
            <div className={styles.humidity}>Humidity</div>
            <div className={styles.humidityValue}>
              {data.main ? <span className='bold'>{data.main.humidity}%</span> : <span className='bold'></span>}
            </div>
          </div>
        </div>
        <div className={styles.windSpeedContainer}>
          <div className={styles.windSpeedWrapper}>
            <div className={styles.windSpeed}>Wind Speed</div>
          </div>
          <div className={styles.humidityValue}> 
            {data.wind ? <span className='bold'>{data.wind.speed.toFixed()} MPH</span> : <span className='bold'></span>}
            </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent;
