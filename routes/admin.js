const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const Category = require("../models/category");


router.get("/blogs", async function (req, res) {
	try {
		const title = "Blogs";
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

router.get("/blog/:blogid", async function (req, res) {
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

router.post("/blog/:blogid", async function (req, res) {
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

router.get("/blog/delete/:blogid", async function (req, res) {
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

router.post("/blog/delete/:blogid", async function (req, res) {
	const id = req.params.blogid;
	try {
		await Blog.findOneAndDelete({ _id: id });
		res.redirect("/admin/blogs?action=delete");
	} catch (error) {
		console.log(error);
	}
});

router.get("/categories", async function (req, res) {
	try {
		const title = "Kategoriler";
		const categories = await Category.find().lean();
		res.render("admin/category-list", {
			categories: categories,
			title: title,
			action: req.query.action,
		});
	} catch (error) {
		console.log(error);
	}
});

router.get("/category/create", async function (req, res) {
	try {
		res.render("admin/category-create", {
			title: "Yeni Kategori",
		});
	} catch (error) {}
});

router.post("/category/create", async function (req, res) {
	const name = req.body.name;
	try {
		await Category.create({
			name: name,
		});
		res.redirect("/admin/categories?action=create");
	} catch (error) {
		console.log(error);
	}
});

router.get("/category/:categoryid", async function (req, res) {
	const id = req.params.categoryid;
	const category = await Category.findOne({ _id: id }).lean();
	const title = category.name;
	res.render("admin/category-edit", {
		category: category,
		title: title,
	});
});

router.post("/category/:categoryid", async function (req, res) {
	const id = req.params.categoryid;
	const update = {
		name: req.body.name,
	};
	try {
		await Category.findOneAndUpdate({ _id: id }, update);
		res.redirect("/admin/categories?action=edit");
	} catch (error) {
		console.log(error);
	}
});

router.get("/category/delete/:categoryid", async function (req, res) {
	const id = req.params.categoryid;
	try {
		const category = await Category.findOne({ _id: id }).lean();
		res.render("admin/category-delete", {
			title: category.name,
			category: category,
		});
	} catch (error) {
		console.log(error);
	}
});

router.post("/category/delete/:categoryid", async function (req, res) {
	const id = req.params.categoryid;
	try {
		await Category.findOneAndDelete({ _id: id });
		res.redirect("/admin/categories?action=delete");
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
