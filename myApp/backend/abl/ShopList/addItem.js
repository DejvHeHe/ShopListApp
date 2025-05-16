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
  },
  required: ["ID", "shopList"],
  additionalProperties: false,
};

async function AddItem(req, res) {
  try {
    let item = req.body;

    // Validate input
    const valid = ajv.validate(schema, item);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input data is not valid.",
        validationError: ajv.errors,
      });
    }

    item.state = true;
    const ID=item.ID

    // Get item by ID
    const Item = await itemDao.get(ID);
    if (!Item) {
      return res.status(400).json({
        code: "ItemDoesNotExist",
        message: `Záznam s ID '${ID}' neexistuje.`,
      });
    }
    const shopListID=item.shopList
    // Get target list
    const targetList = await listDao.get(shopListID);
    if (!targetList) {
      return res.status(404).json({
        code: "shopListNotFound",
        message: "Seznam nenalezen.",
      });
    }

    // Check for duplicate
    const dupliciteItem = targetList.items.some(i => i.ID === item.ID);
    if (dupliciteItem) {
      return res.status(400).json({
        code: "ItemIsAlreadyAdded",
        message: `Záznam s ID '${item.ID}' je již v seznamu přidán.`,
      });
    }
    item.name=Item.name
    // Add item to list
    const addedItem = await listDao.update(item, targetList);
    res.json(addedItem);

  } catch (e) {
    res.status(500).json({ error: e.message || "Nastala chyba." });
  }
}

module.exports = AddItem;
