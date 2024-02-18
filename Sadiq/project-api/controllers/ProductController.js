let route = require("express").Router();
let product = require('../model/Products')
let categories = require('../model/Categories')
let path = require('path')

route.get('/', async(req, res)=>{
    let allProducts = await product.find({});
    res.send(allProducts)
})


route.get('/:id', async(req, res)=>{

})


route.post('/', async(req, res)=>{
    if(req.headers.authorization){
        // let checkCate = req.body.category;
        // let checkSubCate = req.body.subcategory;
        // let Category = await categories.find({ category : checkCate });
        // let SubCategory = await categories.find({ subcategory : checkSubCate });
        // if(Category.length === 0){
        //     if(SubCategory.length === 0){
        //         await product.create(req.body)
        //         res.send({ success : true })
        //     }
        // }

        let formdata = JSON.parse(req.body.alldata);
        let image = req.files.image;
        console.log(formdata)
        console.log(image)
        return;
        image.mv(path.resolve()+'/assets/product-images'+image.name)
    }
})


route.put('/:id', async(req, res)=>{

})


route.delete('/:id', async(req, res)=>{

})

module.exports = route;