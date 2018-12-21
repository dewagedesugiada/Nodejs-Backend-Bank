var conn = require('../db/con');

const sqlGetAll = "SELECT * FROM transaction" ;
const sqlGetById = "SELECT * FROM transaction WHERE Id_transaction = ? ";
const sqlInsert = "INSERT INTO transaction SET ? ";
const sqlUpdate = "UPDATE transaction SET ? WHERE Id_transaction = ? " ;
const sqlDelete = "DELETE FROM transaction WHERE Id_transaction = ? ";
const sqlGetByIdAccount = "SELECT * FROM transaction WHERE Account_number = ?";

exports.getById = function getById (id, callback){
    conn.query(sqlGetById, id, function(error, rows){
        if(error){
            return callback(error);
        }
        callback(null, rows[0]);
    });
}

exports.getAll = function getAll(callback){
    conn.query(sqlGetAll, function(error, rows){
        if(error){
            return callback(error);
        }
        callback(null, rows);
    });
}

exports.insert = function insert (data, callback){
    conn.query(sqlInsert, data, function(error, rows){
        if(error){
            return callback(error);
        }
        callback(null, rows);
    });
}

exports.update = function update (id, data, callback){
    conn.query(sqlUpdate, [data, id], function(error, rows){
        if(error){
            return callback(error);
        }
        callback(null, rows);
    });
}

exports.deleted = function deleted (id, callback){
    conn.query(sqlDelete, id, function(error, rows){
        if(error){
            return callback(error);
        }
        callback(null, rows);
    })
}

exports.getByIdAcc = function getByIdAcc (id, callback){
    conn.query(sqlGetByIdAccount, id, function(error, rows){
        if(error){
            return callback(error);
        }
        callback(null, rows[0]);
    });
}
