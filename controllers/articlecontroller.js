const Article = require("../models/articleSchema");

// This gets all the data in the Mongo Database
const GetallData = (req, res) => {

    Article.find()
        .then((result) => {
            res.render("index", { mytitle: "Home page", arrArticle: result });
        })
        .catch((err) => {
            console.log(err);
        });
}

// Send Data from the form to the Mongo DataBase
const CreateNewArticle = (req, res) => {
    const article = new Article(req.body);

    article
        .save()
        .then((result) => {
            res.redirect("/all-articles");
        })
        .catch((err) => {
            console.log(err);
        });
}

// Get a Dynamic route using Param through the ID
const DynamicID = (req, res) => {

    Article.findById(req.params.id)
        .then((result) => {
            res.render("details", { mytitle: "ARTICLE DETAILS", objArticle: result });
        })
        .catch((err) => {
            console.log(err);
        });
}

//Delete an Article from the mongo dataBase
const DeleteData = (req, res) => {
    Article.findByIdAndDelete(req.params.id)

        .then((params) => {
            res.json({ mylink: "/all-articles" });
        })

        .catch((err) => {
            console.log(err);
        });
}


module.exports = { GetallData, CreateNewArticle, DynamicID, DeleteData };