const product = require('../models/productModel');
const User = require("../models/userModel");
const category = require("../models/category");



const loadProduct = async (req, res) => {
  try {
    var search = "";
    if (req.query.search) {
      search = req.query.search;
    }
    const productData = await product.find({ name: { $regex: search + ".*" } })
    res.render("products", { products: productData });
  } catch (error) {
    console.log(error.message);
  }
};

const showProduct = async (req, res) => {
  try {
    const id = req.query.id;
    const productData = await product.findOne({ _id: id });
    if (productData.isAvailable) {
      await product.findByIdAndUpdate({ _id: id }, { $set: { isAvailable: 0 } })
    } else {
      await product.findByIdAndUpdate({ _id: id }, { $set: { isAvailable: 1 } })
    }
    res.redirect("/admin/product")
  }
  catch (error) {
    console.log(error.message);
  }
};

const showEditProduct = async (req, res) => {
  try {
    const id = req.query.id;
    const categotyData = await category.find({})
    const productData = await product.findById({ _id: id });
    if (productData) {
      res.render("editProducts", { products: productData, category: categotyData, message: "" });
    } else {
      res.redirect("/admin/product");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const updateImage = async (req, res) => {
  try {
    let { pId, img } = req.body
    console.log(pId, img);
    await product.updateOne({ _id: pId }, { $pull: { image: img } })
    const productData = product.findOne({ _id: pId })
    console.log(productData);
    res.send({ newImage: productData.image });
  } catch (error) {
    console.log(error.message);
  }
};


const editProduct = async (req, res) => {
  try {
    console.log(req.files);
    if (req.files.length != 0) {
      const productDetails = await product.findOne({ _id: req.query.id })
      const oldImg = productDetails.image
      const newImg = req.files.map((x) => x.filename)
      const images = oldImg.concat(newImg)
      console.log(images);
      productt = await product.updateOne({ _id: req.query.id }, {
        $set: {
          name: req.body.pName,
          stock: req.body.pStock,
          description: req.body.pDescription,
          price: req.body.pPrice,
          rating: req.body.pRating,
          category: req.body.pCategory,
          image: images
        }
      })
    } else {
      productt = await product.updateOne({ _id: req.query.id }, {
        $set: {
          name: req.body.pName,
          price: req.body.pPrice,
          description: req.body.pDescription,
          stock: req.body.pStock,
          rating: req.body.pRating,
          category: req.body.pCategory,
        }
      })
    } console.log(productt);
    const productData = await product.find()
    if (productData) {
      res.render("products", {
        message: "registration successfull.",
        products: productData,
      })
    } else {
      res.render("products", { message: "registration failed", products: productData })
    }
  } catch (error) {
    console.log(error.message)
  }
}





const deleteProduct = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await product.deleteOne({ _id: id }, { $unset: { isAvailable: 0 } });
    res.redirect("/admin/product");
  } catch (error) {
    console.log(error.message);
  }
};

const loadAddProducts = async (req, res) => {
  try {
    const categoryData = await category.find({});
    const userData = await User.findById({ _id: req.session.admin_id });
    res.render("addProducts", { admin: userData, category: categoryData, message: "" });
  } catch (error) {
    console.log(error.message);
  }
};


const addAddProducts = async (req, res) => {
  if (req.files.length != 0) {
    try {
      const productdetails = new product({
        name: req.body.pName,
        price: req.body.pPrice,
        stock: req.body.pStock,
        rating: req.body.pRating,
        category: req.body.pCategory,
        description: req.body.pDescription,
        image: req.files.map((x) => x.filename),
      });
      const productData = await productdetails.save();
      if (productData) {
        res.redirect("/admin/product");
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    const categoryData = await category.find();
    const userData = await User.find();
    res.render("addProducts", { admin: userData, category: categoryData, message: "file should be image" })
  }

};
module.exports = {
  loadProduct,
  loadAddProducts,
  showEditProduct,
  updateImage,
  editProduct,
  deleteProduct,
  addAddProducts,
  showProduct,
}