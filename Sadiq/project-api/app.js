let express = require("express");
let app = express();
let routes = require("./config/AllRoutes");

let signup = require("./model/userSignup");
let key = require("./config/token_keys");
let jwt = require("jsonwebtoken")

let cors = require('cors')
let http = require('http')
const { Server } = require('socket.io');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Allow your React app's origin
        methods: ["GET", "POST"], // Allowed methods
        allowedHeaders: ["Authorization"], // Headers you allow
        credentials: true // Allow cookies to be sent
    }
});

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));


io.on('connection', (socket)=>{
    // console.log("new user is connected")

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

});

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.options('*', cors()); // Pre-flight requests
app.use(routes);

let port = 8080;
server.listen(port, (req, res)=>(
    console.log("server running with port", port)
))

