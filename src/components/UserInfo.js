import { Row } from "react-bootstrap";
import { UserContext } from '../utils/context';
import { useContext } from 'react'

function UserInfo ( {title} ){

  const { user } = useContext(UserContext);
  return (
    <>
    <Row>
      <div className='col-sm-12'>
        <h2 className='shadow-light text-center'>{title}</h2>
        <hr />
      </div>
    </Row> 
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
    </>
  )
}
export default UserInfo;