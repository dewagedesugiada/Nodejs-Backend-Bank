var response = require('../model/res');
var customerDao = require('../dao/customer-dao');

exports.customers = function (req, res){
    customerDao.getAll(function (error, rows){
        if(error){
            console.log("error while select : " +error);
            response.err(error,res);
        }else{
            response.ok(rows, res);
        }
    });
};

exports.getCustomerById = function(req, res){
    customerDao.getById(req.params['id'], function(err, result){
        if(err){
            console.log('error call getByid : '+err);
            response.err(err, res);
        }
        response.ok(result, res);
    });
};

exports.insertCustomer = function(req,res){
    customerDao.insert(req.body, function(err, result){
        if(err){
            console.log(err);
            response.err(err, res);
        }
        response.ok( 'data is Inserted '+ result.insertId, res);
    });
};

exports.updateCustomer = function(req, res){
    const body = req.body;
    customerDao.getById(body.customer_number, function(err, data){
        if(err){
            console.log(err);
            response.err(err, res);
        }else if (data == null){
            response.datanotfound('data not found ! ', res);
        }else{
            customerDao.update(body.customer_number, body, function(err, result){
                if(err){
                    console.log("error call update : " +err);
                    response.err(err, res);
                }
                response.ok("Data has been update : "+ result.message, res);
            });
        }
    });
};

exports.deleteCustomer = function(req, res){
    customerDao.getById(req.params['id'], function(err, data){
        if(err){
            console.log('error call getById : '+err);
            response.err(err, res);
        }else if (data==null) {
            response.datanotfound("data in not found :", res);
        }else{
           customerDao.deleted(req.params['id'], function(err, result){
               if(err){
                   console.log('error call delete');
                   response.err(err, res);
               }
               response.ok(result.affectedRows + ' data has been deleted ', res);
           });
        }
    });
};