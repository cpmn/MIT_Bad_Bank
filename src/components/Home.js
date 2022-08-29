import { useState, useEffect } from 'react'
import  axios  from 'axios'


 function Home(){
  
// Expected output "Sunday, 20 December 2020 at 14:23:16 GMT+11"

  const [state, setState] = useState({
    ip: "",
    countryName: "Bolivia",
    countryCode: "BO",
    city: "Cochabamba",
    timezone: "",
    currency:"BOB"
  });

  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setState({
          ...state,
          ip: data.ip,
          countryName: data.country_name,          
          city: data.city,          
          currency: data.currency
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGeoInfo();
  });
  
   
    return (
      <div className='container'>
        <div >
          <h1 className='div-title text-shadow  '>Welcome To MIT Bad Banking!</h1>          
        </div> 
        <div className="bottomright">
          <h2>{state.countryName} - {state.city}</h2>
          <h2>Currency: {state.currency}</h2>
          <h2>{new Date().toDateString()}</h2>      
        </div>
      </div>
    );  
  }
  
export default Home;
