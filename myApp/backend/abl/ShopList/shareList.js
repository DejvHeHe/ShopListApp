const Ajv = require("ajv");
const ajv = new Ajv();


const listDao = require("../../dao/shopList-DAO");
const userDao=require("../../dao/users-DAO")


const schema = {
  type: "object",
  properties: {
    email: { type: "string" }, 
    shopList:{type:"string"}
  },
  required: ["email","shopList"],
  additionalProperties: false,
};

async function ShareShopList(req,res)
{
    try{
        const user=req.body
    const valid=ajv.validate(schema,user)
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
    const userExist= await userDao.find(user.email);
    if(!userExist)
    {
        return res.status(400).json({
            code:"userDoesNotExist",
            message:`Uživatel s emailem:'${user.email} 'neexistuje`
        })
    }
    const targetList=await listDao.get(user.shopList,ownerID)
    if(!targetList)
    {
        return res.status(400).json({
            code:"shopListDoesNotExist",
            message:"Tento nakupní seznam neexistuje"
        })
    }
    const sharedList= await listDao.share(user.shopList,userExist._id,ownerID)
    return res.json(sharedList)

    }
    catch(e)
    {
        console.error("AddItem error:", e);
        res.status(500).json({ error: e.message || "Nastala chyba." });
    }


}
module.exports=ShareShopList;