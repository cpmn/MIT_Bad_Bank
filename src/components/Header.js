import logo from '../images/LogoMITBadBank.png';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/header.css';
import { Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/context';
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactTooltip from 'react-tooltip';
import { faUser, faSignOut, faUserPlus, faFileInvoice, faPiggyBank, faHandHoldingDollar, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

function Header(){ 
  const hours = new Date().getHours();  

   const {user, setUser} = useContext(UserContext);
    let navigate = useNavigate();
    return(
      <Navbar bg="light" variant='light' expand="lg" sticky='top' collapseOnSelect>
        <Navbar.Brand>          
          <a href="#/" data-tip data-for="home"><img src= { logo } width="100" alt='MIT BAD BANK LOGO'/></a>
          <ReactTooltip id="home" place='top'>MIT Bad Bank Home Page</ReactTooltip>
          {
            user?.firstName && (
            <span className='ml-5'>
              {
                hours >=12 ? hours >=17 ? <><FontAwesomeIcon icon={faMoon} /> Good Evening </> 
                : <><FontAwesomeIcon icon={faSun} /> Good Afternoon </>
                : <><FontAwesomeIcon icon={faSun} /> Good Morning </>
              }
              {user.firstName}!
            </span>)
          }
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='right-aligned mx-2' id="responsive-navbar-nav">
          <Nav activeKey="1">
            <Nav.Link  href="#/CreateAccount/"  data-tip data-for="account"><FontAwesomeIcon icon={faUserPlus} /> Account
            <ReactTooltip id="account" place='top'>Create a new user Account</ReactTooltip>
            </Nav.Link>
            {
              (user?.email) ? (                
                <>
                  <Nav.Link href="#/Deposit/" data-tip data-for="deposit"><FontAwesomeIcon icon={faPiggyBank} /> Deposit
                    <ReactTooltip id="deposit" place='top'>Elecronic Deposit, enter the Ammount and the description</ReactTooltip>
                  </Nav.Link>
                  
                  <Nav.Link href="#/Withdraw/" data-tip data-for="withdraw"><FontAwesomeIcon icon={faHandHoldingDollar} /> Withdraw
                    <ReactTooltip id="withdraw" place='top'>Elecronic Withdraw, enter the Ammount and the description</ReactTooltip>
                  </Nav.Link>
                  <Nav.Link href="#/AccountResume/" data-tip data-for="resume"><FontAwesomeIcon icon={faFileInvoice} /> Account Resume
                    <ReactTooltip id="resume" place='top'>Review user transactions, deposits, withdraws and all historic data.</ReactTooltip>
                  </Nav.Link>
                  <Nav.Link data-tip data-for="logout"  onClick={() => { 
                    setUser(null); 
                    navigate('../');
                    }}
                  ><FontAwesomeIcon icon={faSignOut} />  LogOut
                    <ReactTooltip id="logout" place='top'>LogOut and remove temporal demo user account.</ReactTooltip>
                  </Nav.Link>
                </>
              ): (                
                <Nav.Link href="#/Login/"  data-tip data-for="login"><FontAwesomeIcon icon={faUser} /> Login
                <ReactTooltip id="login" place='top'>Login to Bad Bank application</ReactTooltip>
                </Nav.Link>
              )
            }
          </Nav>
        </Navbar.Collapse>        
      </Navbar>
    );
  }
  export default Header;