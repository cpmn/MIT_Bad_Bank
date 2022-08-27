import { Card, Row } from "react-bootstrap";
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { UserContext, UsersContext } from '../utils/context';
import { useContext } from 'react'


function Login(){ 

  const { setUser} = useContext(UserContext);
  const { accounts } = useContext(UsersContext);

  let navigate = useNavigate();
  const handleSubmit = (values) => {
    if (accounts.some( u => u.email === values.email && u.password === values.password) ){
      setUser(accounts.find( u => 
        u.email === values.email && 
        u.password === values.password
      ));
      navigate('../');
    }  
  }
  
  const validate = Yup.object({
    email: Yup.string()
      .email("E-mail is not valid")
      .required("E-mail is required")
      .test('E-mail does not exist', 'E-mail does not exist',
        function(value) {
          return accounts.some( u => u.email === value);
        }
      ),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Passord is required")
      .test('Password incorrect', 'Incorrect Password',
        function(value) {
          return accounts.some( u => u.password === value);
        } 
      ),
  });
  
    return (
      <div className="container mt-3">  
        <Row className="justify-content-md-center">
        <div className="col-md-5">
          <Card>
            <Card.Header><h3>Login</h3></Card.Header>
            <Card.Body>                
              <Formik
                initialValues={{
                  email: '',
                  password: ''                          
                }}
                validationSchema={validate}
                onSubmit={handleSubmit}
              >
                {({ errors, values }) => (
                <Form>
                  <TextField label="E-mail" name="email" type="text" />
                  <TextField label="Password" name="password" type="password" />
                  <div className="col text-center">
                    <button className="btn btn-dark mt-3  " type="submit" disabled={                        
                        errors.email || errors.password ||
                        values.email.length===0 || values.password.length===0
                      }
                    >Login</button>
                    <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                  </div>                  
                </Form>
                )}
              </Formik>                
            </Card.Body>
          </Card>
          </div>
        </Row>            
      </div>                               
    )
  }

  export default Login;