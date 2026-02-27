const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Route files
const auth = require('./routes/auth');
const products = require('./routes/product');
const payments = require('./routes/payment');
const orders = require('./routes/order');
const reviews = require('./routes/review');
const customer = require('./routes/customer');
const owner = require('./routes/owner');

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Set static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routers
app.use('/api/auth', auth);
app.use('/api/products', products);
app.use('/api/payments', payments);
app.use('/api/orders', orders);
app.use('/api/reviews', reviews);
app.use('/api/customer', customer);
app.use('/api/owner', owner);



// Basic Route
app.get('/', (req, res) => {
    res.send('Velmora API is running...');
});

// Ping endpoint
app.get('/api/ping', (req, res) => {
    res.json({ message: 'Server is healthy', timestamp: new Date() });
});

// Error Handler
const errorHandler = require('./middleware/error');
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Socket.io Setup
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
