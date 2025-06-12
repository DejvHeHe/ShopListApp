const Ajv = require("ajv");
const ajv = new Ajv();


const listDao = require("../../dao/shopList-DAO");
const userDao=require("../../dao/users-DAO")

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false,
};

async function CreateList(req, res) {
  try {
    let list = req.body;

    // validate input
    const valid = ajv.validate(schema, list);
    if (!valid) {
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
    
    list.ownerID=ownerID
    
    list.items=[]
    const ShopList = await listDao.display(list.ownerID);

    // check for duplicate by name
    const isDuplicate = ShopList.some((element) => element.name === list.name);
    
    if (isDuplicate) {
      return res.status(400).json({
        code: "duplicateEntry",
        message: `Záznam s názvem '${list.name}' už existuje.`,
      });
    }

    // create new list
    const createdList = await listDao.create(list);

    res.json(createdList);
  } catch (e) {
    res.status(500).json({ error: e.message || "Nastala chyba." });
  }
}

module.exports = CreateList;
