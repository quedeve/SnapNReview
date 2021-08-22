const { dbmysql } = require('../middlewares');
const TableProduct = "questions";
// const TableProductImages = "product_images";
const util = require("util");
const query = util.promisify(dbmysql.query).bind(dbmysql);
var mysql = require('mysql');
const { response } = require('express');
const dbConfig = require("../config/db.config");
const { callbackPromise } = require('nodemailer/lib/shared');
const { count } = require('console');

exports.insertQuestion = async (param) => {
    // var que = "INSERT INTO " + TableCategories + " (categoryName,isParent,iconUrl,rowStatus) ";
    var que = "INSERT INTO " + TableProduct + " (userId,categoryId, questionName, description, isAnonymous,rowStatus) ";
    que += "VALUES (" + param.userId + "," + param.categoryId + ",";
    que += "'" + param.question + "', '" + param.description + "'," + param.isAnonymous + ",1 )";
    console.log(que);
    var rows = await query(que);
    console.log(rows);
    return rows;
}

<<<<<<< HEAD
exports.countViews = async (param) => {
=======
exports.countViews = async (param) =>{
>>>>>>> a080bc6ce07c656c172c4e3c311618f7dbf6f575
    var que = "UPDATE " + TableProduct + " SET views = views+1 WHERE id =" + param.id
    var rows = await query(que);

    return rows;
}

<<<<<<< HEAD
exports.getAllQuestion = async (param) => {
    var que = `SELECT questions.id AS questionId, 
                    questions.questionName ,
                    questions.description, 
                    questions.views, 
                    questions.isAnonymous, 
                    questions.createdAt,
                    users.name,
                    users.id AS userId,
                    users_details.img_avatar,
                    countAnswer.countedAnswer
                FROM questions
                JOIN categories ON questions.categoryId = categories.id
                JOIN (
                    SELECT COUNT(id) AS countedAnswer, questionsId FROM question_answers
                    GROUP BY questionsId
                    ) countAnswer ON questions.id =  countAnswer.questionsId
                JOIN users ON questions.userId = users.id
                JOIN users_details ON users_details.userId = users.id
                WHERE questions.rowStatus = 1 AND users.isactive = 1 AND users_details.isMute = 0`
    if(param.categoryId != undefined && param.categoryId != "" ){
        que += ` AND questions.categoryId = `+ param.categoryId;
    }
    if (param.questionId != undefined && param.questionId != "" ) {
        que += ` AND questions.id = `+ param.questionId;
    }
    if (param.search != undefined && param.search != "") {
        que += ` AND questions.questionName LIKE '%`+param.search+`%'`;
    }

    switch (param.order) {
        case "views":
            que += " ORDER by views DESC "
            break;
        case "answers":
            que += " ORDER by countedAnswer DESC "
            break;
        case "date":
            que += " ORDER by createdAt DESC "
            break;

      
    }
    console.log(que);
    var rows = await query(que)

    return rows;

}
=======
// exports.getAllQuestion = async (param) =>{
//     v
// }
>>>>>>> a080bc6ce07c656c172c4e3c311618f7dbf6f575
