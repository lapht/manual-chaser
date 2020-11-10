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
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/search', urlencodedParser, function(req, res){
    console.log('Request for /search: ' + JSON.stringify(req.body));
    con.query("SELECT p.id,p.nome,p.descrizione,p.imageurl,f.nome as nomefornitore FROM tblprodotti p " + 
        "inner join tblfornitori f on p.idfornitore=f.id " + 
        "where p.nome like '%" + req.body.filter + "%'", function (err, result, fields) {
            if (err) throw err;
            console.log('/search response' + JSON.stringify(result));
            res.end(JSON.stringify(result));
        });
})

app.post('/product', urlencodedParser, function(req, res){
    console.log('Request for /product: ' + JSON.stringify(req.body));
    con.query("SELECT p.id,p.nome,p.descrizione,p.imageurl,f.nome as nomefornitore FROM tblprodotti p " + 
        "inner join tblfornitori f on p.idfornitore=f.id " + 
        "where p.id='" + req.body.productId + "'", function (err, result, fields) {
            if (err) throw err;
            console.log('/product response' + JSON.stringify(result));
            res.end(JSON.stringify(result));
        });
})

app.post('/manuals', urlencodedParser, function(req, res){
    console.log('Request for /manuals: ' + JSON.stringify(req.body));
    con.query("SELECT m.id,m.descrizione,l.nome as lingua FROM tblmanuali m " + 
        "inner join tbllingue l on m.idlingua=l.isocod " + 
        "where m.idprodotto='" + req.body.productId + "' order by l.nome", function (err, result, fields) {
            if (err) throw err;
            console.log('/manuals response' + JSON.stringify(result));
            res.end(JSON.stringify(result));
        });
})

app.post('/manual', urlencodedParser, function(req, res){
    console.log('Request for /manual: ' + JSON.stringify(req.body));
    con.query("SELECT * FROM tblmanuali where id='" + req.body.manualId + "'", function (err, result, fields) {
            if (err) throw err;
            console.log('/manual response' + JSON.stringify(result));
            res.end(JSON.stringify(result));
        });
})

var server = app.listen(port, function(){ 
    console.log(`Example app listening on port %s!`, server.address().port)
})