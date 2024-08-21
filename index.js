const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const connectDB = require('./db/dbConfig.js')
const categoryRoute = require('./routes/categoryRoute.js') 
const orderRoutes = require('./routes/orderRoute.js')
const cartRoute = require('./routes/cartRoute.js')
const userRoute = require('./routes/userRoute.js')
const authRoute = require('./routes/authRoute.js')


dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ limit: "20kb", extended: true }));
app.use(express.static(path.join(__dirname, "uploads")));


//routes for categories
app.use('/api/v1/category', categoryRoute);
//Routes for Orders
app.use('/api/v1/order', orderRoutes)
//cart Routes
app.use('/api/v1/cart', cartRoute)
//user Routes
app.use('/api/v1/user', userRoute)
//auth routes
app.use('/api/v1/authorization', authRoute)


app.get("/root-route", (req, res) => {
  res.send("hello there!");
});

app.listen(PORT, () => {
  console.log(`E-commerce app is listening on Port ${PORT}`);
});
