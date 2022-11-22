import '../css/app.css';
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import CreateAccount from "./CreateAccount";
import Login from './Login';
import Footer from './Footer';
import Transaction from './Transaction';
import AccountResume from './AccountResume';
import {AuthProvider} from '../config/auth';
import RequireAuth from './PrivateRoute';


function App() {    

  return (
    <div className='layout'>          
    <Header />      
    <div className='content justify-content-md-center'>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<Home  />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateAccount" element={<CreateAccount  />} />            
        <Route path="/Deposit" element={
          <RequireAuth>
            <Transaction  type="Deposit"/>
          </RequireAuth>
        }/>
        <Route path="/Withdraw" element={
          <RequireAuth>
            <Transaction type="Withdraw"/>
          </RequireAuth>
        } />
        <Route path="/Transfer" element={
          <RequireAuth>
            <Transaction type="Transfer"/>
          </RequireAuth>
        } />
        <Route path="/AccountResume" element={
          <RequireAuth><AccountResume  /></RequireAuth>          
        } />            
      </Routes>
      </AuthProvider>
    </div>        
    <Footer />     
    </div>
  );
}

export default App;
