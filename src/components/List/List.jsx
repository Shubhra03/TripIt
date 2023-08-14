import React from 'react'
import { useState } from 'react';
import { createRef , useEffect} from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
// import { Place } from '@mui/icons-material';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
// Your component code goes here
// import styled from 'styled-components';
import { styled } from '@mui/material/styles';
export const FlexContainer = styled('div')({
  display: 'flex',
  gap: '10px', // Adjust the gap as needed
});

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
  marginBottom: '30px',
}));

export const StyledSelectEmpty = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const StyledLoading = styled('div')(({ theme }) => ({
  height: '600px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const StyledContainer = styled('div')(({ theme }) => ({
  padding: '25px',
}));

export const StyledMarginBottom = styled('div')(({ theme }) => ({
  marginBottom: '30px',
}));

export const StyledList = styled(Grid)(({ theme }) => ({
  height: '75vh',
  overflow: 'auto',
}));

const List = ({places,childClicked,isLoading,type,setType,rating,setRating}) => {
 
  const [elRefs,setElRefs] = useState([]);
  // console.log({childClicked});
  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [places]);

  return (
    <StyledContainer>
      <Typography variant='h5' style={{ fontSize: '23px' ,fontWeight: 'bold'}}>Restaurants , Hotel & Attractions Around You</Typography>

      {isLoading ? (
        <StyledLoading >
          <CircularProgress size="4rem"/>
        </StyledLoading>
      ):(
      <>
      <FlexContainer>
      <StyledFormControl variant='standard'>
        <InputLabel id="type">Type</InputLabel>
        <Select id="type" value={type} onChange={(e)=> setType(e.target.value)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </StyledFormControl>
      <StyledFormControl variant='standard'>
        <InputLabel id="rating">Rating</InputLabel>
        <Select id="rating" value={rating} onChange={(e)=> setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </StyledFormControl></FlexContainer>
      <StyledList container spacing={3} >
        {places?.map((place, i)=>(
              <Grid ref={elRefs[i]} item key={i} xs={12}>
                <PlaceDetails 
                place={place}
                selected={Number(childClicked) === i} 
                refProp={elRefs[i]}
                />
                </Grid>
        ))}

      </StyledList>
      </>
      )}
    </StyledContainer>
  )
}

export default List