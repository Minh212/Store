const express = require('express')
const app = express()

const { insertProduct, deleteProduct, getDB } = require('./databaseHandler');

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/add', (req, res) => {
    res.render("add");
})

app.post('/insert', async (req, res) => {
    const nameInput = req.body.txtName;
    const priceInput = req.body.txtPrice;
    const amountInput = req.body.txtAmount;
    const newProduct = { name: nameInput, price: priceInput, amount: amountInput }


    
    
    await insertProduct(newProduct);
    res.redirect("/");
})
app.get('/delete', async (req, res) => {
    const id = req.query.id;

    await deleteProduct(id);
    res.redirect("/");
})

app.post('/search', async (req, res) => {
    const searchInput = req.body.txtSearch;
    const dbo = await getDB()
    const allProducts = await dbo.collection("products").find({ name: searchInput }).toArray();

    res.render('index', { data: allProducts })
})

app.get('/', async (req, res) => {
    const dbo = await getDB();
    const allProducts = await dbo.collection("products").find({}).toArray();
    res.render('index', { data: allProducts })
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("app is running ", PORT)