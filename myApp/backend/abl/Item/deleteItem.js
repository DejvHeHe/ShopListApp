const Ajv = require("ajv");
const ajv = new Ajv();

const itemDao = require("../../dao/item-DAO");
const shopListDao=require("../../dao/shopList-DAO")


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
    const exist=await itemDao.get(item.ID)
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