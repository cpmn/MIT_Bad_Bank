import logo from '../images/LogoMITBadBank.png';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/header.css';
import { Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/context';
import { useContext } from 'react'

function Header(){ 

   const {user, setUser} = useContext(UserContext);
    let navigate = useNavigate();
    return(
      <Navbar bg="light" variant='light' expand="lg" sticky='top' collapseOnSelect>
        <Navbar.Brand>          
          <a href="#/"><img src= { logo } width="100" alt='MIT BAD BANK LOGO'/></a>
          {
            user?.firstName && (<span className='subtitle ml-5' >Hello {user.firstName}!</span>)
          }
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='right-aligned' id="responsive-navbar-nav">
          <Nav activeKey="1">          
            <Nav.Link href="#/">About Us</Nav.Link>            
            <Nav.Link  href="#/CreateAccount/">Enroll</Nav.Link>
            {
              (user?.email) ? (                
                <>
                  <Nav.Link href="#/Deposit/">Deposit</Nav.Link>
                  <Nav.Link href="#/Withdraw/">Withdraw</Nav.Link>
                  <Nav.Link href="#/AccountResume/">Account Resume</Nav.Link>
                  <Nav.Link  onClick={() => { 
                    setUser(null); 
                    navigate('../');
                    }}
                  >LogOut</Nav.Link>
                </>
              ): (                
                <Nav.Link href="#/Login/">LogIn</Nav.Link>
              )
            }
          </Nav>
        </Navbar.Collapse>        
      </Navbar>
    );
  }
  export default Header;