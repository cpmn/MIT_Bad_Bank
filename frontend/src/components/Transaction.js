import { Formik, Form, } from 'formik';
import { TextField } from './TextField';
import { Card, Row, Spinner } from "react-bootstrap";
import * as Yup from 'yup';
import UserInfo from './UserInfo';
import { useState, useEffect, useContext } from 'react'
import  axios  from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from "../config/auth";

const userAPI = process.env.REACT_APP_API_URL+'/user';
const transactionAPI = process.env.REACT_APP_API_URL+'/transaction';
const transferAPI = transactionAPI+'/transfer';

function Transaction ( {type} ){ 

  const { currentUser } = useContext(AuthContext);  
  const [user, setUser] = useState({});  
  const [loading, setLoading] = useState(true);

  
 
  useEffect(() => {
    currentUser.getIdToken()
    .then( idToken => {
      axios.get(`${userAPI}/${currentUser.email}`, {headers: { 'Authorization' : idToken }})
      .then( res =>{          
        if(res.status === 200){
          setUser({
            account: res.data.account,
            name: res.data.name,
            email: res.data.email,
            balance: res.data.balance
          });
          setLoading(false);
        }
      })
    }).catch( e => {
      console.error(e);
      setLoading(false);
    })
  },[currentUser])
  
 

  const handleSubmit = async (values, {resetForm}) => {
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {                
        currentUser.getIdToken()
        .then( idToken => {
          if (type === 'Transfer'){            
            axios.get(`${userAPI}/${values.Transfer}`, {headers: { 'Authorization' : idToken }})           
            .then((response) =>{              
              if(response.data.account){               
                const userTransfer = {
                account: user.account,
                toAccount: response.data.account,
                type: type,
                amount: Number(values.Amount),
                description: `TRANSFER FROM-: ${user.email}, TO: ${response.data.email} AMOUNT: ${values.Amount}, DESCRIPTION: ${values.Description}`
                }                
                axios.post(transferAPI, userTransfer, {headers: { 'Authorization' : idToken }})
                .then((res)=>{                  
                  axios.get(`${userAPI}/${user.email}`, {headers: { 'Authorization' : idToken }})
                  .then(res =>{
                    setUser({
                      account: res.data.account,
                      name: res.data.name,
                      email: res.data.email,
                      balance: res.data.balance
                    });
                    resetForm();
                    Swal.fire(
                      `${type}!`,
                      `Your ${type} has been placed.`,
                      'success'
                    );
                  });                
                })
              }
              else{ 
                Swal.fire({
                  title: 'Ooops... :(',
                  text: "Destination E-mail does not exist!",
                  icon: 'error'                              
                })
                resetForm();
              }
            }).catch((e) => {
              console.error(e);
            });
          } else{
            const userTransition = {
              account: user.account,
              type: type,
              amount: Number(values.Amount),
              description: values.Description
            }
            axios.post(transactionAPI, userTransition, {headers: { 'Authorization' : idToken }})
            .then( res =>{  
              axios.get(`${userAPI}/${currentUser.email}`, {headers: { 'Authorization' : idToken }})
               .then( res =>{                
                if(res.status === 200){
                  setUser({
                    account: res.data.account,
                    name: res.data.name,
                    email: res.data.email,
                    balance: res.data.balance
                  });
                  resetForm();
                }
              });                
              Swal.fire(
                `${type}!`,
                `Your ${type} has been placed.`,
                'success'
              )
            }).catch( e => console.error(e) )
          }
        }).catch( e => console.error(e) )
      }
    });
  }    
  return (
    <div className="row justify-content-md-center">            
      <div className="col-md-5 mt-5">        
      <Card >
          {
            loading ? (
              <Card.Header className='d-flex justify-content-center'>
              <Spinner className='loader' animation="border" variant='danger' role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              </Card.Header>
            ) : (
            <> 
              <Card.Header>
                <UserInfo 
                  title={type} 
                  userAccount={user.account} 
                  userName={user.name} 
                  userBalance={user.balance} />
              </Card.Header>
              <Card.Body>                
                <Row>
                  <TransactionForm user={user} type={type} handleSubmit={handleSubmit}/>
                </Row>                     
              </Card.Body>              
            </>              
            )
          }
         </Card>           
      </div>           
    </div>   
  )
}

function TransactionForm({ user, type, handleSubmit }){

  const validateTransfer = Yup.object({    
    Transfer: Yup.string()
      .email("E-mail is not valid")
      .required("E-mail is required")
      .test('Email','You can not transfer money to same account.',
        function(value) {
          return value===user.email? false : true            
        }
      ),
    Amount: Yup.number()
      .positive()
      .test(
        'is-decimal',
        'invalid decimal ex. 45.25',
        value => (value + "").match(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/),
      )
      .test('Balance','Amount is greather than your balance, this is not allowed.',
        function(value) {
          return (type==='Withdraw' || type==='Transfer' )? value <= user.balance : true            
        }
      )
      .required("Amount is required")
      .max(1000000, "Maximun amount permited is 1,000,000"),
    Description: Yup.string()
      .max(100, "Description must be 100 characters or less")
      .required("Description required"),   
  });
  
  const validate = validateTransfer.omit(['Transfer']);

  return(
    <Formik
    initialValues={                    
      { 
        Amount: '', 
        Description: '',
        Transfer:''
      }}
    validationSchema={
      (type ==='Transfer')? (validateTransfer):(validate)
    }  
    onSubmit={handleSubmit}
  >
     {({ errors, values }) => (
    <Form>
      {
        (type === 'Transfer') ? (
          <TextField label="Transfer to E-mail" name="Transfer" type="text" />
        ):(<></>)
      }
      <TextField label="Amount" name="Amount" type="Number" />     
      <TextField label="Description" name="Description" type="text" />   
      <Row className='justify-content-md-center'>                      
      <button name="submit" className="btn btn-dark mt-3" type="submit" disabled={
        (type ==='Transfer')? (
          values.Amount.length===0 || 
          values.Description.length===0 ||                        
          errors.Amount ||
          errors.Transfer
        ):(
          values.Amount.length===0 || 
          values.Description.length===0 ||
          errors.Amount
        )        
      }>{type}</button>
      </Row>                      
    </Form>)}
  </Formik>

  );
}

  export default Transaction;

