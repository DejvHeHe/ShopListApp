const listDao = require("../../dao/shopList-DAO");

async function DisplayShopList(req, res) {
  try {
    const ShopList = await listDao.display(); // přidáno await
    res.json({ itemList: ShopList });
    
  } catch (e) {
    res.status(500).json({ category: e.category || "unknown_error" });
  }
}


module.exports = DisplayShopList;
