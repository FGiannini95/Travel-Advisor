import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { Header } from './components/Header/Header';
import { List } from './components/List/List';
import { Map } from './components/Map/Map';
import { getPlacesData } from './api';

const App = () => {

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({})
  const [childClicked, setChildClicked] = useState(null)
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  //just at the beggining, it traps user's geolocalization
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      setCoordinates({lat: latitude, lng: longitude})
    })
  }, [])
  
  //everyime I change position I run this code
  useEffect(() => {
    if (bounds) {
      setIsLoading(true)
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data);
          setFilteredPlaces([])
          setIsLoading(false)
        });
    }
  }, [type, coordinates, bounds]);
  
  useEffect(() => {
    const filteredPlaces = places.filter((places)=>places.rating >rating)
    setFilteredPlaces(filteredPlaces)
  }, [rating])
  

  return (
    <>
      <CssBaseline/>
      <Header/>
      <Grid container={3} style={{width: '100%'}}> 
        <Grid item xs={3} md={4}>
        {places ? (
            <List
              places={filteredPlaces.length ? filteredPlaces : places}
              childClicked={childClicked}
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          ) : (
            <div>Loading...</div>
          )}
        </Grid>
        <Grid item xs={3} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App;