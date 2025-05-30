const express = require("express");
const router = express.Router();

const DisplayShopList = require("../abl/ShopList/displayList");
const CreateList = require("../abl/ShopList/createList");
const AddItem= require("../abl/ShopList/addItem");
const UncheckItem=require("../abl/ShopList/uncheckItem");
const UncheckItem=require("../abl/ShopList/deleteList");


router.get("/display", DisplayShopList);
router.post("/create", CreateList);
router.post("/add", AddItem);
router.post("/uncheck",UncheckItem);
router.get("/delete",DeleteShopList)


module.exports = router;