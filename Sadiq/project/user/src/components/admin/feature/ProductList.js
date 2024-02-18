import React, { useEffect, useState } from 'react'
import Header from '../shared/Header'
import Footer from '../shared/Footer'
import axios from 'axios';
import { API_URL } from '../../../util/API';

const ProductList = () => {

  let [allProducts, setAllProducts] = useState([]);

  let getProducts = async()=>{
    let response = await axios.get(`${API_URL}/product`)
    setAllProducts(response.data)
  }

  useEffect(()=>{
    getProducts();
  }, [])

  return (
    <>
        <Header />
            <div className="container my-5" style={{minHeight : "700px"}}>
                <div className="row">
                    <div className="col-md-10 offset-md-1">
                        <table className="table table-info table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>S.NO.</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Sub-Category</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  allProducts.map((value, index)=>{
                                    return(
                                      <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{value.title}</td>
                                        <td>{value.category}</td>
                                        <td>{value.subcategory}</td>
                                        <td>{value.price}</td>
                                      </tr>
                                    )
                                  })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        <Footer />
    </>
  )
}

export default ProductList