const User = require('../models/userModel');
const products = require("../models/productModel");





const loadWishlist = async (req, res) => {
    try {
        userSession = req.session
        if (userSession.user_id) {
            const userData = await User.findById({ _id: userSession.user_id })
            const completeUser = await userData.populate('wishlist.item.productId')
            res.render('wishlist', { user: req.session.user, wishlistProducts: completeUser.wishlist })

        } else {
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error.message);
    }
}

const addWishlist = async (req, res) => {
    const productId = req.query.id
    userSession = req.session
    if (userSession.user_id) {

        const userData = await User.findById({ _id: userSession.user_id })
        const productData = await products.findById({ _id: productId })
        userData.addToWishlist(productData)
        res.redirect('/loadWishlist')
    } else {
        res.redirect('/login')
    }
}

const deleteWishlist = async (req, res) => {
    const productId = req.query.id
    userSession = req.session
    const userData = await User.findById({ _id: userSession.user_id })
    userData.removefromWishlist(productId)
    res.redirect('/loadWishlist')
}

const addToCartremovefromwishlist = async (req, res) => {
    try {
        userSession = req.session.user_id;
        if (userSession) {
            const productId = req.query.id;
            const details = await products.findOne({ _id: productId })
            const product = await products.find({ category: details.category });
            const userData = await User.findById({ _id: userSession })
            const productData = await products.findById({ _id: productId })
            userSession = req.session
            const userDatas = await User.findById({ _id: userSession.user_id })
            userDatas.addToCart(productData)
            res.redirect('/loadWishlist')
            // res.render('details',{ user: req.session.user,message:"product added to cart !",detail: details, related: product })

        } else {
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    loadWishlist,
    addWishlist,
    deleteWishlist,
    addToCartremovefromwishlist,
}