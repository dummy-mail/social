import React from 'react'
import Home from '../../components/admin/feature/Home'
import Category from '../../components/admin/feature/Category'
import SubCategory from '../../components/admin/feature/SubCategory'
import Product from '../../components/admin/feature/Product'
import ProductList from '../../components/admin/feature/ProductList'

let AdminRoutes = [
    {
        path : 'home',
        element : <Home />
    },
    {
        path : 'category',
        element : <Category />
    },
    {
        path : 'subcategory',
        element : <SubCategory />
    },
    {
        path : 'product',
        element : <Product />
    },
    {
        path : 'product-list',
        element : <ProductList />
    }
]

export default AdminRoutes