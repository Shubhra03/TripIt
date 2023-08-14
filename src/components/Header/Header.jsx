import React from 'react';
import { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { StyledTitle, StyledSearch, StyledSearchIcon, StyledInputRoot, StyledInputInput, StyledToolbar } from './styles.js';
// import SpeechRecognitionComponent from '../Speech/SpeechRecognitionComponent.jsx';
import MicIcon from '@mui/icons-material/Mic';
import { styled } from '@mui/material/styles';

const StyledButton = styled('button')({
  background: 'transparent',
  border: 'none',
  padding: 0,
  paddingTop: '10px',
  cursor: 'pointer',
  '& .MuiSvgIcon-root': {
    fontSize: '35px', // Adjust the icon size as needed
    color: 'white', // Change the color to white or sky blue
    // Alternatively, for sky blue color: color: 'skyblue',
  },
});


// function




const Header = ({setCoordinates}) => {
  const [autocomplete , setAutocomplete] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [inputValue, setInputValue] = useState('');


const onLoad = (autoC) => setAutocomplete(autoC);

const onPlaceChanged = ()=>{
  const lat = autocomplete.getPlace().geometry.location.lat();
  const lng = autocomplete.getPlace().geometry.location.lng();
  setCoordinates({lat,lng});
}
const handleSpeechRecognition = () => {
  const recognition = 
  window.webkitSpeechRecognition || window.SpeechRecognition
    ? new (window.webkitSpeechRecognition || window.SpeechRecognition)()
    : null;

if (!recognition) {
  // Speech recognition not supported, handle the error gracefully or show a message to the user.
  return;
}
  // For other browsers, use `window.SpeechRecognition`
  
  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    setRecognizedText(result);
    setInputValue(result); // Set the recognized text in the input field
    // Handle user query or command with `result` here
  };

  recognition.start();
};
const handleInputChange = (event) => {
  setInputValue(event.target.value);
  if (recognizedText !== '') {
    setRecognizedText(''); // Clear the recognized text when user types in the input field
  }
};

  return (
    <AppBar position="static">
      <StyledToolbar>
        <StyledTitle variant="h5">
            GlobeGuide
        </StyledTitle>
        <Box display="flex">
          <StyledTitle variant="h6">
            Explore new places
          </StyledTitle>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <StyledSearch>
              <StyledSearchIcon>
                <SearchIcon />
              </StyledSearchIcon>
              <StyledInputRoot>
                <StyledInputInput placeholder="Search…"   value={inputValue}
        onChange={handleInputChange}/>
              </StyledInputRoot>
            </StyledSearch>
            
          </Autocomplete>
          <div>
      {/* Your existing SearchInput component */}
      {/* <input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
      /> */}
      
      {/* Microphone icon to trigger speech recognition */}
      {inputValue === '' && (
        <StyledButton onClick={handleSpeechRecognition}>
          <MicIcon />
        </StyledButton>
      )}
    </div>
        </Box>
      </StyledToolbar>

    </AppBar>
  );
};

export default Header;
