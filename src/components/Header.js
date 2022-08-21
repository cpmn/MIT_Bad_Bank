import logo from '../images/LogoMITBadBank.png';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/header.css';
import { Nav, Navbar } from 'react-bootstrap';

function Header(){
    return(
      <Navbar bg="light" variant='light' expand="lg" sticky='top' collapseOnSelect>
        <Navbar.Brand>          
          <a href="#/"><img src= { logo } width="100" alt='MIT BAD BANK LOGO'/></a>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='right-aligned' id="responsive-navbar-nav">
          <Nav activeKey="1">
            <Nav.Link  href="#/CreateAccount/">Enroll</Nav.Link>
            <Nav.Link  href="#/CreateAccount/">Login</Nav.Link>
            <Nav.Link href="#/CreateAccount/">About Us</Nav.Link>
            <Nav.Link href="#/CreateAccount/">Contac Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>        
      </Navbar>
    );
  }
  export default Header;