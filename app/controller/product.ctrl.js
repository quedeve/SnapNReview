const product = require("../model/product");
const formidable = require("formidable");
const conf = require("../config/upload.config");
const { uploadfile } = require("../middlewares");



exports.insertProduct = async (param, res) => {
    var req = param.body;
    req.userId = param.userId;
    var ins = await product.createProduct(req);
    if (ins.affectedRows > 0) {
        return res.status(200).json({
            isSuccess: true,
            message: "Success insert data"
        });
    }
    else {
        return res.status(500).json({
            isSuccess: false,
            message: "Failed insert data"
        });
    }
}

exports.countViewProduct = async (param, res) => {
    var req = param.body;
    req.userId = param.userId;
    var ins = await product.countViews(req);
    if (ins.affectedRows > 0) {
        return res.status(200).json({
            isSuccess: true,
            message: "Success insert data"
        });
    }
    else {
        return res.status(500).json({
            isSuccess: false,
            message: "Failed insert data"
        });
    }
}

exports.countUpvoteProduct = async (param, res) => {
    var req = param.body;
    req.userId = param.userId;
    var hasCounted = await product.isUserhasCountedvote(req);
    if (hasCounted.length > 0) {
        return res.status(200).json({
            isSuccess: false,
            message: "user has been voted"
        });
    } else {
        var ins = await product.countUpvote(req);
        if (ins.affectedRows > 0) {
            return res.status(200).json({
                isSuccess: true,
                message: "Success insert data"
            });
        }
        else {
            return res.status(500).json({
                isSuccess: false,
                message: "Failed insert data"
            });
        }
    }

}

exports.countProductImageLike = async (param, res) =>{
    var req = param.body;
    req.userId = param.userId;
    try {
        var hasCounted = await product.isUserHasCountedProductImageLike(req);
        if (hasCounted.length>0) {
            return res.status(200).json({
                isSuccess: false,
                message: "user has been liked"
            })
        } else {
            var ins = await product.countProductImageLike(req);
            if (ins.affectedRows >0) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "Success insert data"
                })
            }
            else{
                return res.status(500).json({
                    isSuccess: false,
                    message: "Failed insert data"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message : "There Are something Wrong in Our System" + error
        })
    }
}

exports.getAllProduct = async (param, res) => {
    var rtn = {};
    try {
        var items = await product.getAllProduct(param.body);

        status = 200;
        rtn.isSuccess = true;
        rtn.message = "Success";
        rtn.data = items;
        rtn.total = items.total;
        return res.status(status).json(rtn);
    }
    catch (error) {
        rtn.isSuccess = false;
        rtn.status = 500;
        rtn.message = "There Are something Wrong in Our System"
        return res.status(500).json(rtn);
    }

};


