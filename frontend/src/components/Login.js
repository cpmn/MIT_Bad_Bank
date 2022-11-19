import { Card, Row } from "react-bootstrap";
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLarge  } from '@fortawesome/free-solid-svg-icons';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from "../config/firebase";

import  axios  from 'axios'

const userAPI = process.env.REACT_APP_API_URL+'/user';

function Login(){ 
  let navigate = useNavigate();    
  
  const handleSubmit = async (values) => {
    try {        
      await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((result)=>{       
        navigate('../');       
      })    
      .catch(error => {
        if ( error.message === 'Firebase: Error (auth/user-not-found).' ){
          console.log('E-mail does not exist')
          alert('E-mail does not exist');
        } else if ( error.message === 'Firebase: Error (auth/wrong-password).' ) {
          console.log('Incorrect Password')
          alert('Incorrect Password')
        } else {          
          console.log(error.message)          
        } 
      });
    }catch (error) {
      console.log(error);
    }    
  }  
  
  const validate = Yup.object({
    email: Yup.string()
      .email("E-mail is not valid")
      .required("E-mail is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Passord is required")
  });
 

  const loginWithGoogle = async () => {   
    
    await signInWithPopup( auth, new GoogleAuthProvider())    
    .then((authUser) => {      
      const user = {
        name: authUser.user.displayName,
        email: authUser.user.email, 
        password: '',
        provider: 'google',
        role: 0
      }; 
      //Create user in MongoDB
      axios.post(userAPI, user)
      .then(function (response) {        
      })
      .catch(function (error) {
        console.log(error);
      });      
      navigate('../');
    }) ;
    
  }
  
    return (      
      <Row className="justify-content-md-center">
        <div className="col-md-4 mt-5">
          <Card style={{ minWidth: '16rem', maxWidth: '20rem' }}>
            <Card.Header><h3 className="text-center"><FontAwesomeIcon icon={faUserLarge} /> Login</h3></Card.Header>
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
              <button className="btn btn-large btn-block btn-primary mt-3 " onClick={loginWithGoogle}>Login with Google</button>              
            </Card.Body>
          </Card>
          </div>
        </Row>
    )
  }

  export default Login;