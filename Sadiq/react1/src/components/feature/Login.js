import React from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'


let LoginValidation = yup.object({
    email : yup.string().email("Enter a Valid Email ID").required("Enter Your Email ID"),
    password : yup.string().required("Enter Your Password")
})

const Login = () => {

    let lgnFrm = useFormik({
        validationSchema : LoginValidation,
        initialValues : {
            email : "",
            password : ""
        },
        onSubmit : async(formData) =>{

        }
    })

  return (
    <>
        <div className='container my-3' style={{minHeight : "600px"}}>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    <form onSubmit={lgnFrm.handleSubmit}>
                    <div className='card'>
                        <div className='card-header text-center'>
                            <h4>User Login</h4>    
                        </div>    
                        <div className='card-body'>
                            <div className='my-3'>
                                <input type='text' name='email' onChange={lgnFrm.handleChange}  placeholder='Enter Your Email ID' className={'form-control ' + (lgnFrm.errors.email && lgnFrm.touched.email ? 'is-invalid' : "")} />
                                {
                                    lgnFrm.errors.email && lgnFrm.touched.email ? <small className='text-danger'>{lgnFrm.errors.email}</small> : ""
                                }
                            </div>
                            <div className='my-3'>
                                <input type='text' name='password' onChange={lgnFrm.handleChange}  placeholder='Enter Your Password' className={'form-control '+ (lgnFrm.errors.password && lgnFrm.touched.password ? 'is-invalid' : "")} />
                                {
                                    lgnFrm.errors.password && lgnFrm.touched.password ? <small className='text-danger'>{lgnFrm.errors.password}</small> : ""
                                }
                            </div>
                        </div>
                        <div className='card-footer'>
                            <button type='submit' className='btn btn-primary form-control'>Login</button>
                        </div>
                    </div>    
                    </form>
                </div>    
            </div>    
        </div> 
    </>
  )
}

export default Login