let mongoose = require('mongoose');

const mongo = 'mongodb://127.0.0.1/hackernews_comment_node';

let mongoPromise = mongoose.connect(mongo, {
  useMongoClient: true
});


module.exports = mongoPromise;