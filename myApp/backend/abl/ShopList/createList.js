const Ajv = require("ajv");
const ajv = new Ajv();

const listDao = require("../../dao/shopList-DAO");

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
    list.items=[]
    const ShopList = await listDao.display();

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
