const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const Category = require("../models/category");

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
    const baslik = req.body.baslik
    const aciklama = req.body.aciklama
    const resim = req.body.resim
    const anasayfa = req.body.anasayfa == "on" ? true : false
    const onay = req.body.onay == "on" ? true : false
	try {
        await Blog.create({
            baslik: baslik,
            aciklama: aciklama,
            resim: resim,
            anasayfa: anasayfa,
            onay : onay,
        })
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
});

router.get("/blogs/:blogid", function (req, res) {
	res.render("admin/blog-edit");
});

router.get("/blogs", function (req, res) {
	res.render("admin/blog-list");
});

module.exports = router;
