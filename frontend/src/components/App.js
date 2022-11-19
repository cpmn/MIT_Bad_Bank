import '../css/app.css';
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import CreateAccount from "./CreateAccount";
import Login from './Login';
import Footer from './Footer';
import Transaction from './Transaction';
import AccountResume from './AccountResume';


function App() {    

  return (
    <div className='layout'>          
    <Header />      
    <div className='content justify-content-md-center'>
      <Routes>
        <Route path="/*" element={<Home  />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateAccount" element={<CreateAccount  />} />            
        <Route path="/Deposit" element={<Transaction  type="Deposit"/>} />
        <Route path="/Withdraw" element={<Transaction type="Withdraw"/>} />
        <Route path="/Transfer" element={<Transaction type="Transfer"/>} />
        <Route path="/AccountResume" element={<AccountResume  />} />            
      </Routes>
    </div>        
    <Footer />     
    </div>
  );
}

export default App;
