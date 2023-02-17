//  to controll ur website
const express = require("express");
const app = express();
const port = 5000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const All_articleRoutes = require("./routes/allArticles");
const helmet = require("helmet");



// for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


// Get the mongoose library and connect the App with the monogo DataBase
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://Samer:YfQYrX5PZIoIU09y@cluster0.asj0hcp.mongodb.net/MyData?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(process.env.PORT  || port, () => {
      console.log("Example app listening at http://localhost:5000");
    });
  })

  .catch((err) => {
    console.log(err);
  });



app.use(helmet());

app.get("/", (req, res) => {
  res.redirect("/all-articles");
});


// We use the {} after the render function to change the title in the app when changing routes
app.get("/add-new-article", (req, res) => {
  res.render("add-new-article", { mytitle: "create new article" });
});

app.use("/all-articles", All_articleRoutes)


//  Gives a 404 page when the route isn't available
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});
