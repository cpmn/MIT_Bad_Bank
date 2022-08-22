import { Card, Row } from "react-bootstrap";
import Transaction from '../components/Transaction'

function Withdraw( { user } ){ 
    return (
      <div className="container mt-3">
        <div className="row justify-content-md-center">            
          <div className="col-md-5">
            <Card border="secondary" style={{ width: '30rem' }}>
              <Card.Header>
                <Row> 
                  <div className='col-sm-6 py-1'>
                    <span className='fw-bolder'>Account: </span>{user.account}
                  </div>
                  <div className='col-sm-6 py-1'>
                    <span className='fw-bolder'>Client: </span>{user.firstName} {user.lastName}
                  </div>
                </Row>
                <Row>
                  <div className='col-sm-6 py-1'>
                    <span className='fw-bolder'>Balance: $</span>{user.balance}
                  </div>                  
                </Row>
              </Card.Header>
              <Card.Body>
                <Row>
                  <div className='col-sm-12'>
                    <h2 className='shadow-light text-center'>Withdraw</h2>
                  </div>
                </Row> 
                <Row>
                  <Transaction type='Withdraw'/>
                </Row>
              </Card.Body>
            </Card>
          </div>                          
        </div>        
      </div>    
    )
  }

  export default Withdraw;