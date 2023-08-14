import React, { useState } from 'react';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import { LocationOnOutlined } from '@mui/icons-material';
import Rating from '@mui/material/Rating';
// import mapStyles from './mapStyles.js';
// import './styles.css';
// const coordinates = { lat: 40.7128, lng: -74.0060 };
import placeHolderImage from '../image/hotel.png';
import { styled } from '@mui/material/styles';


export const StyledMapContainer = styled('div')(({ theme }) => ({
  height: '85vh',
  width: '100%',
}));

export const StyledMarkerContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  '&:hover': {
    zIndex: 2,
  },
}));
export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100px',
}));
export const StyledPointer = styled('img')(({ theme }) => ({
  cursor: 'pointer',
}));

const Map = ({setCoordinates,setBounds,coordinates,places,setChildClicked}) => {
  
  const matches = useMediaQuery('(min-width:600px)');

  
  return (
    <StyledMapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={(e)=>{
          // console.log(e);
          setCoordinates({lat: e.center.lat,lng: e.center.lng});
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child)=>setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <StyledMarkerContainer
          lat={parseFloat(place.latitude)}
          lng={parseFloat(place.longitude)}
            key={i}
          >
            {!matches
              ? <LocationOnOutlined color="primary" fontSize="large" />
              : (
                <StyledPaper elevation={3} >
                  <Typography variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <StyledPointer
                    src={place.photo ? place.photo.images.large.url :placeHolderImage} alt='place.name'
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </StyledPaper>
              )}
          </StyledMarkerContainer>
        ))}
        {/* You can add markers, overlays, and other components here */}
      </GoogleMapReact>
      
      
    </StyledMapContainer>
  );
};

export default Map;
