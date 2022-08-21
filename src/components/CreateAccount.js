import { Card } from "react-bootstrap";
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { useState } from "react";

function CreateAccount(){
  const [success, setSuccess] = useState(false);
  
  const validate = Yup.object({
    firstName: Yup.string()
      .max(20, "First Name Mast be 20 characters or less")
      .required("First Name is required"),
    lastName: Yup.string()
      .max(20, "Last Name Mast be 20 characters or less")
      .required("Last Name is required"),
    email: Yup.string()
      .email("E-mail is not valid")
      .required("E-mail is required"),
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
              <Card.Header><h3>Create a new Account</h3></Card.Header>
              <Card.Body>
                <Card.Text>
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
                        onSubmit={(values, {resetForm} ) => {
                          console.log(values);
                          setSuccess(true);
                          console.log(success);
                          resetForm({values: ''});
                          console.log(values);
                        }}
                      >
                        <Form>
                          <TextField label="First Name" name="firstName" type="text" />
                          <TextField label="Last Name" name="lastName" type="text" />
                          <TextField label="E-mail" name="email" type="text" />
                          <TextField label="Password" name="password" type="password" />
                          <TextField label="Confirm Password" name="confirmPassword" type="password" />
                          <button className="btn btn-light mt-3" type="submit">Register</button>
                          <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                        </Form>
                      </Formik>

                    ) : (
                      <Formik                      
                        onSubmit={(values ) => {
                          console.log(values);
                          setSuccess(false);

                          console.log(success);
                        }}
                      >
                        <Form>
                        <button className="btn btn-light mt-3" type="submit">Register a new Account</button>
                        </Form>

                      </Formik>
                      
                    )

                  }
                  
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          
        </div>
        
      </div>    
    )
  }

  export default CreateAccount;