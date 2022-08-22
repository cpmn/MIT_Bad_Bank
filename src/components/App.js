import '../css/app.css';
import { useMemo, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import CreateAccount from "./CreateAccount";
import Login from './Login';
import Footer from './Footer';
import { UserContext } from '../utils/UserContext';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import AccountResume from './AccountResume';


function App() {
  const [user, setUser ] = useState(UserContext);  
  const providerUser = useMemo(() => ({user, setUser}), [user, setUser]);
  
  console.log("APP: ", user);

  return (
    <div className="App">      
    <UserContext.Provider value={providerUser}>
      <Header user={user} setUser={setUser}/>
      <div className='content'>
      
        <Routes>
            <Route path="/*" element={<Home user={user} />} />
            <Route path="/Login" element={<Login setUser={setUser}/>} />
            <Route path="/CreateAccount" element={<CreateAccount user={user} />} />            
            <Route path="/Deposit" element={<Deposit user={user} />} />
            <Route path="/Withdraw" element={<Withdraw user={user} />} />
            <Route path="/AccountResume" element={<AccountResume user={user} />} />
            
        </Routes>            
      </div>   
      <Footer />  
      </UserContext.Provider>
    </div>
  );
}

export default App;
