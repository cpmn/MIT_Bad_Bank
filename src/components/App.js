import '../css/app.css';
import { useContext } from 'react'
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import CreateAccount from "./CreateAccount";
import Footer from './Footer';


function App() {
  return (
    <div className="App">      
      <Header />
      <div className='content'>
        <Routes>           
          <Route path="/*" element={<Home />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
        </Routes>    
      </div>   
      <Footer />  
    </div>
  );
}

export default App;
