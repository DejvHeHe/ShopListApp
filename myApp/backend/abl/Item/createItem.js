const Ajv = require("ajv");
const ajv = new Ajv();

const itemDao = require("../../dao/item-DAO");


const schema = {
  type: "object",
  properties: {
    name: { type: "string" },       
  },
  required: ["name"],
  additionalProperties: false,
};
async function CreateItem(req, res) {
  try {
    let item = req.body;
    // validate input
    const valid = ajv.validate(schema, item);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        category: "dtoIn is not valid",
        validationError: ajv.errors,
      });
    }   

    const Item = await itemDao.get();

    // check for duplicate by name
    const isDuplicate = Item.some((element) => element.name === item.name);
    if (isDuplicate) {
      return res.status(400).json({
        code: "duplicateEntry",
        message: `Záznam s názvem '${item.name}' už existuje.`,
      });
    }   
    
    // create new item
    const createdItem = await itemDao.create(item);

    

    res.json(createdItem);
  } catch (e) {
    res.status(500).json({ error: e.message || "Nastala chyba." });
  }
}
module.exports =CreateItem ;