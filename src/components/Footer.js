import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/footer.css'

const Footer = ()  => {
  return (
    <div className='main-footer'> 
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h4>MIT Bad Bank</h4>
            <ul className='list-unstyled'>
              <li>(+591) 769-007-84</li>
              <li>Cochabamba, Bolivia</li>
              <li>1999 Lincoln Avenue - North Side</li>
            </ul>
          </div>
          <div className='col'>
            <h4>Staff</h4>
            <ul className='list-unstyled'>
              <li>(+591) 769-007-84</li>
              <li>Cochabamba, Bolivia</li>
              <li>1999 Lincoln Avenue - North Side</li>
            </ul>
          </div>
        </div>
        <div className='row'>
          <p className='col-sm'>
            &copy;{new Date().getFullYear()} - MIT Bad Bank | ALL RIGHT RESERVED | Terms Of Services | Privacy
          </p>
        </div>

      </div>
    </div>
  )
        
}
export default Footer;