const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const Category = require("../models/category");

router.get("/blogs/delete/:blogid", async function (req, res) {
	const id = req.params.blogid;
	try {
		const blog = await Blog.findOne({ _id: id }).lean();
		res.render("admin/blog-delete", {
			title: blog.baslik,
			blog: blog,
		});
	} catch (error) {
		console.log(error);
	}
});

router.post("/blogs/delete/:blogid", async function (req, res) {
	const id = req.params.blogid;
	try {
		await Blog.findOneAndDelete({ _id: id });
		res.redirect("/admin/blogs?action=delete");
	} catch (error) {
		console.log(error);
	}
});

router.get("/blog/create", async function (req, res) {
	try {
		const categories = await Category.find().lean();
		res.render("admin/blog-create", {
			title: "Başlık",
			categories: categories,
		});
	} catch (error) {}
});

router.post("/blog/create", async function (req, res) {
	const baslik = req.body.baslik;
	const aciklama = req.body.aciklama;
	const resim = req.body.resim;
	const anasayfa = req.body.anasayfa == "on" ? true : false;
	const onay = req.body.onay == "on" ? true : false;
	try {
		await Blog.create({
			baslik: baslik,
			aciklama: aciklama,
			resim: resim,
			anasayfa: anasayfa,
			onay: onay,
		});
		res.redirect("/admin/blogs?action=create");
	} catch (error) {
		console.log(error);
	}
});

router.get("/blogs/:blogid", async function (req, res) {
	const id = req.params.blogid;
	const blog = await Blog.findOne({ _id: id });
	const categories = await Category.find();
	const title = blog.baslik;
	res.render("admin/blog-edit", {
		blog: blog,
		title: title,
		categories: categories,
	});
});

router.post("/blogs/:blogid", async function (req, res) {
	const id = req.params.blogid;
	console.log(req.body);
	const update = {
		baslik: req.body.baslik,
		aciklama: req.body.aciklama,
		resim: req.body.resim,
		anasayfa: req.body.anasayfa == "on" ? true : false,
		onay: req.body.onay == "on" ? true : false,
		category_id: req.body.kategori,
	};

	try {
		await Blog.findOneAndUpdate({ _id: id }, update);
		res.redirect("/admin/blogs?action=edit");
	} catch (error) {
		console.log(error);
	}
});

router.get("/blogs", async function (req, res) {
	try {
		const title = "Title";
		const blogs = await Blog.find().select("baslik resim _id").lean();
		res.render("admin/blog-list", {
			blogs: blogs,
			title: title,
			action: req.query.action,
		});
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
