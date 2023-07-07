const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.set("view engine", "ejs");

const path = require("path");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

mongoose
	.connect(
		"mongodb+srv://ertanuzunoglu:Ertan6161.@cluster0.iucg0ka.mongodb.net/"
	)
	.then(() => console.log("mongoose bağlantısı kuruldu"))
	.catch((err) => console.log(err));

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(userRoutes);

app.listen(process.env.PORT, function () {
	console.log(`listening on port ${PORT}`);
});
