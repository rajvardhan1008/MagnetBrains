const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const database = require("./config/database");
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');


const PORT = process.env.PORT || 4000;
dotenv.config();

database.connect();

app.use(express.json());
app.use(cors());

app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/user', userRoutes);

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "server is up and running ...",
	});
});


app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});