const { dbmysql } = require('../middlewares');
const TableProduct = "products";
const TableProductImages = "product_images";


const util = require("util");
const query = util.promisify(dbmysql.query).bind(dbmysql);
var mysql = require('mysql');
const { response } = require('express');
const dbConfig = require("../config/db.config");
const { callbackPromise } = require('nodemailer/lib/shared');
const { count } = require('console');
var connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    // host: "5.189.134.84",
    // user : "root",
    // password: "Insy4AllahB3rk4H!!!",
    database: dbConfig.database
});

exports.createProduct = async (param) => {
    // var que = "INSERT INTO " + TableCategories + " (categoryName,isParent,iconUrl,rowStatus) ";
    var que = "INSERT INTO " + TableProduct + " (userId,categoryId, productName, isAnonymous,rowStatus) ";
    que += "VALUES (" + param.userId + "," + param.categoryId + ",";
    que += "'" + param.productName + "'," + param.isAnonymous + ",1 )";
    console.log(que);
    var rows = await query(que);
    console.log(rows);
    return rows;
}

exports.countViews = async (param) => {
    var que = "UPDATE " + TableProduct + " SET views = views+1 WHERE id =" + param.id
    var rows = await query(que);

    return rows;
}

exports.countUpvote = async (param) => {

    var que = "INSERT INTO product_upvotes (userId, productId) ";
    que += "VALUES(" + param.userId + ", " + param.id + " )"
    console.log(que);
    var rows = await query(que);

    return rows;
}

exports.isUserhasCountedvote = async (param) => {
<<<<<<< HEAD

    var que = "SELECT id FROM product_upvotes WHERE userId =" + param.userId;
=======

    var que = "SELECT id FROM product_upvotes WHERE userId =" + param.userId;
    var rows = await query(que);
    return rows;
}

exports.countProductImageLike = async (param) => {
    console.log(param)
    var que = `INSERT INTO product_image_likes (userId, productImageId)
                VALUES (`+ param.userId + `, ` + param.id + `)`
    var rows = await query(que);

    return rows
}

exports.isUserHasCountedProductImageLike = async (param) => {
    var que = "SELECT id FROM product_image_likes WHERE userId =" + param.userId;
>>>>>>> a080bc6ce07c656c172c4e3c311618f7dbf6f575
    var rows = await query(que);
    return rows;
}

<<<<<<< HEAD
exports.countProductImageLike = async (param) => {
    console.log(param)
    var que = `INSERT INTO product_image_likes (userId, productImageId)
                VALUES (`+ param.userId + `, ` + param.id + `)`
    var rows = await query(que);

    return rows
}

exports.isUserHasCountedProductImageLike = async (param) => {
    var que = "SELECT id FROM product_image_likes WHERE userId =" + param.userId;
    var rows = await query(que);
    return rows;
}

