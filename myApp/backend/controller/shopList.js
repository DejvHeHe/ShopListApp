const express = require("express");
const router = express.Router();

const DisplayShopList = require("../abl/ShopList/displayList");
const CreateList = require("../abl/ShopList/createList");


router.get("/display", DisplayShopList);
router.post("/create", CreateList);


module.exports = router;