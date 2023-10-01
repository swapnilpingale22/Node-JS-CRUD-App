const express = require("express");

const urlRoute = require("./routes/url");

const redirectRoute = require("./routes/shortid");

const { connectToMongoDB } = require("./connect")

const app = express();

const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log('MongoDB connected'));

app.use(express.json());

app.use("/url", urlRoute);
app.use("/", redirectRoute);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});