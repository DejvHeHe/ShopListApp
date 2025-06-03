require('dotenv').config(); // Load env vars
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Ensure DB connection
async function ensureConnection() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
}

// Ensure unique index on email
async function ensureEmailUniqueIndex() {
  await client
    .db("ShopList")
    .collection("users")
    .createIndex({ email: 1 }, { unique: true });
}

// Register new user
async function register(user) {
  try {
    await ensureConnection();
    await ensureEmailUniqueIndex(); // Runs once, then is ignored

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const userDoc = {
      email: user.email,
      passwordHash: hashedPassword,
      createdAt: new Date()
    };

    const result = await client
      .db("ShopList")
      .collection("users")
      .insertOne(userDoc);

    return { success: true, userId: result.insertedId };
  } catch (err) {
    if (err.code === 11000) {
      return { success: false, error: "Email already registered." };
    }
    console.error("Registration error:", err);
    return { success: false, error: "Something went wrong." };
  }
}

module.exports = { register };
