
var response = require('../model/res');
var connection = require('../db/con');
var util = require ('util');

const sqlgetById = "SELECT * FROM customer WHERE customer_number = ?" 
const sqlUpdate = 'UPDATE customer set ? WHERE customer_number = ? ' ;

exports.customer = function(req, res) {
    connection.query('SELECT * FROM customer', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

function getById(id, callback) {
    connection.query(sqlgetById, id, function (error, rows){
        if(error){
            console.log(error);
            return callback(error);
        } 
        callback(null, rows[0]);
    });
};


exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};


exports.insertCustomer = function (req, res){
    const post = {
        First_name : req.body.firstName,
        Last_name : req.body.lastName,
        Birth_date : req.body.birthDate,
        Username : req.body.username,
        Password : req.body.password,
        Phone_type : req.body.phonetype,
        Phone_Number : req.body.phoneNumber 
    };

    connection.query('insert into customer set ? ', post, function(err, rows){
        if(err){
            console.log(err);
        }else{
            response.ok(rows.affectedRows + "Data Success Inserted", res);
        }
    })
}

exports.deleteCustomer = function (req,res){

    const sql = "DELETE FROM customer WHERE customer_number = ?" ;
    connection.query(sql, req.params['id'], (err, result) => {
        if(!err){
            response.ok(result.affectedRows, res) ;
        }else{
            console.log(err);
        }       

    } )
}

exports.getCustomerGetbyId = function (req,res){

    const sql ="SELECT * FROM customer WHERE customer_number= ?" ;
    connection.query(sql, req.params['id'], (err, result) =>{
        if(!err)
        response.ok(result, res);
        else
        console.log(err) ;
        } )
}

exports.updateCustomer = function(req, res) {
    getById(req.body.customer_number, function(err, data){
        if(err || data==null){
            console.log('error call getById : '+err);
            response.ok('error / data kosong', res);
        } else{
            connection.query(sqlUpdate,[req.body, req.body.customer_number], function (error, rows){
                if(error){
                    console.log(error);
                } 
                response.ok(rows, res);
            });
        }
    });

};

