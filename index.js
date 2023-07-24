const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const connectionMongo = require("./db/connection");

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
    
const path = require("path");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

connectionMongo();

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use("/", userRoutes);

app.listen(3000, () =>
	console.log(`listening on port 3000 http://localhost:3000`)
);
