const moongese = require('moongose')
const  mongoose  = require('mongoose')

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    _userId : { type:moongese.Schema.Types.ObjectId, required: true, ref:'Usuario' },
    token: { type: String, required:true },
    createAt: { type:Date, required:true, default: Date.now, expires: 43200}
});

module.exports = mongoose.model('Token', TokenSchema );