const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");
const UserController = require("./controllers/UserController");
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get("/users", UserController.index);
routes.post("/users", upload.single("avatar"), UserController.store);

routes.post("/users/:id/likes", LikeController.store);
routes.post("/users/:id/dislikes", DislikeController.store);

module.exports = routes;
