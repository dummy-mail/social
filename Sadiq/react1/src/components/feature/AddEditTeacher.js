import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios'

let FormValidation = yup.object({
    name : yup.string().required("Enter Your Name"),
    age : yup.number().required("Enter Your Age"),
    salary : yup.number().required("Enter Your Salary"),
    city : yup.string().required("Select Your City")
})

const AddEditTeacher = () => {

    let [data, setData] = useState({
        name : "",
        city : "",
        age : "",
        salary : ""
    })
    let param = useParams()
    let navigate = useNavigate()

    useEffect(()=>{
        if(param.id){
            axios.get(`http://localhost:8080/teacher/${param.id}`).then(response=>{
                setData(response.data)
            })
        }
    }, [])

    let Form = useFormik({
        enableReinitialize : true,
        validationSchema : FormValidation,
        initialValues : data,
        onSubmit : (formData) =>{
            if(param.id){
                axios.put(`http://localhost:8080/teacher/${param.id}`, formData).then(response=>{
                    navigate(`/teacher`)
                })
            }else{
                axios.post('http://localhost:8080/teacher', formData).then(response=>{
                    navigate("/teacher")
                })
            }
        }
    })

  return (
    <>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 offset-md-2 my-5'>
                    <form onSubmit={Form.handleSubmit}>
                    <div className='card'>
                        <div className='card-header text-center'>
                            <h3>{param.id ? 'Update Teacher' : 'Add Teacher'}</h3>
                        </div>
                        <div className='card-body'>
                            <div className='my-3'>
                                <label>Name</label>
                                <input type='text' value={Form.values.name} name='name' placeholder='Enter Your Name' onChange={Form.handleChange} className={'form-control ' + (Form.errors.name && Form.touched.name ? 'is-invalid' : null)} />
                                {
                                    Form.errors.name && Form.touched.name ? <small className='text-danger'>{Form.errors.name}</small> : null
                                }
                            </div>
                            <div className='my-3'>
                                <label>Age</label>
                                <input type='text' name='age' value={Form.values.age} placeholder='Enter Your Age' onChange={Form.handleChange} className={'form-control ' + (Form.errors.age && Form.touched.age ? 'is-invalid' : null)} />
                                {
                                    Form.errors.age && Form.touched.age ? <small className='text-danger'>{Form.errors.age}</small> : null
                                }
                            </div>
                            <div className='my-3'>
                                <label>Salary</label>
                                <input type='text' name='salary' value={Form.values.salary} placeholder='Enter Your Salary' onChange={Form.handleChange} className={'form-control ' + (Form.errors.salary && Form.touched.salary ? 'is-invalid' : null)} />
                                {
                                    Form.errors.salary && Form.touched.salary ? <small className='text-danger'>{Form.errors.salary}</small> : null
                                }
                            </div>
                            <div className='my-3'>
                                <label>City</label>
                                <select name='city' value={Form.values.city} onChange={Form.handleChange} className={'form-control ' + (Form.errors.city && Form.touched.city ? 'is-invalid' : null)} >
                                    <option value=''>Select</option>
                                    <option value='indore'>Indore</option>
                                    <option value='pune'>Pune</option>
                                    <option value='mumbai'>Mumbai</option>
                                    <option value='delhi'>Delhi</option>
                                </select>
                                {
                                    Form.errors.city && Form.touched.city ? <small className='text-danger'>{Form.errors.city}</small> : null
                                }
                            </div>
                        </div>
                        <div className='card-footer'>
                            <button className='btn form-control btn-primary' type='submit'>{param.id ? 'UPDATE' : 'ADD' }</button>
                        </div> 
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddEditTeacher