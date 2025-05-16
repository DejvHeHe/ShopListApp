require('dotenv').config(); // Load environment variables from .env
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = process.env.MONGO_URI;

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Ensure connection before any DB operation
async function ensureConnection() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
}

// Display all shop lists
async function display() {
  try {
    await ensureConnection();
    const resultDisplay = await client
      .db("ShopList")
      .collection("shopList")
      .find()
      .toArray();
    return resultDisplay;
  } catch (err) {
    console.error("Chyba při zobrazování shopList:", err);
  }
}

// Get one list by ID
async function get(shopListID) {
  try {
    await ensureConnection();
    const objectId = new ObjectId(shopListID);
    const resultDisplay = await client
      .db("ShopList")
      .collection("shopList")
      .findOne({ _id: objectId }); // ✅ Fixed syntax
    return resultDisplay;
  } catch (err) {
    console.error("Chyba při získávání shopList:", err);
  }
}

// Create a new list
async function create(list) {
  try {
    await ensureConnection();
    const resultCreate = await client
      .db("ShopList")
      .collection("shopList")
      .insertOne(list);
    console.log("Inserted document ID:", resultCreate.insertedId);
    return display(); // Return updated list
  } catch (err) {
    console.error("Error inserting document:", err);
  }
}

// Add or update item in a list
// Add or update item in a list
async function update(item, targetList) {
  try {
    await ensureConnection();
    const db = client.db("ShopList");
    const collection = db.collection("shopList");

    const filter = { _id: targetList._id }; // Use _id for reliable targeting
    const itemId = typeof item.ID === "string" ? item.ID : String(item.ID);

    // Check if the item already exists in the list by ID
    const existingItem = targetList.items.find(i => i.ID === itemId);

    if (existingItem) {
      // Update existing item's state to false
      await collection.updateOne(
        filter,
        {
          $set: {
            "items.$[elem].state": false
          }
        },
        {
          arrayFilters: [{ "elem.ID": itemId }]
        }
      );
    } else {
      // Add new item to the list
      await collection.updateOne(
        filter,
        {
          $push: { items: item }
        }
      );
    }

    // Re-fetch list and sort items: state=true first
    const updatedList = await collection.findOne(filter);

    if (!updatedList || !updatedList.items) {
      throw new Error("Aktualizovaný seznam nelze načíst.");
    }

    const sortedItems = [...updatedList.items].sort((a, b) => {
      return (b.state === true) - (a.state === true);
    });

    // Apply sorted array
    await collection.updateOne(
      filter,
      { $set: { items: sortedItems } }
    );

    return updatedList;
  } catch (err) {
    console.error("Chyba při aktualizaci seznamu:", err);
    throw new Error("Chyba při aktualizaci seznamu");
  }
}


module.exports = {
  display,
  create,
  update,
  get
};
