let route = require("express").Router()
let signup = require("../../model/userSignup");
let jwt = require("jsonwebtoken")
let key = require("../../config/token_keys");
const FrndRequest = require("../../model/FrndRequest");


//localhost:8080/api/user/authentication/social/site
route.get("/site", async(req, res)=>{
    let token = req.headers.authorization;
    let ID = jwt.decode(token, key);
    let allAccounts = await signup.find({});
    let User = await FrndRequest.find({senderid : ID?.id});
    let receiverData = await FrndRequest.find({receiverid : ID?.id});
    let userAccounts = allAccounts.filter(user=>user?._id != ID?.id)
    res.send({accounts : userAccounts, senderData : User, receiverData : receiverData})
})

route.post("/follow", async(req, res)=>{
    let { senderid, receiverid } = req.body;
    let allReq = await FrndRequest.findOne({ receiverid : receiverid, senderid : senderid });
    if(allReq?.length === 0 || allReq === null ){
        await FrndRequest.create(req.body)
        res.send({ status : 200 })
    }else{
        res.send({ status : 404 })
    }
});

route.post("/cancelreq", async(req, res)=>{
    let { senderid, receiverid } = req.body;
    await FrndRequest.deleteMany({ receiverid : receiverid, senderid : senderid })
    res.send({ status : 200 })
});

route.get("/request", async(req, res)=>{
    if(req.headers.authorization){
        let token = req.headers.authorization;
        let ID = jwt.decode(token, key);
        let reqData = await FrndRequest.find({ senderid : ID.id })
        let Sender = await signup.find({ _id : ID.id })
        let allRequests = [];
        reqData.forEach(value => {
            if(reqData.senderid != value.receiverid){
                allRequests = value.receiverid
            }
        });
        console.log(allRequests)
        
        res.send({ status : 200 })
    }
})

module.exports = route;