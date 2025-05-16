const itemDao = require("../../dao/item-DAO");

async function DisplayItems(req, res) {
  try {
    const items = await itemDao.display(); 
    res.json({ itemList: items });
    
  } catch (e) {
    res.status(500).json({ category: e.category || "unknown_error" });
  }
}


module.exports = DisplayItems;
