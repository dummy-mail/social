import React, { useEffect, useRef, useState } from 'react'
import Header from '../shared/Header'
import Footer from '../shared/Footer'
import { useFormik } from 'formik'
import ProductSchema from '../../../schemas/ProductSchema'
import axios from 'axios'
import { API_URL } from '../../../util/API'
import { useNavigate } from 'react-router-dom'

const Product = () => {

    let [cate, setCate] = useState([]);
    let [subcate, setSubCate] = useState([]);
    let [products, setProducts] = useState({
        title : "",
        price : "",
        discount : "",
        detail : "",
        category : "",
        subcategory : "",
        image : "",
        quantity : ""
    })
    let file = useRef()
    let navigate = useNavigate();

    let getCate = async() =>{
        let response = await axios.get(`${API_URL}/category`);
        setCate(response.data)
    }
    
    useEffect(()=>{
        getCate();
    }, [])
    
    let getSubCate = async(event) =>{
        let response = await axios.get(`${API_URL}/category/subcategory/${event}`);
        console.log(response.data)
        setSubCate(response.data)
    }


    let proForm = useFormik({
        enableReinitialize : true,
        validationSchema : ProductSchema,
        initialValues : products,
        onSubmit : async(formdata)=>{
            let image = file.current.files[0];
            let newForm = new FormData;
            newForm.append('image', image)
            newForm.append('allData', JSON.stringify(products))
            let response = await axios.post(`${API_URL}/product`, newForm, { headers : { Authorization : localStorage.getItem("Naruto") } })
            if(response.data.success === true){
                navigate(`/admin/product-list`)
            }
        }
    })

  return (
    <>
        <Header />
            <div className="container my-5" style={{minHeight : "700px"}}>
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <form onSubmit={proForm.handleSubmit}>
                        <div className="card">
                            <div className="card-header text-center">
                                <h3>ADD NEW PRODUCT</h3>
                            </div>
                            <div className="card-body">
                                <div className='my-2'>
                                    <label>Product Title</label>
                                    <input type='text' value={proForm.values.title} name='title' onChange={proForm.handleChange} className='form-control' />
                                    {
                                    proForm.errors.title && proForm.touched.title ? <small className="text-danger">{proForm.errors.title}</small> : ''
                                    }
                                </div>
                                <div className='my-2'>
                                    <label>Product Price</label>
                                    <input type='text' value={proForm.values.price} name='price' onChange={proForm.handleChange} className='form-control' />
                                    {
                                    proForm.errors.price && proForm.touched.price ? <small className="text-danger">{proForm.errors.price}</small> : ''
                                    }
                                </div>
                                <div className='my-2'>
                                    <label>Product Image</label>
                                    <input type='file' ref={file} name='image' onChange={proForm.handleChange} className='form-control' />
                                    {
                                    proForm.errors.image && proForm.touched.image ? <small className="text-danger">{proForm.errors.image}</small> : ''
                                    }
                                </div>
                                <div className='my-2'>
                                    <label>Product Category</label>
                                    <select value={proForm.values.category} className='form-control' name='category' onChange={(e)=>{getSubCate(e.target.value); proForm.handleChange(e)}}>
                                    <option value="">Select</option>
                                    {
                                        cate?.map(value=><option value={value.category} key={value._id}>{value.category}</option>)
                                    }
                                    </select>
                                    {
                                    proForm.errors.category && proForm.touched.category ? <small className="text-danger">{proForm.errors.category}</small> : ''
                                    }
                                </div>
                                <div className='my-2'>
                                    <label>Product Sub-Category</label>
                                    <select  value={proForm.values.subcategory} className='form-control' name='subcategory' onChange={proForm.handleChange}>
                                    <option value="">Select</option>
                                    {
                                        subcate?.map(value=><option value={value.subcategory} key={value._id}>{value.subcategory}</option>)
                                    }
                                    </select>
                                    {
                                    proForm.errors.subcategory && proForm.touched.subcategory ? <small className="text-danger">{proForm.errors.subcategory}</small> : ''
                                    }
                                </div>
                                <div className='my-2'>
                                    <label>Product Quantity</label>
                                    <input type='text' value={proForm.values.quantity} name='quantity' onChange={proForm.handleChange} className='form-control' />
                                    {
                                    proForm.errors.quantity && proForm.touched.quantity ? <small className="text-danger">{proForm.errors.quantity}</small> : ''
                                    }
                                </div>
                                <div className='my-2'>
                                    <label>Product Detail</label>
                                    <textarea value={proForm.values.detail} className='form-control' name='detail' onChange={proForm.handleChange}></textarea>
                                    {
                                    proForm.errors.detail && proForm.touched.detail ? <small className="text-danger">{proForm.errors.detail}</small> : ''
                                    }
                                </div>
                                <div className='my-2'>
                                    <label>Product Discount</label>
                                    <input value={proForm.values.discount} type='text' className='form-control' name='discount' onChange={proForm.handleChange}/>
                                    {
                                    proForm.errors.discount && proForm.touched.discount ? <small className="text-danger">{proForm.errors.discount}</small> : ''
                                    }
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type='submit' className='btn btn-primary form-control'>ADD PRODUCT</button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        <Footer />
    </>
  )
}

export default Product