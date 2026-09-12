const express = require("express");
const router = express.Router();
const artistsController = require("../controllers/artists");

router.get("/", artistsController.getAll);
router.get("/:id", artistsController.getById);
router.post("/", artistsController.create);
router.put("/:id", artistsController.update);
router.delete("/:id", artistsController.remove);

module.exports = router;