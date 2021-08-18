const { ObjectId, MongoClient } = require('mongodb');
const url = 'mongodb+srv://minh212:minh212212@cluster0.xmrhr.mongodb.net/test';

async function getDB() {
    const client = await MongoClient.connect(url);
    const dbo = client.db("StoreDB");
    return dbo;
}

async function insertProduct(newProduct) {
    const dbo = await getDB();
    await dbo.collection("products").insertOne(newProduct);
}

async function deleteProduct(id) {
    const dbo = await getDB();
    await dbo.collection("products").deleteOne({ "_id": ObjectId(id) });
}
module.exports = { getDB, insertProduct, deleteProduct }