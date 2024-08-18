let express = require("express");
let app = express();
let cors = require('cors');
let http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Allow your React app's origin
        methods: ["GET", "POST"], // Allowed methods
        allowedHeaders: ["Authorization"], // Headers you allow
        credentials: true // Allow cookies to be sent
    }
});
let routes = require("./config/AllRoutes")(io);


app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.options('*', cors()); // Pre-flight requests
app.use(routes);


let port = 8080;
server.listen(port, (req, res)=>(
    console.log("server running with port", port)
))

