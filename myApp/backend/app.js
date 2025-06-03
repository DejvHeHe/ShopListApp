const cors = require('cors');
const express = require('express')
const app = express()
const port = 5000

app.use(cors());

const itemController = require("./controller/item");
const shopListController = require("./controller/shopList");
const userController=require("./controller/users")
app.use(express.json())
app.use("/item", itemController);
app.use("/shopList", shopListController);
app.use("/users",userController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

