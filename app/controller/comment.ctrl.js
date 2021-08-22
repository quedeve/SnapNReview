const comment = require("../model/comment");
const formidable = require("formidable");


exports.insertQuestionAnswerComment = async (param, res) => {
    try {
        var req = param.body;
        req.userId = param.userId;
        var ins = await comment.insertQuestionAnswerComment(req);
        if (ins.affectedRows > 0) {
            return res.status(200).json({
                isSuccess: true,
                message: "Success insert data"
            })
        }
        else {
            return res.status(500).json({
                isSuccess: false,
                message: "Failed insert data"
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error.message
        })
    }
}

exports.GetAllComment = async (param, res) => {
    var rtn = {};
    try {
        var items = await comment.GetAllComment(param.body);
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
}

exports.countUpvoteQuestionAnswerComment = async (param, res) => {
    try {
        var req = param.body;
        req.userId = param.userId;
        var hasCounted = await comment.isUserhasCountedVote(req);
        if (hasCounted.length > 0) {
            return res.status(200).json({
                isSuccess: false,
                message: "user has been voted"
            });
        } else {
            var ins = await comment.countUpvote(req);
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
    catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error
        })
    }

}