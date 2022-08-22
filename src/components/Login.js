import { Card } from "react-bootstrap";
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import MobileBadBank from '../images/mobileWelcome.png';
import { login } from "../utils/login";
import { useNavigate } from 'react-router-dom';


function Login( { setUser } ){ 

  let navigate = useNavigate();
  
  const validate = Yup.object({
    email: Yup.string()
      .email("E-mail is not valid")
      .required("E-mail is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Passord is required"),    
  });
  
    return (
      <div className="container mt-3">
        <div className="row">            
          <div className="col-md-3">
            <Card>
              <Card.Header><h3>Login</h3></Card.Header>
              <Card.Body>                
                    <Formik
                        initialValues={{
                          email: '',
                          password: ''                          
                        }}
                        validationSchema={validate}
                        onSubmit={async () => {
                          const user = await login();
                          setUser(user);                          
                          navigate('../');
                        }}
                      >
                        <Form>
                          <TextField label="E-mail" name="email" type="text" />
                          <TextField label="Password" name="password" type="password" />                          
                          <button className="btn btn-light mt-3" type="submit">login</button>
                          <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                        </Form>
                      </Formik>                
              </Card.Body>
            </Card>
          </div>  
          <div className="col-md-4 ">          
            <img src={MobileBadBank} alt="Welcome to mobile app" height="285"></img>         
          </div>     
          <div className="col-md-5 "> 
            <h3>User: demo@mit-badbank.com</h3>
            <h3>Password: demo123456</h3>
          </div>          
        </div>        
      </div>    
    )
  }

  export default Login;