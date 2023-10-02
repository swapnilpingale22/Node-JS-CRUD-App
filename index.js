require("dotenv").config();

const express = require("express");

const path = require("path");

const urlRoute = require("./routes/url");

const staticRoute = require("./routes/staticRouter");

const redirectRoute = require("./routes/shortid");

const { connectToMongoDB } = require("./connect")

const URL = require('./models/url')

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

const port = process.env.PORT;

//local DB
// connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
//     .then(() => console.log('MongoDB connected'));

connectToMongoDB("mongodb+srv://swapnil:cws123@cluster0.ys61ljb.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('MongoDB connected'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test/allurl", async (req, res) => {

    const allUrls = await URL.find({});
    return res.render("home", { urls: allUrls, });
});

app.use("/url", urlRoute);
app.use("/id", redirectRoute);

app.use("/", staticRoute);



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



{/* <div class="container">
<% urls.forEach(url=> { %>
    <li>
        <%= url.shortId %> - <%= url.redirectUrl %> - <%= url.visitHistory.length %>
    </li>
    <% }) %>
</div> */}