var mysql = require('mysql');
var fs = require('fs');
var readline = require('readline');
var myCon = mysql.createConnection({
    host: "localhost",
    port: "3306",
    database: "storedb",
    user: "root",
    password: ""
});
var rl = readline.createInterface({
    input: fs.createReadStream('./db/seeds.sql'),
    terminal: false
});
rl.on('line', function(chunk){
    myCon.query(chunk.toString('ascii'), function(err, sets, fields){
       if(err) console.log(err);
   });
});
rl.on('close', function(){
    console.log("finished");
    myCon.end();
});