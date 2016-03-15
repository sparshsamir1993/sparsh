var Express = require('express');
var app = Express();
var mong = require('mongodb');
var mongo = require('mongodb').MongoClient;
var util = require('util');
var bodyParser = require('body-parser');
var compression = require('compression');

// var url = 'mongodb://localhost:27017/test';
var url = 'mongodb://hulka:bongesh@ds011369.mlab.com:11369/hulka';
var DB;
app.use(Express.static(__dirname +'/dist/main.js'));
app.use(Express.static(__dirname +'index.html'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(compression());

mongo.connect(url, function(err, db) {
    console.log("Connected correctly to server.");
    //db.close();
    DB = db;
});

app.get('/', function(req, res) {
    res.sendFile(__dirname+'/index.html');
});

app.get('/script', function(req, res) {
    console.log("GET SCRIPT");
    res.sendFile(__dirname+'/dist/main.js');
});

app.post('/newTask', function(req, res){
    console.log("TEST");
    DB.collection('test1').insertOne(req.body, function(err, resp) {
        if(err) {
            console.log(err);
        } else {
            console.log("INSERTED DATA");
            //console.log(res);
            res.send();
        }
    });
});

app.post('/updateTask', function(req, res) {
    console.log(req.body);
    var id = req.body.id;
    var o_id = new mong.ObjectID(id);
    var title = req.body.title;
    var body = req.body.body;
    DB.collection('test1').replaceOne(
        {'_id': o_id},
        {
            "title": title,
            "Body": body,
            "user": "1"
        }, function(err, resl) {
            if(err) {
                console.log(err);
            } else {
                res.send();
            }
        }
    );
});
app.post('/completeTask', function(req, res) {
    console.log(req.body);
    var id = req.body.id;
    var o_id = new mong.ObjectID(id);
    var title = req.body.title;
    var body = req.body.body;
    DB.collection('test1').replaceOne(
        {'_id': o_id},
        {
            "title": '[COMPLETED] '+title,
            "Body": body,
            "user": "1",
            "completed": true
        }, function(err, resl) {
            if(err) {
                console.log(err);
            }else {
                res.send();
            }
        }
    );
});

app.post('/deleteTask', function(req, res) {
   console.log(req.body);
    var id = req.body.id;
    var o_id = new mong.ObjectID(id);
    DB.collection('test1').deleteOne(
        { "_id": o_id },
        function(err, results) {
            console.log("DELETED");
            res.send();
        }
    );
});

app.get('/getTasks', function(req,res) {
    var data;
    var notes = [];
    DB.collection('test1').find({"user": "1"},{}).toArray(function(err, r) {
        data = r;
        console.log(typeof(data));
        var processed = 0;
        //var total = data.requestId;
        //console.log(total);
        data.forEach(function(d, i, a) {
            console.dir(d);
            notes.push(d);
            processed++;
            //console.log(processed+"___");
            if(processed == data.length) {
                res.send(notes);
            }
        });
        //res.send(util.inspect(data));
    });
    //console.dir(data);
});

app.listen(process.env.PORT || 9889);
console.log("SERVER STARTED AT 9889");