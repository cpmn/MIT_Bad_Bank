import { Card } from "react-bootstrap";
import UserInfo from './UserInfo';
import { useNavigate } from 'react-router-dom';
import { UserContext, TransactionsContext } from '../utils/context';
import { useContext } from 'react'
import TableInformation from "./TableInformation";

function AccountResume(  ){ 
  let navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { transactions } = useContext(TransactionsContext); 
  


  if (user === null) {    
    navigate('../Login');
  }
  else {

    const headers = ['#','Date','Transacction','Description', 'Amount', 'Balance'];
    console.log("User Context in RESUME: ", user);
    return (      
      <div className="row justify-content-md-center">          
      <div className="col-md-5 mt-5">
        <Card>
          <Card.Header>
            <UserInfo title="User Transactions"/>                
          </Card.Header>                
          <Card.Body>  
            <TableInformation  columnHeaders={headers} rowInformation={ transactions.filter( u => u.account === user.account )} />
          </Card.Body>
        </Card>
      </div>        
      </div>      
    )
  } }

  
  
  export default AccountResume;