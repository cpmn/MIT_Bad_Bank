import { Carousel } from 'react-bootstrap'
import Family from '../images/family.png';
import University from '../images/university.png';
import Grandparents from '../images/grandparents.png';
import Travel from '../images/travel.png';
import { useContext } from 'react';
import { UserContext } from '../utils/context';


function Home(){
  
  const userContext = useContext(UserContext);
  console.log("User Context in HOME: ", userContext);


    return (
      <>
       <main>
          <h2 className='shadow-light'>Welcome to online MIT Bad Banking!</h2>
          <h4 >You can do this, I believe in you.</h4>
        </main> 
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block"
            src= {Family}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className='shadow'>Happy Family with Bad Bank Protecction</h3>            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src={University}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3 className='shadow'>Student Loans the best fit for you!</h3>            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src={Grandparents}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3 className='shadow'>Make your life easy with Bad Bank Senior Account!</h3>            
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block"
            src={Travel}
            alt="Fourth slide"
          />
          <Carousel.Caption>
            <h3 className='shadow'>Make your dream true with the new Travel Credit Card.</h3>            
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </>
    );  
  }
  export default Home;