exports.uploadProductImages = async (param, res) => {
    try {
        var rtn = {};
        var imageUrls = [];
        var form = new formidable.IncomingForm();
        form.parse(param, async (err, fields, files) => {
            if (err) {
                console.error('Error', err)
                return res.status(500).json({
                    isSuccess: false,
                    message: "Failed Update Profile"
                });
            }

            var userId = param.userId;
            var category = fields.category;
            if (userId === undefined || userId == "") {
                return res.status(500).json({
                    isSuccess: false,
                    message: "Failed to get profile, please relogin"
                });
            }
            if (category === undefined || category == "") {
                return res.status(500).json({
                    isSuccess: false,
                    message: "There Are something Wrong in Our System"
                })
            }



            //check image1
            if (files.image1 !== undefined && files.image1 != "") {
                var image1 = await createImageUrl(files.image1, fields.category, userId);
                if (image1.error) {
                    return res.status(500).json({
                        isSuccess: false,
                        message: image1.message
                    });
                }
                imageUrls.push(image1.filename);
            }
            if (files.image2 !== undefined && files.image2 != "") {
                var image2 = await createImageUrl(files.image2, fields.category, userId);
                if (image2.error) {
                    return res.status(500).json({
                        isSuccess: false,
                        message: image2.message
                    });
                }
                imageUrls.push(image2.filename);
            }
            if (files.image3 !== undefined && files.image3 != "") {
                var image3 = await createImageUrl(files.image3, fields.category, userId);
                if (image3.error) {
                    return res.status(500).json({
                        isSuccess: false,
                        message: image3.message
                    });
                }
                imageUrls.push(image3.filename);
            }
            if (files.image4 !== undefined && files.image4 != "") {
                var image4 = await createImageUrl(files.image4, fields.category, userId);
                if (image4.error) {
                    return res.status(500).json({
                        isSuccess: false,
                        message: image4.message
                    });
                }
                imageUrls.push(image4.filename);
            }
            if (files.image5 !== undefined && files.image5 != "") {
                var image5 = await createImageUrl(files.image5, fields.category, userId);
                if (image5.error) {
                    return res.status(500).json({
                        isSuccess: false,
                        message: image5.message
                    });
                }
                imageUrls.push(image5.filename);
            }
            if (files.image6 !== undefined && files.image6 != "") {
                var image6 = await createImageUrl(files.image6, fields.category, userId);
                if (image6.error) {
                    return res.status(500).json({
                        isSuccess: false,
                        message: image6.message
                    });
                }
                imageUrls.push(image6.filename);
            }
            if (files.image7 !== undefined && files.image7 != "") {
                var image7 = await createImageUrl(files.image7, fields.category, userId);
                if (image7.error) {
                    return res.status(500).json({
                        isSuccess: false,
                        message: image7.message
                    });
                }
                imageUrls.push(image7.filename);
            }
            if (files.image8 !== undefined && files.image8 != "") {
                var image8 = await createImageUrl(files.image8, fields.category, userId);
                if (image8.error) {
                    return res.status(500).json({
                        isSuccess: false,
                        message: image8.message
                    });
                }
                imageUrls.push(image8.filename);
            }
            if (files.image9 !== undefined && files.image9 != "") {
                var image9 = await createImageUrl(files.image9, fields.category, userId);
                if (image9.error) {
                    return res.status(500).json({
                        isSuccess: false,
                        message: image9.message
                    });
                }
                imageUrls.push(image9.filename);
            }
            if (files.image10 !== undefined && files.image10 != "") {
                var image10 = await createImageUrl(files.image10, fields.category, userId);
                if (image10.error) {
                    return res.status(500).json({
                        isSuccess: false,
                        message: image10.message
                    });
                }
                imageUrls.push(image10.filename);
            }

            var ins = await product.insertProductImages(fields.productId, imageUrls);
            if (ins.affectedRows > 0) {

                return res.status(200).json({
                    isSuccess: true,
                    message: "Success"
                    // files: files
                })
            }
            else {
                return res.status(500).json({
                    isSuccess: false,
                    message: "There Are something Wrong in Our System"
                    // files: files
                })
            }

        }
        );

    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: "There Are something Wrong in Our System"
        })

    }




}

exports.getProductbyId = async (param, res) => {
    try {
        var userId = param.userId;
        if (userId === undefined || userId == "") {
            return res.status(500).json({
                isSuccess: false,
                message: "Failed to get profile, please relogin"
            });
        } else {
            var items = await product.getProductById(param.body);
            return res.status(200).json({
                isSuccess : true,
                message : "Success",
                data : items
            })
        }
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: "Something Error in Our System, please Contact Administrator.!"
        });
    }
}

exports.getProductTopImagesById = async(param, res)=>{
    try {
        var userId = param.userId;
        if (userId == undefined || userId == "") {
            return res.status(500).json({
                isSuccess : false,
                message: "Failed to get profile, please relogin"
            })
        }
        else{
            var items = await product.getProductTopImagesById(param.body);
            return res.status(200).json({
                isSuccess: true,
                message : "Success",
                data : items,
                total : items.total,
                surplusImages : items.surplusImages
            })
        }
    } catch (error) {
        return res.status(500).json({
            isSuccess:false,
            message: "Something Error in Our System, please Contact Administrator.!"
        })
    }
}

exports.getAllImageByProductId = async(param, res)=>{
    try{
        var userId = param.userId;
        if (userId == undefined || userId =="") {
            return res.status(500).json({
                isSuccess : false,
                message: "Failed to get profile, please relogin"
            })
        }
        else{
            var items = await product.getAllImageByProductId(param.body);
            return res.status(200).json({
                isSuccess: true,
                message : "Success",
                data : items,
                total : items.total
            })
        }
    }
    catch(error){
        return res.status(500).json({
            isSuccess : false,
            message: "Something Error in Our System, please Contact Administartor.!"+error
        })
    }
}

// exports.saveProductImages = async (param, res) => {
//     try {

//     } catch (error) {

//     }
// }


async function createImageUrl(image, category, userId) {
    var baseUrl = conf.base_url;
    var imageFolder = conf.folderReview + "/" + category;
    var imageBaseUrl = baseUrl + "/" + imageFolder;
    var check = {
        filename: ""
    }
    check = await uploadfile.uploadImage(image, userId, imageFolder)
    console.log(check);
    if (check.error) {
        return check;
    }

    check.filename = imageBaseUrl + "/" + check.filename;
    return check;
}