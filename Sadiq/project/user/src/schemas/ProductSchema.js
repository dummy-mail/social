import * as yup from 'yup'

let ProductSchema = yup.object({
    title : yup.string().required("Enter Your Product Title"),
    detail : yup.string().required("Enter Your Product Description"),
    category : yup.string().required("Select Your Product Category"),
    subcategory : yup.string().required("Select Your Product SubCategory"),
    image : yup.string().required("Select Your Product Image"),
    quantity : yup.number().typeError("Entered Quantity Should be Number").required("Enter Your Product Quantity"),
    price : yup.number().typeError("Entered Price Should be Number").required("Enter Your Product Price"),
    discount : yup.number().typeError("Entered Discount Should be Number").required("Enter Your Product Discount")
})

export default ProductSchema;