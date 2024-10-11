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
        setErrorMessage('Invalid city name, please input valid city name');
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
      
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(0, 0, 0, 0.5)",  
            borderRadius: "10px", 
            padding: "10px",  
            color: "white", 
            "&:hover fieldset": {
              borderColor: "white", 
            },
            "&.Mui-focused fieldset": {
              borderColor: "white", // Border color when focused
            },
            "& input": {
              fontWeight: "bold", 
              color: "white",  
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 1)",  
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",  // Label color when focused
          },
             "& .MuiInputBase-root": { height: "50px" },  
          width: "420px",  
        }}
      />
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
      </div>
      <FrameComponent data={data}/>
    </div>
  );
};

export default WebpageView;
