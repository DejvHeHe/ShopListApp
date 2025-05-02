const Ajv = require("ajv");
const ajv = new Ajv();

const itemDao = require("../../dao/item-DAO");
const listDao = require("../../dao/shopList-DAO");


const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    shopList:{type:"string"}       
  },
  required: ["name","shopList"],
  additionalProperties: false,
};
async function UncheckItem(req, res) {
    try {
      const item = req.body;
      const valid = ajv.validate(schema, item);
      if (!valid) {
        return res.status(400).json({
          code: "dtoInIsNotValid",
          category: "dtoIn is not valid",
          validationError: ajv.errors,
        });
      }
  
      // Najdi seznam podle názvu
      const shopLists = await listDao.display();
      const targetList = shopLists.find(list => list.name === item.shopList);
      if (!targetList) {
        return res.status(404).json({ message: "Seznam nenalezen." });
      }

  
      // Zavolej funkci update, která přidá položku, pokud neexistuje, nebo ji upraví, pokud existuje
      const updatedList = await listDao.update(item, targetList);
  
      // Odeslat zpět aktualizovaný seznam
      res.json(updatedList);
    } catch (e) {
      res.status(500).json({ error: e.message || "Nastala chyba." });
    }
  }
  
module.exports=UncheckItem;