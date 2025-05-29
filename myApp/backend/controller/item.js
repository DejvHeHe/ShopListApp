const express = require("express");
const router = express.Router();


const CreatedItem= require("../abl/Item/createItem");
const EditItem=require("../abl/Item/editItem");
const GetItem=require("../abl/Item/displayItem")




router.post("/create", CreatedItem);
router.post("/edit",EditItem);
router.get("/display",GetItem)



module.exports = router;