=======
>>>>>>> a080bc6ce07c656c172c4e3c311618f7dbf6f575
exports.getAllProduct = async (param) => {
    var que = 'SELECT \n' +
        '  pro.id, \n' +
        '  pro.categoryId, \n' +
        '  pro.productName AS title, \n' +
        '  IFNULL(productVote.voted, 0) AS voted, \n' +
        '  pro.views, \n' +
        '  pro.createdAt, \n' +
        '  pro.isAnonymous, \n' +
        '  usr.name, \n' +
        '  usrdetail.img_avatar, \n' +
        '  productRate.rate AS aveRatting, \n' +
        '  productRate.countedRate AS ratting, \n' +
        '  productLiked.imageLink AS image \n' +
        'FROM \n' +
        '  products pro \n' +
        '  JOIN users usr ON pro.userId = usr.id \n' +
        '  JOIN users_details usrdetail ON usrdetail.userId = usr.id \n' +
        '  JOIN (\n' +
        '    SELECT \n' +
        '      product.id, \n' +
        '      rate, \n' +
        '      countedRate, \n' +
        '      createdAt \n' +
        '    FROM \n' +
        '      products \n' +
        '      JOIN (\n' +
        '        SELECT \n' +
        '          product.id, \n' +
        '          AVG(reviews.rate) AS rate, \n' +
        '          COUNT(reviews.rate) AS countedRate \n' +
        '        FROM \n' +
        '          products product \n' +
        '          JOIN reviews ON product.id = reviews.productId \n' +
        '        GROUP BY \n' +
        '          id\n' +
        '      ) product ON products.id = product.id\n' +
        '  ) productRate ON productRate.id = pro.id \n' +
        '  LEFT JOIN (\n' +
        '    SELECT \n' +
        '      productId, \n' +
        '      COUNT(id) AS voted \n' +
        '    FROM \n' +
        '      product_upvotes \n' +
        '    GROUP BY \n' +
        '      productId\n' +
        '  ) productVote ON productVote.productId = pro.id \n' +
        '  LEFT JOIN (\n' +
        '    SELECT \n' +
        '      proImages.productId, \n' +
        '      imageLink, \n' +
        '      createdAt \n' +
        '    FROM \n' +
        '      product_images proImages \n' +
        '      JOIN (\n' +
        '        SELECT \n' +
        '          product_images.id, \n' +
        '          IFNULL(liked, 0) AS liked \n' +
        '        FROM \n' +
        '          product_images \n' +
        '          LEFT JOIN (\n' +
        '            SELECT \n' +
        '              productImageId, \n' +
        '              COUNT(id) AS liked \n' +
        '            FROM \n' +
        '              product_image_likes \n' +
        '            GROUP BY \n' +
        '              productImageId\n' +
        '          ) imageLiked ON imageLiked.productImageId = product_images.id \n' +
        '        ORDER BY \n' +
        '          liked\n' +
        '      ) productLiked ON productLiked.id = proImages.id\n' +
        '  ) productLiked ON productLiked.productId = pro.id ';
    que += "WHERE pro.rowStatus = 1 AND usr.isactive = 1 AND usrdetail.isMute = 0 ";

<<<<<<< HEAD
    if (param.categoryId != undefined && param.categoryId != "" && param.categoryId != undefined) {
        que += "AND pro.categoryId = " + param.categoryId;
        
    }
    if(param.search != undefined && param.search != "" )
    {
=======
    if (param != undefined && param.categoryId != "" && param.categoryId != undefined) {
        que += "AND pro.categoryId = " + param.categoryId;
>>>>>>> a080bc6ce07c656c172c4e3c311618f7dbf6f575
        que += " AND pro.productName LIKE '%" + param.search + "%'";
    }
    switch (param.order) {
        case "review":
            que += " ORDER by pro.createdAt DESC "
            break;
        case "image":
            que += " ORDER by productLiked.createdAt DESC "
            break;
        case "upvoted":
            que += " ORDER by productRate.createdAt DESC "
            break;

        default:
            break;
<<<<<<< HEAD
    }

    var queryCount = " SELECT COUNT(*) as total FROM ( " + que + ")countTable "
    que += " LIMIT " + param.skip + ", " + param.take;

    console.log(que);
    var countRows = await query(queryCount);

    var rows = await query(que);

    console.log(countRows);
    rows.total = countRows[0].total;
    console.log(rows);
    return rows;
}

exports.insertProductImages = async (productId, array) => {
    var values = [

    ]
    for (let index = 0; index < array.length; index++) {
        values.push([productId, array[index]])

    }
    var que = "INSERT INTO product_images (productId, imageLink ) VALUES ?";
    // var que = "";
    // for (let index = 0; index < array.length; index++) {

    // que += " INSERT INTO product_images (productId, imageLink ) VALUES (1, 'asdasd' )";
    // que += " INSERT INTO product_images (productId, imageLink ) VALUES (1, 'asdasd' )";
    //     // que += "VALUES (" + productId + ", '" + array[index] + "' )";
    //     // que += " "
    // }
    // que += " VALUES (1, 'asdasd' ) ";
    // que += " VALUES (1, 'asdasd' ) ";
    // var que = "INSERT INTO " + TableProductImages + " (productId, imageLink, ) ";
    // que += "VALUES (" + param.productId + "," + param.categoryId + ",";
    // que += "'" + param.productName + "'," + param.isAnonymous + ",1 )";
    // console.log(que);
    // var response = true;
    var rows = await query(que, [values]);
    //    console.log(test);
    return rows;
    // var rows = await query(que);
    // console.log(rows);
}


exports.getProductById = async (param) => {
    var que = 'SELECT \n' +
        '	pro.productName as title,\n' +
        '    pro.isAnonymous,\n' +
        '    pro.views,\n' +
        '    pro.createdAt,\n' +
        '    usr.name,\n' +
        '    usrdetail.img_avatar,\n' +
        '	productRate.rate as aveRatting, \n' +
        '    productRate.countedRate as ratting\n' +
        'FROM products pro\n' +
        'JOIN users usr ON pro.userId = usr.id\n' +
        'LEFT JOIN users_details usrdetail ON usr.id = usrdetail.userId\n' +
        'JOIN (\n' +
        '    SELECT \n' +
        '      product.id, \n' +
        '      rate, \n' +
        '      countedRate, \n' +
        '      createdAt \n' +
        '    FROM \n' +
        '      products \n' +
        '      JOIN (\n' +
        '        SELECT \n' +
        '          product.id, \n' +
        '          AVG(reviews.rate) as rate, \n' +
        '          COUNT(reviews.rate) as countedRate \n' +
        '        FROM \n' +
        '          products product \n' +
        '          JOIN reviews ON product.id = reviews.productId \n' +
        '        GROUP BY \n' +
        '          id\n' +
        '      ) product ON products.id = product.id\n' +
        '  ) productRate ON productRate.id = pro.id \n' +
        '\n' +
        'WHERE pro.id = ' + param.id;
    console.log(que);
    var rows = await query(que);
    return rows;
}

exports.getProductTopImagesById = async (param) => {
    var que = `SELECT * FROM product_images proImages 
                JOIN (
                    SELECT 
                         product_images.id, 
                           IFNULL(liked, 0) AS liked 
                         FROM 
                           product_images 
                           LEFT JOIN (
                             SELECT 
                               productImageId, 
                               COUNT(id) AS liked 
                             FROM 
                               product_image_likes 
                             GROUP BY 
                               productImageId
                           ) imageLiked ON imageLiked.productImageId = product_images.id 
                         ORDER BY 
                           liked
                       ) productLiked ON productLiked.id = proImages.id
                WHERE productId = ` + param.id + `
                ORDER BY liked DESC
                LIMIT 4`
    console.log(que);
    var rows = await query(que);


    var queryCount = `SELECT count(*) as total FROM product_images
                        WHERE productId = `+ param.id
    var countRows = await query(queryCount);
    surplusImges = countRows[0].total - 4;
    rows.surplusImages = (surplusImges > 0) ? countRows[0].total - 4 : 0;
    rows.total = countRows[0].total;
    return rows;
}

exports.getAllImageByProductId = async (param) => {
    var que = `	SELECT proImages.Id, imageLink,  proImages.views, productLiked.liked, products.productName, proImages.productId, users.name, users_details.img_avatar , users.id as userId FROM product_images proImages 
                JOIN (
                    SELECT 
                        product_images.id, 
                        IFNULL(liked, 0) AS liked 
                        FROM 
                        product_images 
                        LEFT JOIN (
                            SELECT 
                            productImageId, 
                            COUNT(id) AS liked 
                            FROM 
                            product_image_likes 
                            GROUP BY 
                            productImageId
                        ) imageLiked ON imageLiked.productImageId = product_images.id 
                        ORDER BY 
                        liked
                    ) productLiked ON productLiked.id = proImages.id
                JOIN products ON products.id = proImages.productId
                JOIN users ON products.userId = users.Id
                JOIN users_details ON users.Id = users_details.userId
                WHERE productId = ` + param.productId
                

    switch (param.order) {
        case "views":
            que += " ORDER by views DESC "
            break;
        case "liked":
            que += " ORDER by liked DESC "
            break;
        case "date":
            que += " ORDER by createdAt DESC "
            break;

        default:
            que += " ORDER by liked DESC "
            break;
    }
    console.log(que)
    var queryCount = " SELECT COUNT(*) as total FROM ( " + que + ")countTable "
    que += " LIMIT " + param.skip + ", " + param.take;
    var countRows = await query(queryCount);

    var rows = await query(que);
=======
    }

    var queryCount = " SELECT COUNT(*) as total FROM ( " + que + ")countTable "
    que += " LIMIT " + param.skip + ", " + param.take;

    console.log(que);
    var countRows = await query(queryCount);

    var rows = await query(que);

    console.log(countRows);
    rows.total = countRows[0].total;
    console.log(rows);
    return rows;
}

