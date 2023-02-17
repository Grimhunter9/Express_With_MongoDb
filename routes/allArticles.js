const express = require("express");
const router = express.Router();
const Article = require("../controllers/articlecontroller");



// This gets all the data in the Mongo Database
router.get("/", Article.GetallData);

// Send Data from the form to the Mongo DataBase
router.post("/", Article.CreateNewArticle);

// Get a Dynamic route using Param through the ID
router.get("/:id", Article.DynamicID);

//Delete an Article from the mongo dataBase
router.delete("/:id",Article. DeleteData);


module.exports = router