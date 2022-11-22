import logo from '../images/LogoMITBadBank.png';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/header.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactTooltip from 'react-tooltip';
import { 
  faUser, 
  faSignOut, 
  faUserPlus, 
  faFileInvoice, 
  faPiggyBank, 
  faHandHoldingDollar, 
  faSun, 
  faMoon,
  faMoneyBillTransfer,
  faWallet
} from '@fortawesome/free-solid-svg-icons'
import { auth } from "../config/firebase";
import { signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'


function Header(){ 
  let navigate = useNavigate();
  const hours = new Date().getHours();  
  const [user, loading, error] = useAuthState(auth);
  console.log("USER-HOOK: ", user);
  if (loading) {
    return (
      <>
       <h1> Loading ...</h1>
      </>
    );
  }
  if (error) {
    console.log(error);
  }  
  return(
    <Navbar bg="light" variant='light' expand="lg" sticky='top' collapseOnSelect>
      <Navbar.Brand>          
        <a href="#/" data-tip data-for="home"><img src= { logo } width="100" alt='MIT BAD BANK LOGO'/></a>
        <ReactTooltip id="home" place='top'>MIT Bad Bank Home Page</ReactTooltip>
          {
            user?.email && (
            <span className='ml-5'>
              {
                hours >=12 ? hours >=17 ? <><FontAwesomeIcon icon={faMoon} /> Good Evening </> 
                : <><FontAwesomeIcon icon={faSun} /> Good Afternoon </>
                : <><FontAwesomeIcon icon={faSun} /> Good Morning </>
              }
              {user.email}
            </span>)
          }
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className='right-aligned mx-2' id="responsive-navbar-nav">
        <Nav activeKey="1">            
          {
            (user?.email) ? (                
              <>               
                <NavDropdown className='mr-5' title={
                  <span>
                    <FontAwesomeIcon icon={faWallet} /> 
                    <ReactTooltip id="deposit" place='top'>Elecronic Movements: Deposit, Withdraw and Transfers</ReactTooltip> Transactions 
                  </span> } id="basic-nav-dropdown">
                  <ReactTooltip id="deposit" place='top'>Electronic Deposit, enter the Ammount and the Description</ReactTooltip>
                  <Nav.Link className='mr-5' href="#/Deposit/" data-tip data-for="deposit"><FontAwesomeIcon icon={faPiggyBank} /> Deposit
                    
                  </Nav.Link>
                  <Nav.Link className='mr-5 navbar-brand' href="#/Withdraw/" data-tip data-for="withdraw"><FontAwesomeIcon icon={faHandHoldingDollar} /> Withdraw
                    <ReactTooltip id="withdraw" place='top'>Electronic Withdraw, enter the Ammount and the Description</ReactTooltip>
                  </Nav.Link>                  
                  <NavDropdown.Divider />
                  <Nav.Link className='mr-5 navbar-brand' href="#/Transfer/" data-tip data-for="withdraw"><FontAwesomeIcon icon={faMoneyBillTransfer} /> Transfer
                    <ReactTooltip id="withdraw" place='top'>Electronic Transfers between registered email users</ReactTooltip>
                  </Nav.Link>
                </NavDropdown>


                <Nav.Link className='mr-5' href="#/AccountResume/" data-tip data-for="resume"><FontAwesomeIcon icon={faFileInvoice} /> Account Resume
                  <ReactTooltip id="resume" place='top'>Review user transactions, deposits, withdraws and all historic data.</ReactTooltip>
                </Nav.Link>
                
                <Nav.Link className='mr-5' data-tip data-for="logout"  onClick={() => { 
                    signOut(auth);                     
                    navigate('../');
                    }}
                ><FontAwesomeIcon icon={faSignOut} />  LogOut
                    <ReactTooltip id="logout" place='top'>Log-Out, Exit BadBank.</ReactTooltip>
                </Nav.Link>
              </>
            ): (
              <>
                <Nav.Link className='mr-5' href="#/CreateAccount/"  data-tip data-for="account"><FontAwesomeIcon icon={faUserPlus} /> Create User
                  <ReactTooltip id="account" place='top'>Create new user</ReactTooltip>
                </Nav.Link>                
                <Nav.Link className='mr-5' href="#/Login/"  data-tip data-for="login"><FontAwesomeIcon icon={faUser} /> Login
                  <ReactTooltip id="login" place='top'>Login</ReactTooltip>
                </Nav.Link>
              </>
            )
          }
        </Nav>
      </Navbar.Collapse>        
    </Navbar>
  );
}
  export default Header;