exports.insertProductImages = async (productId, array) => {
    var values = [

    ]
    for (let index = 0; index < array.length; index++) {
        values.push([productId, array[index]])

    }
    var que = "INSERT INTO product_images (productId, imageLink ) VALUES ?";
    // var que = "";
    // for (let index = 0; index < array.length; index++) {

    // que += " INSERT INTO product_images (productId, imageLink ) VALUES (1, 'asdasd' )";
    // que += " INSERT INTO product_images (productId, imageLink ) VALUES (1, 'asdasd' )";
    //     // que += "VALUES (" + productId + ", '" + array[index] + "' )";
    //     // que += " "
    // }
    // que += " VALUES (1, 'asdasd' ) ";
    // que += " VALUES (1, 'asdasd' ) ";
    // var que = "INSERT INTO " + TableProductImages + " (productId, imageLink, ) ";
    // que += "VALUES (" + param.productId + "," + param.categoryId + ",";
    // que += "'" + param.productName + "'," + param.isAnonymous + ",1 )";
    // console.log(que);
    // var response = true;
    var rows = await query(que, [values]);
    //    console.log(test);
    return rows;
    // var rows = await query(que);
    // console.log(rows);
}


exports.getProductById = async (param) => {
    var que = 'SELECT \n' +
        '	pro.productName as title,\n' +
        '    pro.isAnonymous,\n' +
        '    pro.views,\n' +
        '    pro.createdAt,\n' +
        '    usr.name,\n' +
        '    usrdetail.img_avatar,\n' +
        '	productRate.rate as aveRatting, \n' +
        '    productRate.countedRate as ratting\n' +
        'FROM products pro\n' +
        'JOIN users usr ON pro.userId = usr.id\n' +
        'LEFT JOIN users_details usrdetail ON usr.id = usrdetail.userId\n' +
        'JOIN (\n' +
        '    SELECT \n' +
        '      product.id, \n' +
        '      rate, \n' +
        '      countedRate, \n' +
        '      createdAt \n' +
        '    FROM \n' +
        '      products \n' +
        '      JOIN (\n' +
        '        SELECT \n' +
        '          product.id, \n' +
        '          AVG(reviews.rate) as rate, \n' +
        '          COUNT(reviews.rate) as countedRate \n' +
        '        FROM \n' +
        '          products product \n' +
        '          JOIN reviews ON product.id = reviews.productId \n' +
        '        GROUP BY \n' +
        '          id\n' +
        '      ) product ON products.id = product.id\n' +
        '  ) productRate ON productRate.id = pro.id \n' +
        '\n' +
        'WHERE pro.id = ' + param.id;
    console.log(que);
    var rows = await query(que);
    return rows;
}

