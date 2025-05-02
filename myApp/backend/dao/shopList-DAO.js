
require('dotenv').config(); // načte proměnné z .env
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function display() {
  try {
    const resultDisplay = await client.db("ShopList").collection("shopList").find().toArray(); // převod na pole    
    return resultDisplay; // můžeš i vrátit, pokud chceš s daty dál pracovat
    
  } catch (err) {
    console.error("Chyba při zobrazování shopList:", err);
  }
}
async function update(item, targetList) {
  try {
    const db = client.db("ShopList");
    const collection = db.collection("shopList");

    // Check if item already exists
    const existingItem = targetList.items.find(i => i.name === item.name);

    if (existingItem) {
      // Update the item's state
      const filter = { name: targetList.name };
      const update = {
        $set: {
          "items.$[elem].state": false,
        }
      };
      const options = {
        arrayFilters: [{ "elem.name": item.name }]
      };

      await collection.updateOne(filter, update, options);
    } else {
      // Add new item to the list
      const filter = { name: targetList.name };
      const update = {
        $push: { items: item },
      };

      await collection.updateOne(filter, update);
    }

    // Now sort the items: true items first, false items last
    const updatedList = await collection.findOne({ name: targetList.name });
    const sortedItems = [...updatedList.items].sort((a, b) => {
      return (b.state === true) - (a.state === true);
    });

    // Update the sorted array
    await collection.updateOne(
      { name: targetList.name },
      { $set: { items: sortedItems } }
    );

    return display()
  } catch (err) {
    console.error(err);
    throw new Error("Chyba při aktualizaci seznamu");
  }
}








async function create(list)
{
  try {
    
    const resultCreate= await client.db("ShopList").collection("shopList").insertOne(list)
    console.log("Inserted document ID:", resultCreate.insertedId);
    return display()
    
  } catch (err) {
    console.error("Error inserting document:", err);
  } 
}

module.exports = {
    display,
    create,
    update
}
    
