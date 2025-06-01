const Ajv = require("ajv");
const ajv = new Ajv();

const itemDao = require("../../dao/item-DAO");
const shopListDao = require("../../dao/shopList-DAO");


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
        editItem=itemDao.get(item.ID)
        if(!editItem)
        {
            return res.status(400).json({
                code: "duplicateEntry",
                message: `Záznam s ID'${item.ID}' už existuje.`,

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