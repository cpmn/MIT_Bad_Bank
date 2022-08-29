import { Formik, Form, } from 'formik';
import { TextField } from './TextField';
import { Card, Row } from "react-bootstrap";
import * as Yup from 'yup';
import UserInfo from './UserInfo';
import { UserContext, TransactionsContext } from '../utils/context';
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Transaction ( {type} ){ 
  
  const { user, setUser } = useContext(UserContext);
  const { transactions, setTransactions } = useContext(TransactionsContext);
  const [success, setSuccess] = useState(false) ;
  let navigate = useNavigate();

  const Message = ({ message }) => {
    const [show, setShow] = useState(true);
    useEffect(() => {
      const timeId = setTimeout(() => {        
        setSuccess(false);
        setShow(false);
      }, 4000)  
      return () => {
        clearTimeout(timeId)
      }
    }, []);
    if (!show) {
      return null;
    }
    return (
      <div className={`alert alert-success  text-center`}>
        {message}
      </div>
    )
  }
  
  const validate = Yup.object({
    Amount: Yup.number()
      .positive()
      .test(
        'is-decimal',
        'invalid decimal ex. 45.25',
        value => (value + "").match(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/),
      )
      .test('Balance','Amount is greather than your balance, this is not allowed.',
          function(value) {
            return type==='Withdraw'? value <= user.balance : true            
          }
      )
      .required("Ammount is required")
      .max(1000000, "Maximun amount permited is 1000000"),
    Description: Yup.string()
      .max(100, "Description Mast be 100 characters or less")
      .required("Description required"),   
  });

  const handleSubmit = (values, {resetForm}) => {

    setUser({ ...user, 
              balance: type === 'Deposit'? user.balance + values.Amount : user.balance - values.Amount
    });
    setTransactions([...transactions, 
      {
        account: user.account,
        date: new Date().toDateString(),
        type: type,
        amount: values.Amount,
        description: values.Description,
        balance:  type === 'Deposit'? user.balance + values.Amount : user.balance - values.Amount 
      }
    ]);
    resetForm();
    setSuccess(true);         
  }
  if (user === null) {    
    navigate('../#/Login');
  }
  else {  

  
    return (      
        <div className="row justify-content-md-center">            
          <div className="col-md-5 mt-5">
            <Card >
              <Card.Header>
                <UserInfo title={type}/>                                
              </Card.Header>
              <Card.Body>                
                <Row>
                  <Formik
                    initialValues={
                      { 
                        Amount: '', 
                        Description: ''                        
                      }}
                    validationSchema={validate}                     
                    onSubmit={handleSubmit}
                  >
                     {({ errors, values }) => (
                    <Form>
                      <TextField label="Amount" name="Amount" type="Number" />     
                      <TextField label="Description" name="Description" type="text" />   
                      <Row className='justify-content-md-center'>                      
                      <button name="submit" className="btn btn-dark mt-3" type="submit" disabled={
                        values.Amount.length===0 || 
                        values.Description.length===0 ||
                        errors.Amount
                      }>{type}</button>
                      </Row>                      
                    </Form>)}
                  </Formik>
                </Row>
                {
                  success ? (                    
                    <Row className=' mt-3'>
                      <Message variant='success' message={`${type} successfull`} />                                          
                    </Row>                   
                  ): (<></>)
                }                
                </Card.Body>
            </Card>
          </div>           
        </div>   
  )
  }
}

  export default Transaction;