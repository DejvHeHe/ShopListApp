const express = require("express");
const router = express.Router();

const DisplayShopList = require("../abl/ShopList/displayList");
const CreateList = require("../abl/ShopList/createList");
const AddItem= require("../abl/ShopList/addItem");
const UncheckItem=require("../abl/ShopList/uncheckItem");
const DeleteShopList=require("../abl/ShopList/deleteList");
const EditShopLIst=require("../abl/ShopList/editList")
const ShareShopList=require("../abl/ShopList/shareList")
const ViewSharedList=require("../abl/ShopList/viewSharedList")
const ViewSharedTo=require("../abl/ShopList/viewSharedTo");
const UnshareList=require("../abl/ShopList/unshareList");


router.get("/display", DisplayShopList);
router.post("/create", CreateList);
router.post("/add", AddItem);
router.post("/uncheck",UncheckItem);
router.post("/delete",DeleteShopList);
router.post("/edit",EditShopLIst);
router.post("/share",ShareShopList);
router.post("/unshare",UnshareList);
router.get("/viewshared",ViewSharedList);
router.post("/viewsharedto",ViewSharedTo);


module.exports = router;