import {useState, useEffect} from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from './../http.js';
const places = localStorage.getItem('places')

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false)
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [error, setError] = useState()
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true)
      try{
        const places = await fetchAvailablePlaces()
        navigator.geolocation.getCurrentPosition((position) =>{
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)
          setAvailablePlaces(sortedPlaces)
          setIsFetching(false)
        })
      }catch(error){
        setError({
          message: error.message || 'Could not fetch Places, please try again later'
        })
        setIsFetching(false)
      }
      // default function of browser
    }
    fetchPlaces();
    // or
    // fetch('http://localhost:3000/places').then((res)=>{
    //   return res.json();
    // }).then((resData)=>{
    //   setAvailablePlaces(resData.places)
    // })
  }, [])
  if(error){
    return <Error title="An error occured" message={error.message}/>
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="The places are loading.."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
