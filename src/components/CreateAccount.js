import { Card } from "react-bootstrap";
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { useState, useContext } from "react";
import { UsersContext } from '../utils/context';

function CreateAccount(){  

  const [success, setSuccess] = useState(false);
  const {accounts, setAccounts} = useContext(UsersContext);

  const handleSubmit = (values, {resetForm}) => {
    alert(values.firstName);
    if (!accounts.some( u => u.email === values.email) ){
      setAccounts(
        [
          ...accounts,  
          {
            account:(Math.floor(Math.random()*90000) + 10000),
            firstName:values.firstName, 
            lastName:values.lastName, 
            email: values.email, 
            password: values.password,
            balance:0             
          }]);  
      setSuccess(true);       
    }                             
    resetForm();     
  }

  const validate = Yup.object({
    firstName: Yup.string()
      .max(20, "First Name Mast be 20 characters or less")
      .required("First Name is required"),
    lastName: Yup.string()
      .max(20, "Last Name Mast be 20 characters or less")
      .required("Last Name is required"),
    email: Yup.string()
      .email("E-mail is not valid")
      .required("E-mail is required")
      .test('E-mail already exist', 'E-mail already exist',
      function(value) {
        console.log("valor return: ", accounts.some( u => u.email === value))
        return !accounts.some( u => u.email === value);
      }),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Passord is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Password must match")
      .required("Confirm Passord is required"),
  });
  
    return (
      <div className="container mt-3 bg">
        <div className="row">
          <div className="col-md-7">            
          </div>        
          <div className="col-md-5">
            <Card>
              <Card.Header><h3>Create a new Account:</h3></Card.Header>
              <Card.Body>                
                  {
                    !success ? (
                      <Formik
                        initialValues={{
                          firstName: '',
                          lastName: '',
                          email: '',
                          password: '',
                          confirmPassword: ''
                        }}
                        validationSchema={validate}
                        onSubmit={handleSubmit}
                      >
                        {({ errors, values }) => (
                        <Form>
                          <TextField label="First Name" name="firstName" type="text" />
                          <TextField label="Last Name" name="lastName" type="text" />
                          <TextField label="E-mail" name="email" type="text" />
                          <TextField label="Password" name="password" type="password" />
                          <TextField label="Confirm Password" name="confirmPassword" type="password" />
                          <div className="col text-center">
                            <button className="btn btn-dark mt-3" type="submit" disabled={                        
                              errors.firstName || errors.lastName ||
                              errors.email || errors.password || errors.confirmPassword ||
                              values.email.length===0 || values.password.length===0 ||
                              values.firstName.length===0 || values.lastName.length===0 ||
                              values.confirmPassword.length===0 
                            }
                          >Register</button>
                            <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                          </div>
                        </Form>
                        )}
                      </Formik>

                    ) : (
                      <Formik                      
                        onSubmit={() => {                          
                          setSuccess(false);                          
                        }}
                      >
                        <Form>
                          <button className="btn btn-light mt-3" type="submit">Register a new Account</button>
                        </Form>
                      </Formik>                      
                    )
                  }                  
                
              </Card.Body>
            </Card>
          </div>          
        </div>        
      </div>    
    )
  }

  export default CreateAccount;