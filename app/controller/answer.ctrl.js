const answer = require("../model/answer");
const formidable = require("formidable");
// const conf = require("../config/upload.config");
// const { uploadfile } = require("../middlewares");


exports.insertQuestionAnswer = async (param, res) => {
    var req = param.body;
    req.userId = param.userId;
    var ins = await answer.insertQuestionAnswer(req);
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


exports.countViewAnswer = async (param, res) => {
    var req = param.body;
    req.userId = param.userId;
    var ins = await answer.countViews(req);
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

exports.countUpvoteQuestionAnswer = async (param, res) => {
    var req = param.body;
    req.userId = param.userId;
    var hasCounted = await answer.isUserhasCountedvote(req);
    if (hasCounted.length > 0) {
        return res.status(200).json({
            isSuccess: false,
            message: "user has been voted"
        });
    } else {
        var ins = await answer.countUpvote(req);
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
<<<<<<< HEAD
}

exports.GetAllQuestionAnswer = async (param, res) => {
    
    var rtn = {};
    try {
        var items = await answer.getAllQuestionAnswer(param.body);
        rtn = {
            data: items,
            total: items.total,
            isSuccess: true,
            message: "Success"
        }
        return res.status(200).json(rtn);
    } catch (error) {
        rtn.isSuccess = false,
            rtn.status = 500;
        rtn.message = "There Are somethign Wrong in Our System" + error
        return res.status(500).json(rtn);
    }
=======
>>>>>>> a080bc6ce07c656c172c4e3c311618f7dbf6f575
}