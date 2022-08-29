import '../css/app.css';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import CreateAccount from "./CreateAccount";
import Login from './Login';
import Footer from './Footer';
import { UserContext, UsersContext, TransactionsContext } from '../utils/context';
import Transaction from './Transaction';
import AccountResume from './AccountResume';
import { users, transaction } from "../utils/users";


function App() {  
  const [user, setUser ] = useState(null);  
  const [accounts, setAccounts ] = useState(users);  
  const [transactions, setTransactions ] = useState(transaction);

  return (
    <>      
    <UserContext.Provider value={{user, setUser}}>
    <UsersContext.Provider value={{accounts, setAccounts}}>
    <TransactionsContext.Provider value={{transactions, setTransactions}}>
    <Header />      
    <div className='content'>
      <Routes>
        <Route path="/*" element={<Home  />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateAccount" element={<CreateAccount  />} />            
        <Route path="/Deposit" element={<Transaction  type="Deposit"/>} />
        <Route path="/Withdraw" element={<Transaction type="Withdraw"/>} />
        <Route path="/AccountResume" element={<AccountResume  />} />            
      </Routes>
    </div>
        
    <Footer />  
    </TransactionsContext.Provider>
    </UsersContext.Provider>
    </UserContext.Provider>
    </>
  );
}

export default App;
