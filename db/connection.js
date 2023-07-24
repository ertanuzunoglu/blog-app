const mongoose = require ("mongoose")
const dotenv = require("dotenv")

const DB_PASSWORD = process.env.DB_PASSWORD;

const connectMongo = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://ertanuzunoglu:${DB_PASSWORD}@cluster0.iucg0ka.mongodb.net/`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("MongoDB connection error:", error);
	}
};

module.exports = connectMongo;
