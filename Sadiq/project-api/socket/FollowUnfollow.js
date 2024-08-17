let signup = require("../model/userSignup");
let key = require("../config/token_keys");
let jwt = require("jsonwebtoken");


let followUnfollowFunction = (socket) => {
    socket.on('updateDatabase', async({userId}) =>{
        let ID = jwt.decode(userId, key);
        await signup.updateOne({_id : ID?.id}, { $set: { socketid: socket.id } });
    })

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

    socket.on('disconnect', () => {
        // console.log('User disconnected');
    });
}

module.exports = followUnfollowFunction;

// socket