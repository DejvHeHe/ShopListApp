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

    const filter = { _id: targetList._id };
    const itemId = typeof item._id === "object" ? item._id.toString() : item.ID;

    // Normalize item ID field for matching
    const existingItemIndex = targetList.items.findIndex(i => i.ID === itemId);

    if (existingItemIndex !== -1) {
      // Update existing item's state to false
      await collection.updateOne(
        filter,
        {
          $set: {
            [`items.${existingItemIndex}.state`]: false
          }
        }
      );
    } else {
      // Ensure item has an ID field for insertion
      item.ID = itemId;

      // Push new item
      await collection.updateOne(
        filter,
        {
          $push: { items: item }
        }
      );
    }

    // Re-fetch and sort
    const updatedList = await collection.findOne(filter);
    if (!updatedList || !Array.isArray(updatedList.items)) {
      throw new Error("Aktualizovaný seznam nelze načíst.");
    }

    const sortedItems = [...updatedList.items].sort((a, b) => {
      return (b.state === true) - (a.state === true);
    });

    // Save sorted array back
    await collection.updateOne(
      filter,
      { $set: { items: sortedItems } }
    );

    return {
      ...updatedList,
      items: sortedItems
    };
  } catch (err) {
    console.error("Chyba při aktualizaci seznamu:", err);
    throw new Error("Chyba při aktualizaci seznamu");
  }
}
async function syncItemToShopLists(ID,name)
{
  try
  {
    await ensureConnection()
    const removeItem = await client
      .db("ShopList")
      .collection("shopList")
      .updateMany(
      { 'items.ID': ID.toString() },
      {
        $set: {
          'items.$[elem].name': name, // Update other fields as needed
          // add more fields here if item structure grows
        }
      },
      {
        arrayFilters: [{ 'elem.ID': ID.toString() }]
      }
    );



  }
  catch(err)
  {
    console.error("Chyba při upravě položky",err)
  }

}
async function removeItemFromShopLists(itemId) {
  try {
    await ensureConnection(); // <- this should be awaited!

    const removeItem = await client
      .db("ShopList")
      .collection("shopList")
      .updateMany(
        {},
        { $pull: { items: { ID: itemId.toString() } } }
      );

    console.log(`Removed item ${itemId} from ${removeItem.modifiedCount} shopLists`);
  } catch (err) {
    console.error("Chyba při odstraňování itemu ze shopList:", err);
    throw new Error("Nepodařilo se odstranit item ze shopList");
  }
}

async function deleteShopList(shopList)
{
  try
  {
    await ensureConnection();
    const { ObjectId } = require("mongodb");
    const deletedShopList= await client
    .db("ShopList")
    .collection("shopList")
    .deleteOne({ _id: new ObjectId(shopList.ID) })

    return deletedShopList

  }
  catch(err)
  {
    console.error("Error while deleting shopList",err)

  }
}



module.exports = {
  display,
  create,
  update,
  get,
  deleteShopList,
  removeItemFromShopLists,
  syncItemToShopLists
};
