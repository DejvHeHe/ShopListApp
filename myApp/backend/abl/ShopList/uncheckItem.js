const Ajv = require("ajv");
const ajv = new Ajv();

const listDao = require("../../dao/shopList-DAO");
const userDao = require("../../dao/users-DAO");
const { ObjectId } = require("mongodb");

const schema = {
  type: "object",
  properties: {
    ID: { type: "string" },
    shopList: { type: "string" }
  },
  required: ["ID", "shopList"],
  additionalProperties: false,
};

async function UncheckItem(req, res) {
  try {
    const item = req.body;

    const valid = ajv.validate(schema, item);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input data is not valid.",
        validationError: ajv.errors,
      });
    }

    const authHeader = req.headers['authorization'];
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const ownerID = await userDao.getOwnerID(token);

    const targetList = await listDao.get(item.shopList, ownerID);
    if (!targetList) {
      return res.status(404).json({ message: "List not found." });
    }

   
    item._id = new ObjectId(item.ID);
    console.log(item._id)

    const updatedList = await listDao.update(item, targetList);
    res.json(updatedList);
  } catch (e) {
    console.error("UncheckItem error:", e);
    res.status(500).json({ error: e.message || "Unexpected error occurred." });
  }
}

module.exports = UncheckItem;
