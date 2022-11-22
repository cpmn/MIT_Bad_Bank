import { Card, Row } from "react-bootstrap";
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLarge  } from '@fortawesome/free-solid-svg-icons';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from "../config/firebase";
import Swal from 'sweetalert2';
import  axios  from 'axios'
import { useContext } from "react";
import { AuthContext } from "../config/auth";
import { signOut } from 'firebase/auth'

const userAPI = process.env.REACT_APP_API_URL+'/user';

function Login(){ 

  let navigate = useNavigate();
  
  const handleSubmit = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((result)=>{    
        Swal.fire({
          title: "Well done!",
          text:"User LogIn successfully!",
          icon: 'success',
          timer:2000,
          showCancelButton: false,
          showConfirmButton: false
        });   
        navigate('../');       
      })    
      .catch(error => {
        if ( error.message === 'Firebase: Error (auth/user-not-found).' ){
          console.log('E-mail does not exist')                    
          Swal.fire({
            title: "Oops!",
            text:"E-mail does not exist!",
            icon: 'error',
            timer:3000,
            showCancelButton: false,
            showConfirmButton: false
          });
        } else if ( error.message === 'Firebase: Error (auth/wrong-password).' ) {
          console.log('Incorrect Password')          
          Swal.fire({
            title: "Oops!",
            text:"Incorrect Password!",
            icon: 'error',
            timer:3000,
            showCancelButton: false,
            showConfirmButton: false
          });
        } else {          
          console.log(error.message)          
        } 
      }); 
  }

  const loginWithGoogle = async () => {   
    
    await signInWithPopup( auth, new GoogleAuthProvider())    
    .then((authUser) => {      
      const user = {
        name: authUser.user.displayName,
        email: authUser.user.email,        
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
  const { currentUser } = useContext(AuthContext);
    return (
      (!currentUser)?(
        <Row className="justify-content-md-center">
        <div className="col-md-4 mt-5">
          <Card style={{ minWidth: '16rem', maxWidth: '20rem' }}>
            <Card.Header><h3 className="text-center"><FontAwesomeIcon icon={faUserLarge} /> Login</h3></Card.Header>
            <Card.Body>
              <LoginForm handleSubmit={handleSubmit}/>            
             
              <button  className="btn btn-large btn-block btn-primary mt-3 " onClick={loginWithGoogle}>Login with Google</button>              
            </Card.Body>
          </Card>
          </div>
        </Row>
      ):(
        <Row className="justify-content-md-center">
        <div className="col-md-4 mt-5">
          <Card style={{ minWidth: '16rem', maxWidth: '20rem' }}>
            <Card.Header><h3 className="text-center"><FontAwesomeIcon icon={faUserLarge} /> Login</h3></Card.Header>
            <Card.Body>
              <p> You are already logged</p>
              <button  className="btn btn-large btn-block btn-primary mt-3 " 
                onClick={()=>{
                  signOut(auth);
                  navigate('/');
                }}>Log out</button>  
            </Card.Body>
          </Card>
          </div>
        </Row>
      )
      
    )
  }

  function LoginForm({ handleSubmit }){
    
    const validate = Yup.object({
      email: Yup.string()
        .email("E-mail is not valid")
        .required("E-mail is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Passord is required")
    });
    return (
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
    );
  }
  export default Login;