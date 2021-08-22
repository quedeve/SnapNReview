const { dbmysql } = require('../middlewares');
const TableProduct = "reviews";

const util = require("util");
const query = util.promisify(dbmysql.query).bind(dbmysql);


exports.insertReview = async (param) => {
    var que = "INSERT INTO reviews (description, rate, productId, userId)"
    que += "VALUES('" + param.description + "', " + param.rate + ", " + param.productId + ", " + param.userId + " )"
    console.log(que);
    var rows = await query(que);
    return rows;
}

exports.getAllReviewbyProduct = async (param) => {
    var que = `SELECT r.id, r.views, IFNULL(reviewVote.voted, 0) as voted, r.description, r.rate, u.name , dtl.img_avatar, r.createdAt, IFNULL(comment.keyword,0) AS searchKeyword
<<<<<<< HEAD
              FROM reviews r 
=======
              FROM Reviews r 
>>>>>>> a080bc6ce07c656c172c4e3c311618f7dbf6f575
              JOIN users u ON r.userId = u.id 
              LEFT JOIN ( SELECT reviewId, COUNT(id) as keyword FROM review_comments WHERE comment LIKE '%`+ "" + `%'  GROUP BY reviewId) comment ON comment.reviewId = r.id
              JOIN users_details dtl ON dtl.userId = u.id 
              LEFT JOIN ( SELECT reviewId, COUNT(id) as voted FROM review_upvotes GROUP BY reviewId) reviewVote ON reviewVote.reviewId = r.id 
              WHERE  r.productId = `+ param.productId + ` AND r.rowStatus = 1 AND u.isactive = 1 AND dtl.isMute = 0 `
    if (param.search != "") {
        que += " AND (comment.keyword >= 1 OR r.description LIKE '%" + param.search + "%' )"
    }

    switch (param.order.toLowerCase()) {
        case "Date":
            que += " ORDER by r.createdAt DESC "
            break;
        case "views":
            que += " ORDER by r.views DESC "
            break;
        case "upvoted":
            que += " ORDER by voted DESC "
            break;

        default:
            que += " ORDER by r.createdAt Desc"
            break;
    }

    var queryCount = " SELECT COUNT(*) as total FROM ( " + que + ")countTable "
    que += " LIMIT " + param.skip + ", " + param.take;
    // console.log(que);
    var countRows = await query(queryCount);
    var rows = await query(que);
    var arrayId = "0";
    rows.forEach(element => {
        arrayId += "," + element.id
    });
    queryImage = `SELECT * FROM review_images  WHERE reviewId IN (` + arrayId + `)`

    var rowImages = await query(queryImage);
    console.log(rowImages);
    for (let index = 0; index < rows.length; index++) {
        rows[index].images = [];
        rowImages.forEach(element => {
            if (element.reviewId == rows[index].id) {
                rows[index].images.push(element.imageLink);
            }
        });

    }
    rows.total = countRows[0].total;
    // console.log(rows);
    return rows;
}

exports.countView = async (param) => {
    var que = "UPDATE reviews SET views= views+1 WHERE id =" + param.reviewId;
    var rows = await query(que);
    return rows;
}

exports.countUpvote = async (param) => {

    var que = "INSERT INTO review_upvotes (userId, reviewId) ";
    que += "VALUES(" + param.userId + ", " + param.id + " )"
    console.log(que);
    var rows = await query(que);

    return rows;
}

exports.isUserhasCountedvote = async (param) => {

    var que = "SELECT id FROM review_upvotes WHERE userId =" + param.userId;
    var rows = await query(que);
    return rows;
}

exports.GetallReviewComments = async (param) => {
    var que = `SELECT review_comments.id, review_comments.reviewId, review_comments.comment,  review_comments.views, review_comments.upvote, users.id as userId, users.name, users_details.img_avatar
                FROM review_comments
                JOIN users ON users.id = review_comments.userId
                JOIN users_details ON users.id = users_details.userid
                WHERE review_comments.reviewId = `+ param.reviewId


    var queryCount = " SELECT COUNT(*) as total FROM ( " + que + ")countTable ";
    
    que += " LIMIT " + param.skip + ", " + param.take;
    var countRows = await query(queryCount);
    var rows = await query(que);
    rows.total = countRows[0].total;
    return rows;
}