require("../config/DataBase")

let mongoose = require("mongoose")

let FrndReqSchema = mongoose.Schema({
    
    sender : { type : String, default : "" },
    receiver : { type : String, default : "" }

}, {collection : "frndreq"})

let FrndReqModel = mongoose.model("frndreq", FrndReqSchema);

module.exports = FrndReqModel;