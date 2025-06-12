const Ajv = require("ajv");
const ajv = new Ajv();


const listDao = require("../../dao/shopList-DAO");
const userDao=require("../../dao/users-DAO")


const schema = {
  type: "object",
  properties: {
    ID: { type: "string" },
    newname:{ type:"string"}      
  },
  required: ["ID","newname"],
  additionalProperties: false,
};
async function EditShopList(req,res)
{
    try
    {
        shopList=req.body
        const valid=ajv.validate(schema,shopList);
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
        const editshopList=await listDao.get(shopList.ID,ownerID)
        
        if(!editshopList)
        {
          
            return res.status(400).json({
                code: "DoesNotExist",
                message: `Záznam s ID'${shopList.ID}' neexistuje.`,

            });
        }
        
        const ShopList = await listDao.display(ownerID);
        
            // check for duplicate by name
            const isDuplicate = ShopList.some((element) => element.name === shopList.newname);
            if (isDuplicate) {
              return res.status(400).json({
                code: "duplicateEntry",
                message: `Záznam s názvem '${shopList.newname}' už existuje.`,
              });
            }
        
       const editedShopList=await listDao.edit(shopList.ID,shopList.newname)
        
        res.json(editedShopList)


    }
    catch (e) {
    res.status(500).json({ error: e.message || "Nastala chyba." });
  }

}
module.exports=EditShopList;