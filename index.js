let app = require('express')();
let server = require('http').Server(app);
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let mongoPromise = require('./app/config/database-config');
let Comment = require('./app/models/comment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); //<-- you can change this with a specific url like http://localhost:4200
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

mongoPromise

	.then(db=>{


		app.get('/', (req, res)=> {
			console.log(db.models.Comment.aggregate);
			db.models.Comment.find({}, (err, data)=>{
				if(err){
					res.status(404).json({'error': err});
				}
		  		console.log(data);
		  		res.status(200).type('json').json(data);
		  	});


		});


		app.post('/', (req, res)=>{
			let comment = new db.models.Comment({name: req.body.name, text: req.body.text});
			comment.save((err, data)=>{
				if(err){
					res.status(401).json({'error': err});
				}
				res.status(201).json(data);
			});
		});


		app.put('/', (req, res)=>{

			if(req.body.type === 'u'){
				db.models.Comment.findByIdAndUpdate(req.body._id,
				 {
					$inc: { 'upvotes': 1 }
				 }, 
				 (err, comment)=>{
					if(err)
						res.status(400).json({'error': err});

					res.status(200).json({'created': 'ok'});
				});
			}
			else if(req.body.type === 'd'){
				db.models.Comment.findByIdAndUpdate(req.body._id,
				 {
					$inc: { 'downvotes': 1 }
				 }, 
				 (err, comment)=>{
					if(err)
						res.status(400).json({'error': err});

					res.status(200).json({'created': 'ok'});
				});
			}				


		});


    
	})
	.catch(err=>{

	  console.log(err);
	
	});




server.listen(8000, ()=>{

	console.log('Connected');

});