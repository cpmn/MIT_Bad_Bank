import React from 'react'
import { Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingColumns, faPhone, faEnvelope, faHome, } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons' 

const Footer = ()  => {
  return (
    <div className='container main-footer '> 
      <Row>
          <div className='col mt-4'>
            <h4><FontAwesomeIcon icon={faBuildingColumns} /> MIT Bad Bank</h4>
            <ul className='list-unstyled'>
              <li className='pt-2'><FontAwesomeIcon icon={faPhone} />  (+591) 769-007-84</li>
              <li className='pt-2'><FontAwesomeIcon icon={faEnvelope} />  cpmn@mit-BabBank.com</li>
              <li className='pt-2'><FontAwesomeIcon icon={faHome} /> Cochabamba, 1999 Lincoln Avenue, BO</li>
            </ul>
          </div>
          <div className='col mt-4'>
            <h4>Technology</h4>
            <ul className='list-unstyled'>
              <li className='pt-2'>React</li>
              <li className='pt-2'>Bootstrap</li>              
              <li className='pt-2'>Formik</li>              
            </ul>
          </div>
          <div className='col mt-4'>
            <h4>Social Networks</h4>
            <ul className='list-unstyled'>
              <li className='pt-2'><FontAwesomeIcon icon={faFacebook} /> PaoMunoz</li>
              <li className='pt-2'><FontAwesomeIcon icon={faLinkedin} /> PaolaMunoz</li>              
              <li className='pt-2'><FontAwesomeIcon icon={faGithub} /> cpmn</li>              
            </ul>
          </div>
      </Row>
      <Row>
        <p className='col text-center mt-2'>
          &copy;{new Date().getFullYear()} - MIT Bad Bank - Claudia Muñoz  | ALL RIGHT RESERVED | Terms Of Services | Privacy
        </p>
      </Row>
    </div>
  )
        
}
export default Footer;
