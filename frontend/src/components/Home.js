import { useState } from 'react'
import { Row } from "react-bootstrap";
//import  axios  from 'axios'


 function Home(){
  

  const [state] = useState({
    ip: "",
    countryName: "Bolivia",
    countryCode: "BO",
    city: "Cochabamba",
    timezone: "",
    currency:"BOB"
  });

  /*const getGeoInfo = () => {
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
  });*/
    return (
     <Row className='container'>
      <div className='col mt-4'>
        <h1 className='text-white-center text-shadow'>Welcome To MIT Bad Banking!</h1>
      </div>       
        <div className="bottomright text-shadow">
          <h2>{state.city} - {state.countryName}</h2>
          <h2>Currency: {state.currency}</h2>
          <h2>{new Date().toDateString()}</h2>     
      </div>
    </Row>     
    );  
  }
  
export default Home;
