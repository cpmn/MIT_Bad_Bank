import { useState, useEffect } from 'react'
import { Card } from "react-bootstrap";
import UserInfo from './UserInfo';
import TableInformation from "./TableInformation";
import Unauthorized from './Unauthorized';
import { auth } from "../config/firebase";
import  axios  from 'axios'

const userAPI = process.env.REACT_APP_API_URL+'/user';
const transactionsAPI = process.env.REACT_APP_API_URL+'/transactions';

function AccountResume(){ 

  const [user, setUser] = useState({});  
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {   
    const userToken = auth.currentUser;    
    
    userToken.getIdToken()    
      .then( idToken => {      
        //Get user information   
        axios.get(`${userAPI}/${userToken.email}`, {headers: { 'Authorization' : idToken }})
        .then( res =>{          
          if(res.status === 200){
            setUser({
              account: res.data.account,
              name: res.data.name,
              email: res.data.email,
              balance: res.data.balance
            });
            //Get all transactions from user  
            axios.get(`${transactionsAPI}/${res.data.account}`, {headers: { 'Authorization' : idToken }})
              .then( res =>{              
              setTransactions(res.data)
            }).catch( e => console.error(e)); 
          }          
        }).catch( e => console.error(e));
      }).catch( e => console.error(e));  
  },[]);

    const headers = ['#','Date','Transacction','Description', 'Amount', 'Balance'];    
    return (      
    <div className="row justify-content-md-center">          
      <div className="col-md-5 mt-5">
      {
        (user?.email)?(
          <Card>
            <Card.Header>
              <UserInfo 
                title="User Transactions"
                userAccount={user.account} 
                userName={user.name} 
                userBalance={user.balance} />                
            </Card.Header>                
            <Card.Body> 
              <TableInformation  columnHeaders={headers} rowInformation={ transactions} />
            </Card.Body>            
          </Card>            
        ):
        (
          <Unauthorized />
        )
      }
      </div>        
    </div>      
    )
  }

  
  
  export default AccountResume;