const express = require("express");
const router = express.Router();
const albumsController = require("../controllers/albums");

router.get("/", albumsController.getAll);
router.get("/:id", albumsController.getById);
router.post("/", albumsController.create);
router.put("/:id", albumsController.update);
router.delete("/:id", albumsController.remove);

module.exports = router;