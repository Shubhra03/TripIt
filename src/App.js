import React,{useState,useEffect} from 'react';
import { CssBaseline, Grid } from '@mui/material';
import { getPlacesData } from './api';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import List from './components/List/List';

import './App.css'; // Import the CSS file

const App = () => {
  const [places,setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const[childClicked,setChildClicked]=useState(null);
  const [coordinates,setCoordinates] = useState({ });
  const [bounds,setBounds] = useState({});

  const [isLoading,setIsLoading]=useState(false);
  const [type,setType] = useState('restaurants');
  const [rating,setRating] = useState('');

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude,longitude} })=>{
        setCoordinates({lat:latitude,lng:longitude});
    })
  },[]);

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    
    if (bounds.sw && bounds.ne) {
       // Check if bounds is not null
       setIsLoading(true);
      getPlacesData(type,bounds.sw, bounds.ne)
        .then((data) => {
          // console.log(data);
          setPlaces(data?.filter((place)=> place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setIsLoading(false);
        })
        // .catch((error) => {
        //   // Handle any error that might occur during API fetch
        //   console.error('Error fetching data:', error);
        // });
    }
  }, [type,bounds]);
  



  return (
      <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List 
          places={filteredPlaces.length ? filteredPlaces:places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
           />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex' , justifyContent: 'center', alignItems: 'center' }} >
          <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={filteredPlaces.length ? filteredPlaces:places}
          setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
    );
};

export default App;
