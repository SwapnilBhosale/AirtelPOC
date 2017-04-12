var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
var app = express();
var redis = require('redis');
var client = redis.createClient();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/submitForm",function(req,res,next){
  console.log("form data : ",req.body);
  var body = req.body;
  var data = {
    'name' : body.first_name +" "+ body.last_name,
    'email' : body.email,
    'phone' : body.phone,
    'address' : body.address,
    'state' : body.state,
    'city' : body.city,
    'zip' : body.zip,
    'category' : body.category,
    'comment' : body.comment,
    'isAppointment' : body.isAppointment

  };
  //res.json({"status":true,"message":"Form submitted successfully"});
  db.getConnection(function(err,conn){
    if (err) {
      console.error('SQL Connection error: ', err);
      res.json({"status":false,"errorCode":"11","errorMessage":"SQL_CONNECTION_ERROR"});
      return;
    }
    conn.query("INSERT INTO complaint SET ?",data,function(err,result){
      if(err){
        conn.release();
        console.error('Insert data error : ',err);
        res.json({"status":false,"errorCode":"12","errorMessage":"SQL_QUERY_CONNECTION_ERROR"});
        return 
      }
      console.log("insert complaint successfull : ",result); 
      conn.release();
      client.incr(body.storeId,function(err,result){
        console.log("Result of incr : "+result);
        client.get(body.storeId,function(err,resu){
          console.log("Result for redis get : "+resu);
          client.rpush(body.storeId+"_"+body.category,resu);
          console.log("Pushed in redis list queye : "+(body.storeId+"_"+body.category));
          res.json({"status" : true, "message" : "complaint registered successfully","token" : resu}); 
          return;
        });
      });
    })
  }); 
});

module.exports = router;
