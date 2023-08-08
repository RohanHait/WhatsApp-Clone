const Express = require('express');
const app = Express();
var cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config({
    path: '../vars/.env'
});
const chat = require('./data');

// const { notFound, errorHandel } = require('./middleware/ErrorHandler');

connectDB();
app.use(cors(
    {
        origin: [
            'http://localhost:3000',
            'http://localhost:5000',
            'http://127.0.0.1',
            'http://example.com',
             
            // your origins here
          ],
          credentials: true,
          exposedHeaders: ['set-cookie'],
    }
));
app.use(Express.json());
app.use(cookieParser()) ;
port =  process.env.PORT || 5000;
app.use(Express.static("../whatsapp-clone-ui/build"))
app.use('/api/user', require('./Routes/userRoutes'));
app.use('/api/chat', require('./Routes/chatRoutes'));
app.use('/api/message', require('./Routes/messageRoutes'));
app.get('/',(req,res)=>{
    res.sendFile("../whatsapp-clone-ui/build/index.html") ;
})

// app.use(notFound);
// app.use(errorHandel) ;

// vercel deployment
const server = process.env.VERCEL ? app.listen(()=>console.log("Server Is On Vercel Production")): app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

const socket = require('socket.io')(server, {
    cors: {
        origin: [
            'http://localhost:3000',
            'http://localhost:5000',
        ]
    }
})

socket.on('connection', (socket) => {
    pingTimeout: 60000;
    console.log('socket connected');
    socket.on('set-up',(userData)=>{

        console.log(userData._id)
        socket.join(userData._id) ;
        socket.emit("connected")
    })
    socket.on('join', (chatId) => {
        console.log("User Joined to : ",chatId);
        socket.join(chatId);
    })
    socket.on('send-message', (message) => {
        var chat = message?.chat ;
        if(!chat?.users){
            return ;
        }
        else
        {
            chat.users.forEach(userId  => {
                if(userId !== message.sender._id)
                {
                    socket.in(userId).emit("message-received",message) ;
                }
            });
        }
    })
    socket.on("typing",(room)=>{
        socket.in(room).emit("typing is on")
    })
    socket.on("stop typing",(room)=>{
        socket.in(room).emit("typing is off")
    })
})