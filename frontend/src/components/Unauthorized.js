import { Card } from "react-bootstrap";

function Unauthorized(){
  return ( 
    <div className="row justify-content-md-center">            
      <div className="col-md-5 mt-5">     
        <Card >
          <Card.Header className='d-flex justify-content-center'>
            <h2>Unauthorized page, please login to the application</h2>
          </Card.Header>
        </Card>
      </div>
    </div>
  )
}
export default Unauthorized;