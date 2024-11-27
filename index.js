import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/route.js';
import http from 'http';
import { Server } from 'socket.io'; 
import message from './model/messageModal.js';

dotenv.config();
const app = express();
const server = http.createServer(app); // Create HTTP server using express app
const io = new Server(server); // Use Server here to initialize Socket.IO

app.use(express.json());

// CORS Configuration
const corsOptions = {
    origin: ['http://localhost:3000'], 
    credentials: true,
    allowedHeaders: 'X-Requested-With, Content-Type, auth-token, Authorization',
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Routes
app.use('/', router);

// Database Connection
console.log("Connecting to database...");
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('MongoDB is connected');
    })
    .catch((err) => {
        console.log(err);
    });

// Socket.IO Connection
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle chat messages or other events
    socket.on('chat message', (data) => {
        console.log(`data received: ${data}`);
        // Broadcast the message to all other clients
        socket.broadcast.emit('chat message', data);
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start Server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
