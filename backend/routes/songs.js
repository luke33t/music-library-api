const express = require("express");
const router = express.Router();
const songsController = require("../controllers/songs");

router.get("/", songsController.getAll);
router.get("/:id", songsController.getById);
router.post("/", songsController.create);
router.put("/:id", songsController.update);
router.delete("/:id", songsController.remove);

module.exports = router;