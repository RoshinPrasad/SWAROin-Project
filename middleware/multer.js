const multer=require('multer');
const path =require('path');

let Storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  let uploads = multer({
    storage: Storage,fileFilter: function (params, file, callback) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
          callback(null, true)
        } else {
          console.log('only jpg & png file supported !');
          callback(null, false)
 }
}
  })
  
module.exports={
    uploads,
}