import React, { useState, FunctionComponent } from "react";
import FrameComponent from "../components/FrameComponent";
import styles from "./WebpageView.module.css";
import axios from 'axios'
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";


  

const WebpageView: FunctionComponent = () => {
  const [data, setData] = useState({});
  const [city, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=49ed7574325808abfcc09a4327ba66fd`

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      // axios.get(url).then((response) => {
      //   setData(response.data)
      //   console.log(response.data)
      // })
      // setLocation('')
      setErrorMessage('');

      try {
        // Make the API call
        const response = await axios.get(url);

        // If response is empty or invalid, throw an error
        if (!response || !response.data) {
          throw new Error('No data returned from API');
        }

        // Set the data from the response
        setData(response.data);
        console.log(response.data);
        
        // Clear input
        setLocation('');
      } catch (error) {
        // Catch any errors and set the error message
        setErrorMessage('Invalid input. Please enter a valid location.');
        console.error('Error:', error.message || error);
      }
    }
  }
  return (
    <div className={styles.webpageView}>
      <div className={styles.webpageViewInner}>
        <div className={styles.spaceSearchBarParent}>
        <TextField
        className="form-outline w-50"
        color="primary"
        label="Search by City"
        onChange={event => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder="City Name"
        required={true}
        type="text"
        variant="outlined"
        style={{ width: '400px', height: '40px' }}
        sx={{ "& .MuiInputBase-root": { height: "40px" }, width: "400px" }}
      />
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
      </div>
      <FrameComponent data={data}/>
    </div>
  );
};

export default WebpageView;
