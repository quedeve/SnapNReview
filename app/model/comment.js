const { dbmysql } = require('../middlewares');
// const TableProductImages = "product_images";
const util = require("util");
const query = util.promisify(dbmysql.query).bind(dbmysql);
var mysql = require('mysql');
const { response } = require('express');
const dbConfig = require("../config/db.config");
const { callbackPromise } = require('nodemailer/lib/shared');
const { count } = require('console');
const exp = require('constants');


exports.insertQuestionAnswerComment = async (param) => {
    var que = "INSERT INTO question_comments (userId, questionAnswersId, comments) ";
    que += "VALUES (" + param.userId + "," + param.questionAnswerId + ",'" + param.comments + "')";
    console.log(que);
    var rows = await query(que);
    console.log(rows);
    return rows;
}

exports.isUserhasCountedVote = async (param) => {

    var que = "SELECT id FROM question_comment_upvotes WHERE userId =" + param.userId;
    var rows = await query(que);
    return rows;
}


exports.countUpvote = async (param) => {
    var que = "INSERT INTO question_comment_upvotes (userId, questionCommentId)";
    que += "VALUES(" + param.userId + "," + param.id + ")"
    console.log(que);
    var rows = await query(que);
    return rows;
}



exports.GetAllComment = async (param) => {
    var que = `SELECT question_comments.id, question_comments.createdAt, question_comments.questionAnswersId, question_comments.isAnonymous, question_comments.userId, users.name, users_details.img_avatar, 
    IF(questions.userId = users.id, 'Creator', '') AS isCreator
    FROM question_comments 
    JOIN users ON question_comments.userId = users.id 
    JOIN users_details ON question_comments.userId = users_details.userId
    JOIN question_answers ON question_comments.questionAnswersId = question_answers.id
    JOIN questions ON question_answers.questionsId = questions.id
    WHERE question_comments.questionAnswersId = `+param.questionAnswerId
    
    var queryCount = `SELECT COUNT(*) as total FROM (`+que+`) countTable` ;

    que+= " LIMIT "+param.skip+ ", "+ param.take;

    var countRows = await query(queryCount);
    var rows = await query(que);
    rows.total = countRows[0].total;
    return rows;
}