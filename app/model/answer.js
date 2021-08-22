const { dbmysql } = require('../middlewares');
const TableProduct = "questions_answers";
// const TableProductImages = "product_images";
const util = require("util");
const query = util.promisify(dbmysql.query).bind(dbmysql);
var mysql = require('mysql');
const { response } = require('express');
const dbConfig = require("../config/db.config");
const { callbackPromise } = require('nodemailer/lib/shared');
const { count } = require('console');


exports.insertQuestionAnswer = async (param) => {
    var que = "INSERT INTO question_answers (description, questionsId, userId, isAnonymous)"
    que += "VALUES('" + param.description + "', " + param.questionId + ", " + param.userId + ", " + param.isAnonymous + " )"
    console.log(que);
    var rows = await query(que);
    return rows;
}

exports.countViews = async (param) => {
    var que = "UPDATE question_answers SET views = views+1 WHERE id =" + param.id
    var rows = await query(que);

    return rows;
}

exports.isUserhasCountedvote = async (param) => {

    var que = "SELECT id FROM question_answer_upvotes WHERE userId =" + param.userId;
    var rows = await query(que);
    return rows;
}

exports.countUpvote = async (param) => {

    var que = "INSERT INTO question_answer_upvotes (userId, questionAnswerId) ";
    que += "VALUES(" + param.userId + ", " + param.id + " )"
    console.log(que);
    var rows = await query(que);

    return rows;
<<<<<<< HEAD
}

exports.getAllQuestionAnswer = async (param) => {
    var que = `SELECT 
                users.id as userId,
                users.name,
                users_details.img_avatar,
                question_answers.id as questionAnswerId,
                question_answers.views,
                question_answers.createdAt,
                question_answers.description,
                commented.countedComment,
                voted.countedVote,
                question_answers.questionsId,
                IF(question_answers.userId = users.id, 'Creator', '') AS isCreator,
                question_answers.isAnonymous
            FROM question_answers
            JOIN users ON question_answers.userId = users.id
            JOIN users_details ON users.id = users_details.userId
            JOIN (SELECT COUNT(id) AS countedVote, questionAnswerId 
                    FROM question_answer_upvotes
                    GROUP BY questionAnswerId) AS voted ON question_answers.id = voted.questionAnswerId
            JOIN (SELECT COUNT(id) AS countedComment, questionAnswersId 
                    FROM question_comments
                    GROUP BY questionAnswersId) as commented ON question_answers.id = commented.questionAnswersId
            WHERE 	question_answers.questionsId = `+ param.questionId

    if (param.search != "" && param.search != undefined) {
        que += ` AND question_answers.id IN ((SELECT distinct questionAnswersId FROM question_comments
        WHERE comments LIKE '%`+param.search+`%')) `
    }

    switch (param.order.toLowerCase()) {
        case "date":
            que += " ORDER by question_answers.createdAt DESC "
            break;
        case "views":
            que += " ORDER by question_answers.views DESC "
            break;
        case "upvoted":
            que += " ORDER by voted.countedVote DESC "
            break;

        default:
            que += " ORDER by question_answers.createdAt Desc"
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

    // var rowImages = await query(queryImage);
    // console.log(rowImages);
    // for (let index = 0; index < rows.length; index++) {
    //     rows[index].images = [];
    //     rowImages.forEach(element => {
    //         if (element.reviewId == rows[index].id) {
    //             rows[index].images.push(element.imageLink);
    //         }
    //     });

    // }
    rows.total = countRows[0].total;
    // console.log(rows);
    return rows;
=======
>>>>>>> a080bc6ce07c656c172c4e3c311618f7dbf6f575
}