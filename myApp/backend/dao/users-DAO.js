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
async function login(user) {
  try{
    await ensureConnection()
    const jwt = require('jsonwebtoken');
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const userFound=await find(user.email)
    const isMatch=await bcrypt.compare(user.password, userFound.passwordHash);
    if(!isMatch)
    {
      return { success: false, error: "You have wrong password" };
    }
    
    const token = jwt.sign(
      { userId: userFound._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return token

  }
  catch(err)
  {
    console.error("Login error",err)
    return { success: false, error: "Something went wrong." };
  }
  
}
async function find(email)
{
  await ensureConnection()
  const user=await client
  .db("ShopList")
  .collection("users")
  .findOne({email})
  if (!user) {
  
    return { success: false, error: "Thsi user doesnt exist" };
  }
  return user;


}
async function getOwnerID(token) {
  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded userId:", decoded.userId); // ✅ CORRECT property name
    return decoded.userId;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
}


module.exports = { 
  register,
  login,
  find,
  getOwnerID

 };
