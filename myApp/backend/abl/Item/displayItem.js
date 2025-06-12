const itemDao = require("../../dao/item-DAO");
const userDao=require("../../dao/users-DAO");

async function DisplayItems(req, res) {
  try {
    const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ error: "Missing or invalid token" });
        }
    const token = authHeader.split(" ")[1]; // removes 'Bearer '
    const ownerID = await userDao.getOwnerID(token);
        
    const items = await itemDao.display(ownerID); 
    res.json({ itemList: items });
    
  } catch (e) {
    res.status(500).json({ category: e.category || "unknown_error" });
  }
}


module.exports = DisplayItems;
