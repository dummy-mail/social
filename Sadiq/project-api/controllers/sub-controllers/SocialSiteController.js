module.exports = (io) => {
    
    let route = require("express").Router()
    let signup = require("../../model/userSignup");
    let jwt = require("jsonwebtoken")
    let key = require("../../config/token_keys");
    const FrndRequest = require("../../model/FrndRequest");
    // const { stringify } = require('flatted/cjs');
    
    //localhost:8080/api/user/authentication/social/site
    route.get("/site", async(req, res)=>{
        let token = req.headers.authorization;
        let ID = jwt.decode(token, key);
        let allAccounts = await signup.find({});
        let userData = await signup.findOne({_id : ID?.id}).lean();
        let userAccounts = allAccounts.filter(user=>user?._id != ID?.id)
         // Sanitize userAccounts if necessary (convert to plain JS objects)
        let sanitizedUserAccounts = userAccounts?.map(account => ({
            _id: account?._id,
            firstname: account?.firstname,
            email: account?.email,
            lastname: account?.lastname,
            followerlist: account?.followerlist,
            followinglist: account?.followinglist,
            referrals: account?.referrals,
            referralcode: account?.referralcode,
            usereferral: account?.usereferral,
            // Add other necessary fields here
        }));
        let senderReceiverData = {
            receiverData : await FrndRequest.find({receiverid : ID?.id}).lean(),
            senderData : await FrndRequest.find({senderid : ID?.id}).lean()
        }
    
        let followerFollowingData = {
            followerlist : userData?.followerlist || [],
            followinglist : userData?.followinglist || []
        }
    
        // Test stringifying each part
        JSON.stringify(sanitizedUserAccounts);  // Sanity check
        JSON.stringify(senderReceiverData);  // Sanity check
        JSON.stringify(followerFollowingData);  // Sanity check
    
        res.send({accounts : sanitizedUserAccounts, senderReceiverData : senderReceiverData, followerFollowingData : followerFollowingData })
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
    
    route.post("/rejectreq", async(req, res)=>{
        let { senderid, receiverid } = req.body;
        await FrndRequest.deleteMany({ receiverid : receiverid, senderid : senderid })
        res.send({ status : 200 })
    });
    
    route.post("/acceptrec", async (req, res) => {
        const { senderid, receiverid } = req.body;
    
            // Find the user document for the receiver
            let receiver = await signup.findOne({ _id: receiverid });
            let sender = await signup.findOne({ _id: senderid });
    
            // Check if the receiver exists
            if (receiver) {
                // Check if the sender ID is already in the `followerlist` array
                if (!receiver?.followerlist.includes(senderid)) {
                    // Update the receiver document by pushing the sender ID into the `followerlist` array
                    await signup.updateOne(
                        { _id: receiverid },
                        { $push: { followerlist: senderid } }
                    );
                    if (sender) {
                        // Check if the sender ID is already in the `followerlist` array
                        if (!sender?.followinglist.includes(receiverid)) {
                            // Update the receiver document by pushing the sender ID into the `followerlist` array
                            await signup.updateOne(
                                { _id: senderid },
                                { $push: { followinglist: receiverid } }
                            );
                            res.send({status : 200})
                        }
                    }
                    // res.send({status : 200})
                }
            } else {
                res.status(404).json({ message: 'Receiver not found' });
            }
            
        await FrndRequest.deleteMany({ receiverid : receiverid, senderid : senderid })
            
        });
    
    route.post("/unfollow", async(req, res)=>{
        let { senderid, receiverid } = req.body;
        await signup.updateOne({ _id : senderid }, { $pull : {followinglist : receiverid} })
        await signup.updateOne({ _id : receiverid }, { $pull : {followerlist : senderid} })
        res.send({ status : 200 })
    })

    const handleSocialSite = (socket, io) =>{

         // Handle follow request
         socket.on('sendFollowRequest', async({ senderId, receiverId }) => {
            let receiverData = await signup.findOne({_id : receiverId})
            // Emit an event to the receiver
            io.to(receiverData?.socketid).emit('receiveFollowRequest', { senderId });
        });
    
        // Handle accept follow request
        socket.on('acceptFollowRequest', async({ senderId, receiverId }) => {
            let senderData = await signup.findOne({_id : senderId})
            // Emit an event to the sender
            io.to(senderData?.socketid).emit('followRequestAccepted', { receiverId });
        });
    
        // Handle reject follow request
        socket.on('rejectFollowRequest', async({ senderId, receiverId }) => {
            let senderData = await signup.findOne({_id : senderId})
            // Emit an event to the sender
            io.to(senderData?.socketid).emit('rejectRequestDone', { receiverId });
        });

    }

    io.on('connection', (socket)=>{
        // console.log("new user is connected")
        socket.on('updateDatabase', async({userId}) =>{
            let ID = jwt.decode(userId, key);
            await signup.updateOne({_id : ID?.id}, { $set: { socketid: socket.id } });
        })
    
        handleSocialSite(socket, io)
    
        socket.on('disconnect', () => {
            // console.log('User disconnected');
        });
    
    });

    return route;
}