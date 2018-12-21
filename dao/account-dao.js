var conn = require('../db/con');

const sqlGetAll = 'SELECT * FROM account' ;
const sqlGetById = 'SELECT * FROM account WHERE Account_number = ?';
const sqlInsert = 'INSERT INTO account SET ?' ;
const sqlUpdate = 'UPDATE account SET ? WHERE Account_number = ?';
const sqlDelete = 'DELETE FROM account WHERE Account_number = ?';
const sqlGetAccountByCust = "SELECT * FROM account WHERE customer_number = ? ";

exports.getById = function getById(id, callback){
    conn.query(sqlGetById, id , function(error, rows){
        if(error){
            console.log(error);
            return callback(error);
        }
        callback(null, rows[0]);
    });
}

exports.getAll = function getAll (callback){
    conn.query(sqlGetAll,function(error, rows){
        if(error){
            console.log(error);
            return callback(error);
        }
        callback(null, rows);
    });
}

exports.insert = function insert(data, callback){
    conn.query(sqlInsert,data, function(error, rows){
        if(error){
            console.log(error);
            return callback(error);
        }
        callback(null, rows);
    });
}

exports.update = function update(id, data, callback){
    conn.query(sqlUpdate, [data, id], function(error, rows){
        if(error){
            console.log(error);
            return callback(error);
        }
        callback(null, rows);
    });
}

exports.deleted = function deleted(id, callback){
    conn.query(sqlDelete, id, function(error, rows){
        if(error){
            console.log(error);
            return callback(error);
        }
        callback(null, rows);
    });
}

exports.getByIdCust = function getByIdCust(id, callback){
    conn.query(sqlGetAccountByCust, id , function(error, rows){
        if(error){
            console.log(error);
            return callback(error);
        }
        callback(null, rows[0]);
    });
}