var mongoose = require('mongoose');

M_DB_URI = process.env.MONGODB_URI ||'mongodb://localhost:27017/chat-app'

mongoose.Promise = global.Promise;
mongoose.connect(M_DB_URI);

module.exports = {mongoose};
