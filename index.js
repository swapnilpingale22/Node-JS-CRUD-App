require("dotenv").config();

const express = require("express");

const urlRoute = require("./routes/url");

const redirectRoute = require("./routes/shortid");

const { connectToMongoDB } = require("./connect")

const app = express();

const port = process.env.PORT;

//local DB
// connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
//     .then(() => console.log('MongoDB connected'));

connectToMongoDB("mongodb+srv://swapnil:cws123@cluster0.ys61ljb.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('MongoDB connected'));

app.use(express.json());

app.use("/url", urlRoute);
app.use("/", redirectRoute);



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});