exports.getProductTopImagesById = async (param) => {
    var que = `SELECT * FROM product_images proImages 
                JOIN (
                    SELECT 
                         product_images.id, 
                           IFNULL(liked, 0) AS liked 
                         FROM 
                           product_images 
                           LEFT JOIN (
                             SELECT 
                               productImageId, 
                               COUNT(id) AS liked 
                             FROM 
                               product_image_likes 
                             GROUP BY 
                               productImageId
                           ) imageLiked ON imageLiked.productImageId = product_images.id 
                         ORDER BY 
                           liked
                       ) productLiked ON productLiked.id = proImages.id
                WHERE productId = ` + param.id + `
                ORDER BY liked DESC
                LIMIT 4`
    console.log(que);
    var rows = await query(que);


    var queryCount = `SELECT count(*) as total FROM product_images
                        WHERE productId = `+ param.id
    var countRows = await query(queryCount);
    surplusImges = countRows[0].total - 4;
    rows.surplusImages = (surplusImges > 0) ? countRows[0].total - 4 : 0;
    rows.total = countRows[0].total;
    return rows;
}

exports.getAllImageByProductId = async (param) => {
    var que = `	SELECT proImages.Id, imageLink,  proImages.views, productLiked.liked, products.productName, proImages.productId, users.name, users_details.img_avatar , users.id as userId FROM product_images proImages 
                JOIN (
                    SELECT 
                        product_images.id, 
                        IFNULL(liked, 0) AS liked 
                        FROM 
                        product_images 
                        LEFT JOIN (
                            SELECT 
                            productImageId, 
                            COUNT(id) AS liked 
                            FROM 
                            product_image_likes 
                            GROUP BY 
                            productImageId
                        ) imageLiked ON imageLiked.productImageId = product_images.id 
                        ORDER BY 
                        liked
                    ) productLiked ON productLiked.id = proImages.id
                JOIN products ON products.id = proImages.productId
                JOIN users ON products.userId = users.Id
                JOIN users_details ON users.Id = users_details.userId
                WHERE productId = ` + param.productId
                

    switch (param.order) {
        case "views":
            que += " ORDER by views DESC "
            break;
        case "liked":
            que += " ORDER by liked DESC "
            break;
        case "date":
            que += " ORDER by createdAt DESC "
            break;

        default:
            que += " ORDER by liked DESC "
            break;
    }
    console.log(que)
    var queryCount = " SELECT COUNT(*) as total FROM ( " + que + ")countTable "
    que += " LIMIT " + param.skip + ", " + param.take;
    var countRows = await query(queryCount);

    var rows = await query(que);
>>>>>>> a080bc6ce07c656c172c4e3c311618f7dbf6f575
    console.log("test")
    rows.total = countRows[0].total;


    return rows;
}


