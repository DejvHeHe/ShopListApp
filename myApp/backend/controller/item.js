const express = require("express");
const router = express.Router();

const AddItem= require("../abl/Item/addItem");
const CreatedItem= require("../abl/Item/createItem");
const UncheckItem=require("../abl/Item/uncheckItem");



router.post("/add", AddItem);
router.post("/create", CreatedItem);
router.post("/uncheck",UncheckItem);



module.exports = router;