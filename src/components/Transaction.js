import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import {  Row } from "react-bootstrap";
import * as Yup from 'yup';


function Transaction ( {type} ){ 
  
  const validate = Yup.object({
    Amount: Yup.number()
      .positive()
      .test(
        'is-decimal',
        'invalid decimal ex. 45.25',
        value => (value + "").match(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/),
      )
      .required("Ammount is required")
      .max(1000000, "Maximun amount permited is 1000000"),
    Description: Yup.string()
      .max(100, "Description Mast be 100 characters or less")
      .required("Description required"),   
  });
  
    return (
      <Formik
        initialValues={{
          Amount: '',
          Description: ''                          
        }}
        validationSchema={validate}          
        
      >
      <Form>
        <TextField label="Amount" name="Amount" type="Number" />     
        <TextField label="Description" name="Description" type="text" />   
        <Row className='justify-content-md-center'>
        <button className="btn btn-dark mt-3" type="submit">{type}</button>
        </Row>                       
        
      </Form>
    </Formik>                            
  )
  }

  export default Transaction;