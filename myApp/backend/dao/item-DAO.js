
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

async function get() {
  try {
    const resultDisplayItem = await client.db("ShopList").collection("items").find().toArray(); // převod na pole    
    return resultDisplayItem; // můžeš i vrátit, pokud chceš s daty dál pracovat
    
  } catch (err) {
    console.error("Chyba při zobrazování shopList:", err);
  }
}

async function create(item)
{   

  try {
    const resultCreateItem= await client.db("ShopList").collection("items").insertOne(item)
    
    console.log("Inserted document ID:", resultCreateItem.insertedId);
    return resultCreateItem;
  } catch (err) {
    console.error("Error inserting document:", err);
  } 
}
async function add(item) {
  console.log(`Item '${item.name}' byl přidán do seznamu '${item.shopList}'.`);
}
async function uncheck()
{
  
}


module.exports={
  add,
  create,
  get,
  uncheck
  
}
