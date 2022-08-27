import { Card, Row } from "react-bootstrap";
import UserInfo from './UserInfo';
import { UserContext, TransactionsContext } from '../utils/context';
import { useContext } from 'react'
import TableInformation from "./TableInformation";

function AccountResume(  ){ 

  const { user } = useContext(UserContext);
  const { transactions } = useContext(TransactionsContext); 
  
  const headers = ['Nro.','Date','Transacction','Description', 'Amount', 'Balance'];

    return (
      <div className="container mt-3">
        <div className="row justify-content-md-center">            
          <div className="col-md-5">
            <Card >
              <Card.Header>
                <UserInfo title="User Transactions"/>                
              </Card.Header>                
              <Card.Body>  
                <TableInformation  columnHeaders={headers} rowInformation={ transactions.filter( u => u.account === user.account )} />
              </Card.Body>
            </Card>
          </div>           
        </div>        
      </div>    
    )
  }

  export default AccountResume;