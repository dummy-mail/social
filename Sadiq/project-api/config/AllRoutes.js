module.exports = (io) => {

    let routes = require("express").Router();
    
    routes.use("/api", require("../controllers/APIController"))
    routes.use("/api/indiacity", require("../controllers/IndiaCityAPIController"))
    routes.use("/api/authentication", require("../controllers/AuthenticationAPIController"))
    routes.use("/api/user/authentication", require("../controllers/UserAuthenticationAPIController")(io))
    routes.use("/api/banking", require("../controllers/BankController") )
    routes.use("/api/category", require("../controllers/CategoryController") )
    routes.use("/api/product", require("../controllers/ProductController") )
    
    return routes;
} 
