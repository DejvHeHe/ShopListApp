const Ajv = require("ajv");
const ajv = new Ajv();

const itemDao = require("../../dao/item-DAO");
const listDao = require("../../dao/shopList-DAO");

const schema = {
  type: "object",
  properties: {
    ID: { type: "string" },
    shopList: { type: "string" },
    count: { type: "integer" },
    name: { type: "string" }
  },
  required: ["ID", "shopList"],
  additionalProperties: false,
};

async function AddItem(req, res) {
  try {
    let item = req.body;

    const valid = ajv.validate(schema, item);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input data is not valid.",
        validationError: ajv.errors,
      });
    }

    let ID = item.ID;

    // Try to get item
    let dbItem = await itemDao.get(ID);

    // If it doesn't exist, create it and fetch it again
    if (!dbItem) {
      const newCreatedItem = await itemDao.create({ name: item.name });
      ID = newCreatedItem._id;
      dbItem = await itemDao.get(ID);
    }

    // Update item properties
    dbItem.shopList = item.shopList;
    dbItem.count = item.count;
    dbItem.state = true;

    // Ensure item.ID is up to date
    item.ID = dbItem._id.toString();

    // Get target list
    const targetList = await listDao.get(item.shopList);
    if (!targetList) {
      return res.status(404).json({
        code: "shopListNotFound",
        message: "Seznam nenalezen.",
      });
    }

    // Prevent duplicates
    const duplicate = targetList.items.some(i => i.ID === item.ID);
    if (duplicate) {
      return res.status(400).json({
        code: "ItemIsAlreadyAdded",
        message: `Záznam s ID '${item.ID}' je již v seznamu přidán.`,
      });
    }

    dbItem.name = item.name; // optional, to ensure it's fresh

    // Add to list
    const addedItem = await listDao.update(dbItem, targetList);
    res.json(addedItem);

  } catch (e) {
    console.error("AddItem error:", e);
    res.status(500).json({ error: e.message || "Nastala chyba." });
  }
}

module.exports = AddItem;
