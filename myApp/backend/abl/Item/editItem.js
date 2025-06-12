const Ajv = require("ajv");
const ajv = new Ajv();

const itemDao = require("../../dao/item-DAO");
const shopListDao = require("../../dao/shopList-DAO");
const userDao=require("../../dao/users-DAO");


const schema = {
  type: "object",
  properties: {
    ID: { type: "string" },
    newname:{ type:"string"}      
  },
  required: ["ID","newname"],
  additionalProperties: false,
};
async function EditItem(req,res)
{
    try
    {
        item=req.body
        const valid=ajv.validate(schema,item);
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
        editItem=itemDao.get(item.ID,ownerID)
        if(!editItem)
        {
            return res.status(400).json({
                code: "duplicateEntry",
                message: `Záznam s ID'${item.ID}' neexistuje.`,

            });
        }
         const Item = await itemDao.display();

        // check for duplicate by name
        const isDuplicate = Item.some((element) => element.name === item.newname);
        if (isDuplicate) {
          return res.status(400).json({
            code: "duplicateEntry",
            message: `Záznam s názvem '${item.newname}' už existuje.`,
          });
        }   
        const editedItem= await itemDao.edit(item.ID,item.newname)
        await shopListDao.syncItemToShopLists(item.ID,item.newname)
        
        res.json(editedItem)


    }
    catch (e) {
    res.status(500).json({ error: e.message || "Nastala chyba." });
  }

}
module.exports=EditItem;