const question = require("../model/question");
const formidable = require("formidable");
// const conf = require("../config/upload.config");
// const { uploadfile } = require("../middlewares");


exports.insertQuestion = async (param, res) => {
    try {
        var req = param.body;
        req.userId = param.userId;
        var ins = await question.insertQuestion(req);
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
    catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error
        });
    }

}




exports.countViewQuestion = async (param, res) => {
    var req = param.body;
    req.userId = param.userId;
    var ins = await question.countViews(req);
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

exports.getAllQuestion = async (param, res) => {
    var rtn = {};
    try {
<<<<<<< HEAD
        var items = await question.getAllQuestion(param.body);

        status = 200;
        rtn.isSuccess = true;
        rtn.message = "Success";
        rtn.data = items;
        rtn.total = items.total;
        return res.status(status).json(rtn);
    }
    catch (error) {
        rtn.isSuccess = false;  
=======
        // var items = await question.getAllQuestion(param.body);

        status = 200;
        // rtn.isSuccess = true;
        // rtn.message = "Success";
        // rtn.data = items;
        // rtn.total = items.total;
        return res.status(status).json(rtn);
    }
    catch (error) {
        rtn.isSuccess = false;
>>>>>>> a080bc6ce07c656c172c4e3c311618f7dbf6f575
        rtn.status = 500;
        rtn.message = "There Are something Wrong in Our System"
        return res.status(500).json(rtn);
    }
}

