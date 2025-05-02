const Ajv = require("ajv");
const ajv = new Ajv();

const itemDao = require("../../dao/item-DAO");
const listDao = require("../../dao/shopList-DAO");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    shopList: { type: "string" },
    count: { type: "integer" },
  },
  required: ["name", "shopList"],
  additionalProperties: false,
};

async function AddItem(req, res) {
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

    item.state = true;

    // get all shop lists
    
    const Item = await itemDao.get();
    
        // check for duplicate by name
    const Exist = Item.some((element) => element.name === item.name);
      if (!Exist) {
        return res.status(400).json({
            code: "ItemDoesNotExist",
            message: `Záznam s názvem '${item.name}'  neexistuje.`,
          });
        }   

    
    const shopLists = await listDao.display();
    const targetList = shopLists.find(list => list.name === item.shopList);
    if (!targetList) {
      return res.status(404).json({ 
        message: "Seznam nenalezen.",
        code:"shopListNotFound"
      });
    }
    
    const dupliciteItem = targetList.items.some(i => i.name === item.name);

    if(dupliciteItem)
      {
        return res.status(400).json({
          code: "ItemISAlreadyAdded",
          message: `Záznam s názvem '${item.name}'  je již v seznamu přidán`,
        });

      } 

    const addedItem = await listDao.update(item,targetList);


    res.json(addedItem);
  } catch (e) {
    res.status(500).json({ error: e.message || "Nastala chyba." });
  }
}

module.exports = AddItem;



