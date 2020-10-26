var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
const port = 3001;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwertyuiop",
    database: "mc_master"
  });

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/search', urlencodedParser, function(req, res){
    console.log(req.body);
    con.query("SELECT * FROM tblprodotti where nome like '%" + req.body.filter + "%'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.end(JSON.stringify(result));
    });
})

var server = app.listen(port, function(){ 
    console.log(`Example app listening on port %s!`, server.address().port)
})