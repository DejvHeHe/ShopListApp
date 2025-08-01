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
async function display(ownerID) {
  try {
    await ensureConnection();
    console.log(ownerID)
    const resultDisplay = await client
      .db("ShopList")
      .collection("shopList")
      .find({ownerID:ownerID})
      .toArray();
      
    return resultDisplay;
  } catch (err) {
    console.error("Chyba při zobrazování shopList:", err);
  }
}

// Get one list by ID
async function get(shopListID,ownerID) {
  try {
    await ensureConnection();
    const objectId = new ObjectId(shopListID);
    const resultGet = await client
    .db("ShopList")
    .collection("shopList")
    .findOne({
      _id: objectId,
      $or: [
        { ownerID: ownerID },
        { sharedTo: new ObjectId(ownerID) }
      ]
    });

    console.log(resultGet)
    return resultGet;
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
    const itemId = item._id?.toString(); // Use only _id

    // Normalize for matching
    const existingItemIndex = targetList.items.findIndex(
      i => i._id?.toString() === itemId
    );

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
      // Push new item without introducing 'ID' field
      const { _id, name, count, state } = item;

      await collection.updateOne(
        filter,
        {
          $push: {
            items: {
              _id,
              name,
              count,
              state
            }
          }
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

async function syncItemToShopLists(ID, name, ownerID) {
  try {
    await ensureConnection();

    

    const result = await client
      .db("ShopList")
      .collection("shopList")
      .updateMany(
        {
          ownerID: ownerID,
          'items._id': new ObjectId(ID)
        },
        {
          $set: {
            'items.$[elem].name': name
          }
        },
        {
          arrayFilters: [{ 'elem._id': new ObjectId(ID) }]
        }
      );

    console.log(`Updated ${result.modifiedCount} lists`);
    return result;
  } catch (err) {
    console.error("Chyba při upravě položky", err);
  }
}

async function removeItemFromShopLists(itemId, ownerID) {
  try {
    await ensureConnection();

    const result = await client
      .db("ShopList")
      .collection("shopList")
      .updateMany(
        { ownerID: ownerID },
        { $pull: { items: { _id: new ObjectId(itemId) } } }
      );

    console.log(`Removed item ${itemId} from ${result.modifiedCount} shopLists`);
    return result;
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
async function edit(ID,name)
{
  try{
    
    await ensureConnection()
    const editedShopList=await client
    .db("ShopList")
    .collection("shopList")
    .updateOne(
      { _id: new ObjectId(ID) },
      {
        $set:{'name':name}
      }
    
    );
    return editedShopList
  }
  catch(err)
  {
    console.error("Error while editting shopList",err)
  }

}
async function share(shopList,user,ownerID)
{
  try{
    await ensureConnection();
    const sharedShopList = await client
    .db("ShopList")
    .collection("shopList")
    .updateOne(
      { _id: new ObjectId(shopList), ownerID: ownerID },
      { $addToSet: { sharedTo: new ObjectId(user) } }
    );
    return sharedShopList;


  }
  catch(err)
  {
    console.error("Error while sharing",err)
  }


}
async function unshare(shopList, user, ownerID) {
  try {
    await ensureConnection();
    const result = await client
      .db("ShopList")
      .collection("shopList")
      .updateOne(
        { _id: new ObjectId(shopList), ownerID: ownerID },
        { $pull: { sharedTo: new ObjectId(user) } }
      );
    return result;
  } catch (err) {
    console.error("Error while unsharing", err);
  }
}

async function viewSharedList(ownerID)
{
  try {
    await ensureConnection();
    
    const resultDisplay = await client
      .db("ShopList")
      .collection("shopList")
      .find({sharedTo:new ObjectId(ownerID)})
      .toArray();
      
    return resultDisplay;
  } catch (err) {
    console.error("Chyba při zobrazování shopList:", err);
  }

}



module.exports = {
  display,
  create,
  update,
  get,
  deleteShopList,
  removeItemFromShopLists,
  syncItemToShopLists,
  edit,
  share,
  unshare,
  viewSharedList
};
