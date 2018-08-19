
const express = require('express');
const app = express();

var MongoClient = require('mongodb').MongoClient;
 
var url = "mongodb://localhost:27017/";

app.get('/', function(req, res, next) {
  res.send('test');
});

app.get('/ListofMatches', function (req, res) {
	
MongoClient.connect(url, function(err, db) {

  if (err) throw err;

  	var dbo = db.db("cridb");
  	var data = dbo.collection("matches").find({}).toArray(function(err, result) {

  if (err) throw err;
	console.log(result);
	res.json(result);
	
db.close();
  });
 });
})

app.listen(4000, () => console.log('Listening on port 4000'));
