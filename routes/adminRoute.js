const express = require("express")
const admin_route = express();
const session = require("express-session");
const nocache = require("nocache")
const config = require("../config/config");
const multer =require("../middleware/multer")
const auth = require("../middleware/adminAuth");
const adminController = require("../controllers/adminController");
const productController=require("../controllers/productController");
const bannerController=require("../controllers/bannerController");
const couponController=require("../controllers/couponController");

admin_route.use(session({ 
    secret: config.sessionSecret,
    resave:false,
    saveUninitialized:true,    
}));


  
admin_route.set('views', './views/admin');

admin_route.use(express.static('public'));

admin_route.get('/', auth.isLogout, adminController.loadLogin);

admin_route.post('/', adminController.verifyLogin);

admin_route.use(auth.isLogin)

admin_route.get('/home', adminController.loadDashboard);

admin_route.get('/user', adminController.loadUser);

admin_route.get('/category', adminController.loadCategory);

admin_route.get('/product', productController.loadProduct);

admin_route.get('/order', adminController.loadOrder);

admin_route.get('/addCategories', adminController.addCategories);

admin_route.post('/addCategories', adminController.addCategoriesredir);

admin_route.get('/delete-category',adminController.deleteCategory);

admin_route.get('/edit-category',adminController.editCategory);

admin_route.post('/edit-category',adminController.editUpdateCategory)

admin_route.get('/add-product', productController.loadAddProducts);

admin_route.post('/updateImage', productController.updateImage)

admin_route.post('/add-product',multer.uploads.array('pImage',5), productController.addAddProducts);

admin_route.get('/edit-product', productController.showEditProduct);

admin_route.post('/edit-product',multer.uploads.array('pImage',5), productController.editProduct);

admin_route.get('/show-product', productController.showProduct);
 
admin_route.get('/delete-product', productController.deleteProduct);

admin_route.get('/logout', adminController.logout);

admin_route.get('/dashboard', adminController.adminDashboard);

admin_route.get('/block-user',adminController.BlockUser)

admin_route.get("/banner",bannerController.loadBanner);

admin_route.get("/add-Banners",bannerController.loadAddBanner);

admin_route.post("/add-Banners",multer.uploads.array('bImage',3),bannerController.addBanner);

admin_route.get("/hide-banner",bannerController.hideBanner)

admin_route.get("/edit-banner",bannerController.editBanner);

admin_route.post("/edit-banner",multer.uploads.array('bImage',3),bannerController.editModifyBanner);

admin_route.get("/loadCoupon",couponController.loadCoupon);

admin_route.get("/addCoupon",couponController.addCoupon);

admin_route.post("/addCoupon",couponController.addNewCoupon);

admin_route.get("/avail-coupon",couponController.availCoupon);

admin_route.get("/edit-coupon",couponController.editCoupon);

admin_route.post("/edit-coupon",couponController.editUpdateCoupon);

admin_route.get("/delete-coupon",couponController.deleteCoupon);

admin_route.get("/loadOrderDetails",adminController.viewOrderDetails)
admin_route.post('/updateOrder',adminController.sortOrder)
admin_route.post("/updateStatus",adminController.updateStatus);

admin_route.get('*', function (req, res) {
    res.redirect('/admin');
})

module.exports = admin_route;

