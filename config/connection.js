const mongoose = require ("mongoose")
const dotenv = require("dotenv")
dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD;

const connectMongo = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://ertanuzunogl:${DB_PASSWORD}@cluster0.almcin3.mongodb.net/`,
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

export default connectMongo;
