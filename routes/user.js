const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const Category = require("../models/category");

router.get("/blogs/category/:categoryid", async function (req, res) {
	const id = req.params.categoryid
	try {
		const blogs = await Blog.find({category_id:id}).lean();
		const categories = await Category.find().lean();

		res.status(200).render("users/blogs", {
			title: "Kurslar",
			categories: categories,
			blogs: blogs,
			selectedCategory: id
		});

	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: "fail",
			error,
		});
	}
});

router.get("/blogs/:blogid", async function (req, res) {
	const id = req.params.blogid;
	try {
		const blog = await Blog.findOne({ _id: id });
		res.render("users/blog-details", {
			title: blog.baslik,
			blog: blog,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: "fail",
			error,
		});
	}
});

router.get("/blogs", async function (req, res) {
	try {
		const blogs = await Blog.find({ onay: true }).lean();
		const categories = await Category.find().lean();

		res.render("users/blogs", {
			title: "Tüm Kurslar",
			categories: categories,
			blogs: blogs,
			selectedCategory: null
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: "fail",
			error,
		});
	}
});

router.get("/", async function (req, res) {
	try {
		const blogs = await Blog.find({ anasayfa: true, onay: true }).lean();
		const categories = await Category.find().lean();

		res.status(200).render("users/index", {
			title: "Popüler Kurslar",
			categories: categories,
			blogs: blogs,
			selectedCategory: null

		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			status: "fail",
			error,
		});
	}
});



module.exports = router;
