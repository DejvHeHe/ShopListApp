const listDao = require("../../dao/shopList-DAO");
const userDao=require("../../dao/users-DAO");

async function ViewSharedList(req, res) {
  try {
    
    const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ error: "Missing or invalid token" });
        }
        const token = authHeader.split(" ")[1]; // removes 'Bearer '
        const ownerID = await userDao.getOwnerID(token);
        const ShopList = await listDao.viewSharedList(ownerID); // přidáno await
    res.json({ itemList: ShopList });
    
  } catch (e) {
    res.status(500).json({ category: e.category || "unknown_error" });
  }
}


module.exports = ViewSharedList;
