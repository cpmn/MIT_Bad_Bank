import { Card, Row } from "react-bootstrap";
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLarge  } from '@fortawesome/free-solid-svg-icons';
import  axios  from 'axios';
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../config/firebase";


const userAPI = process.env.REACT_APP_API_URL+'/user';

function CreateAccount(){  
  let navigate = useNavigate(); 

  const handleSubmit = (values, {resetForm}) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
    .then(authUser => {
      const user = {
        name: values.name,
        email: values.email,        
        provider: 'local',
        role: 0      
      };
      axios.post(userAPI, user)
      .then(function (response) {
          Swal.fire({
            title: "Well done!",
            text:"User created successfully!",
            icon: 'success',
            timer:2000,
            showCancelButton: false,
            showConfirmButton: false
          });
          resetForm();
          navigate('../');         
      })
      .catch(function (error) {
          console.log(error);
      });
    })
    .catch((error)=> {
      console.log(error);
      if ( error.message === 'Firebase: Error (auth/email-already-in-use).' ){
        Swal.fire({
          title: "Oops!",
          text:"Email User is already in Use!",
          icon: 'error',
          timer:3000,
          showCancelButton: false,
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          title: "Oops!",
          text: error.message,
          icon: 'error',
          timer:3000,
          showCancelButton: false,
          showConfirmButton: false
        });
      }
    })
  }  
  return ( 
    <Row className="justify-content-md-center">              
      <div className="col-md-4 mt-5">
        <Card style={{ minWidth: '18rem', maxWidth: '30rem' }}>
          <Card.Header>
            <h3 className="text-center"><FontAwesomeIcon icon={faUserLarge} /> Create user account</h3></Card.Header>
          <Card.Body>                             
            <CreateUserForm  handleSubmit={handleSubmit}/>    
          </Card.Body>
        </Card>
      </div>          
    </Row>       
  )
}

function CreateUserForm({ handleSubmit }){
    const validate = Yup.object({
      name: Yup.string()
        .max(20, "Name must be 50 characters or less")
        .required("Name is required")
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),    
      email: Yup.string()
        .email("E-mail is not valid")
        .required("Email is required"),      
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Passord is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Password must match")
        .required("Confirm Passord is required"),
    });

    return(
      <Formik
        initialValues={{                  
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validate}
        onSubmit={handleSubmit} >
        {({ errors, values }) => (
          <Form>
            <TextField label="Name" name="name" type="text" />                          
            <TextField label="E-mail" name="email" type="text" />
            <TextField label="Password" name="password" type="password" />
            <TextField label="Confirm Password" name="confirmPassword" type="password" />
            <div className="col text-center">
              <button className="btn btn-dark mt-3" type="submit" disabled={                        
                errors.name || errors.email || errors.password || errors.confirmPassword ||
                values.email.length===0 || values.password.length===0 ||
                values.name.length===0 || values.confirmPassword.length===0 
              }>Register</button>
              <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
              </div>
          </Form>
        )}
      </Formik>
    )
  }

  export default CreateAccount;