let mysql = require('mysql');

let con = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: ""
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT Username, PasswordHash, AccountType FROM USERS", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
  
});