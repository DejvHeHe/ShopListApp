const Ajv = require("ajv");
const ajv = new Ajv();

const itemDao = require("../../dao/item-DAO");
const shopListDao=require("../../dao/shopList-DAO")
const userDao=require("../../dao/users-DAO");


const schema = {
  type: "object",
  properties: {
    ID: { type: "string" },       
  },
  required: ["ID"],
  additionalProperties: false,
};
async function DeleteItem(req,res) {
  try{
    item=req.body
    const valid=ajv.validate(schema,item)
    if(!valid)
    {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        category: "dtoIn is not valid",
        validationError: ajv.errors,
      });
    }
    const authHeader = req.headers['authorization'];
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
              return res.status(401).json({ error: "Missing or invalid token" });
            }
    const token = authHeader.split(" ")[1]; // removes 'Bearer '
    const ownerID = await userDao.getOwnerID(token);

    const exist=await itemDao.get(item.ID,ownerID)
    if(!exist)
    {
      return res.status(400).json({
        code:"itemNotFound",
        message:`Záznam s ID'${item.ID}' neexistuje.`
      });

    }
    
    const itemDeleted= await itemDao.deleteItem(item);
    await shopListDao.removeItemFromShopLists(item.ID)
    res.json(itemDeleted);

  }
  catch(err)
  {
    console.error("Nastala chyba:",err)
  }
  
    
}
module.exports=DeleteItem;