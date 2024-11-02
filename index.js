const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
app.use(express.json());
require('dotenv').config();



// MONGO CONNNECT
const URL = process.env.MONGO_URL
mongoose.connect(URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
})
const cors = require('cors');

const corsOptions = {
    origin: "https://crud-system-client-react-js.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello World');
})


//ROUTES
const ProductRoute = require('./routes/ProductRoute');
app.use('/api/products', ProductRoute);


//SERVER RUNNING
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
