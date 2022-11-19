import { Card } from "react-bootstrap";

function Unauthorized(){
  return (     
    <Card >
      <Card.Header>
        <h1>Unauthorized page, please login to the application</h1>
      </Card.Header>
    </Card>
  )
}
export default Unauthorized;