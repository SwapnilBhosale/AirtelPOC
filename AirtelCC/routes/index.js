var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));


/* GET home page. */
router.get('/:id?', function(req, res, next) {
  if(!req.params.id){
    console.log("Sending error page");
    res.render('error',{message:"Please select store number","error":{"status":"Failed to find store","stack" : ""}});
  }else{
    res.render('index', { title: 'Airtel CC' ,storeId : req.params.id});
  }
});

module.exports = router;
