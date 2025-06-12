const Ajv = require("ajv");
const ajv = new Ajv();

const listDao = require("../../dao/shopList-DAO");
const userDao=require("../../dao/users-DAO")


const schema = {
  type: "object",
  properties: {
    ID: { type: "string" },       
  },
  required: ["ID"],
  additionalProperties: false,
};
async function DeleteShopList(req,res) {
  try{
    shopList=req.body
    const valid=ajv.validate(schema,shopList)
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


    const exist=await listDao.get(shopList.ID,ownerID)
    if(!exist)
    {
      return res.status(400).json({
        code:"shopListNotFound",
        message:`Záznam s ID'${shopList.ID}' neexistuje.`
      });

    }
    const shopListDeleted= await listDao.deleteShopList(shopList);
    res.json(shopListDeleted);

  }
  catch(err)
  {
    console.error("Nastala chyba:",err)
  }
  
    
}
module.exports=DeleteShopList;