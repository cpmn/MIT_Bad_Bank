import { useState } from 'react'
import { Row } from "react-bootstrap";
import {getGeo} from 'geoplugin';

 function Home(){  

  const [geoInfo, setGeoInfo] = useState({});

 getGeo()
  .then(response => {    
    setGeoInfo({
      city: response.city, 
      continentName: response.continentName,
      countryName: response.countryName,
      currencyCode: response.currencyCode,
      currencyConverter: response.currencyConverter

    })}
    ) // handle success
  .catch(error => console.log(error)) // handle error

    return (
     <Row className='container'>
      <div className='col mt-4'>
        <h1 className='text-white-center text-shadow'>Welcome To MIT Bad Banking!</h1>
      </div>       
        <div className="bottomright text-shadow">
          <h2>{geoInfo.continentName} </h2>
          <h2>{geoInfo.city} - {geoInfo.countryName} </h2>
          <h2>Currency: {geoInfo.currencyCode}</h2>          
          <h2>{new Date().toDateString()}</h2>     
      </div>
    </Row>     
    );  
  }
  
export default Home;
