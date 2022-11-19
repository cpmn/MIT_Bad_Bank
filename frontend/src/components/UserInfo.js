import { Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPiggyBank, faHandHoldingDollar, faFileInvoice } from '@fortawesome/free-solid-svg-icons';

function UserInfo ( {title, userAccount, userName, userBalance} ){  
  let dollarUS = Intl.NumberFormat('en-US');    

  return (
    <>
    <Row>
      <div className='col-sm-12'>
        <TitleIcon title={title}/>
        <hr />
      </div>
    </Row> 
    <Row> 
      <div className='col-sm-6 py-1'>
        <span className='fw-bolder'>Account: </span>{userAccount}
      </div>
      <div className='col-sm-6 py-1'>
        <span className='fw-bolder'>Client: </span> {userName}
      </div>
    </Row>
    <Row>
      <div className='col-sm-6 py-1'>
        <span className='fw-bolder'>Balance: $ </span>{dollarUS.format(userBalance)}
      </div>                  
    </Row>
    </>
  )
}

function TitleIcon({ title }) {
  let icon = faFileInvoice
  if (title === 'Deposit') {
    icon = faPiggyBank;
  } else if (title === 'Withdraw') {
    icon = faHandHoldingDollar;    
  }
  return (   
    <h1 className='text-center text-danger'>  
      <FontAwesomeIcon icon={icon} /> &nbsp; 
      {title}
    </h1>
  )
  
}
export default UserInfo;