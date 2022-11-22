import { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../config/auth";
import { Card, Spinner } from "react-bootstrap";
import UserInfo from './UserInfo';
import TableInformation from "./TableInformation";
import  axios  from 'axios'

const userAPI = process.env.REACT_APP_API_URL+'/user';
const transactionsAPI = process.env.REACT_APP_API_URL+'/transactions';

function AccountResume(){ 

  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});  
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    currentUser.getIdToken()    
      .then( idToken => {      
        //Get user information   
        axios.get(`${userAPI}/${currentUser.email}`, {headers: { 'Authorization' : idToken }})
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
              setLoading(false);
            }).catch( e => console.error(e)); 
          }          
        }).catch( e => console.error(e));
      }).catch( e => console.error(e));       
  },[currentUser]);

    const headers = ['#','Date','Transacction','Description', 'Amount', 'Balance'];    
    return (      
    <div className="row justify-content-md-center">          
      <div className="col-md-5 mt-5">
      {
        (!loading)?(
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
          <Card>
            <Card.Header className='d-flex justify-content-center'>
              <Spinner className='loader' animation="border" variant='danger' role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Card.Header>
          </Card>
        )
      }
      </div>        
    </div>      
    )
  }

  
  
  export default AccountResume;