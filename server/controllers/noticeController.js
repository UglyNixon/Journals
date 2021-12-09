const { model } = require("../db");

class NoticeController {

    async get (req,res){
 res.json({message:'checkRole WORK'})
    }

    async post (req,res){

    }
    
}

module.exports = new NoticeController()