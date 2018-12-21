var conn = require('../db/con');

var sqlGetAll = "SELECT * FROM customer " ;
var sqlGetByid = "SELECT * FROM customer WHERE customer_number = ?" ;
var sqlInsert = "INSERT INTO customer set ?" ;
var sqlUpdate = "UPDATE customer set ? WHERE customer_number = ? ";
var sqlDel = "DELETE FROM customer WHERE customer_number = ? " ;

exports.getById = function getById(id, callback){
    conn.query(sqlGetByid, id, function (error, rows){
        if(error){
            console.log(error);
            return callback(error);
        }
        callback(null, rows[0]);
    });
}

exports.getAll = function getAll(callback){
    conn.query(sqlGetAll, function () {
        
    })
}