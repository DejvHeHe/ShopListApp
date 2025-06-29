const Ajv = require("ajv");
const ajv = new Ajv();

const listDao = require("../../dao/shopList-DAO");
const userDao = require("../../dao/users-DAO");

const schema = {
  type: "object",
  properties: {
    ID: { type: "string" }, 
  },
  required: ["ID"],
  additionalProperties: false,
};

async function viewSharedTo(req, res) {
  try {
    const shopList = req.body;

    const valid = ajv.validate(schema, shopList);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input data is not valid.",
        validationError: ajv.errors,
      });
    }

    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const ownerID = await userDao.getOwnerID(token);

    const shopListExists = await listDao.get(shopList.ID, ownerID);
    if (!shopListExists) {
      return res.status(400).json({
        code: "shopListNotFound",
        message: `Záznam s ID '${shopList.ID}' neexistuje.`,
      });
    }

    // Resolve all users in parallel
    const viewSharedTo = await Promise.all(
      shopListExists.sharedTo.map(id => userDao.findById(id))
    );

    res.json(viewSharedTo);
    
  } catch (e) {
    res.status(500).json({ category: e.category || "unknown_error" });
    console.error("Error in viewSharedTo:", e);

  }
}

module.exports = viewSharedTo;
