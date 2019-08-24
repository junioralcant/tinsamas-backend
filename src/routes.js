const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");
const UserController = require("./controllers/UserController");
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");
const SessionController = require("./controllers/SessionController");

const routes = new express.Router();
const authMiddleware = require("./middleware/auth");
const upload = multer(uploadConfig);

routes.post("/sessions", SessionController.store);

routes.get("/users", UserController.index);
routes.post("/users", upload.single("avatar"), UserController.store);

routes.post("/users/:id/likes", LikeController.store);
routes.post("/users/:id/dislikes", DislikeController.store);

module.exports = routes;
