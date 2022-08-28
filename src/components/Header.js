import logo from '../images/LogoMITBadBank.png';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/header.css';
import { Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/context';
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOut, faUserPlus, faFileInvoice, faPiggyBank, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'

function Header(){ 

   const {user, setUser} = useContext(UserContext);
    let navigate = useNavigate();
    return(
      <Navbar bg="light" variant='light' expand="lg" sticky='top' collapseOnSelect>
        <Navbar.Brand>          
          <a href="#/"><img src= { logo } width="100" alt='MIT BAD BANK LOGO'/></a>
          {
            user?.firstName && (<span className='subtitle ml-5' ><FontAwesomeIcon icon={faUser} /> Hello {user.firstName}!</span>)
          }
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='right-aligned me-5 ' id="responsive-navbar-nav">
          <Nav activeKey="1">            
            <Nav.Link  href="#/CreateAccount/"><FontAwesomeIcon icon={faUserPlus} /> Create Account</Nav.Link>
            {
              (user?.email) ? (                
                <>
                  <Nav.Link href="#/Deposit/"><FontAwesomeIcon icon={faPiggyBank} /> Deposit</Nav.Link>
                  <Nav.Link href="#/Withdraw/"><FontAwesomeIcon icon={faHandHoldingDollar} /> Withdraw</Nav.Link>
                  <Nav.Link href="#/AccountResume/"><FontAwesomeIcon icon={faFileInvoice} /> Account Resume</Nav.Link>
                  <Nav.Link  onClick={() => { 
                    setUser(null); 
                    navigate('../');
                    }}
                  ><FontAwesomeIcon icon={faSignOut} />  LogOut</Nav.Link>
                </>
              ): (                
                <Nav.Link href="#/Login/"><FontAwesomeIcon icon={faUser} /> LogIn</Nav.Link>
              )
            }
          </Nav>
        </Navbar.Collapse>        
      </Navbar>
    );
  }
  export default Header;