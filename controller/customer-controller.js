var response = require('../model/res');
var customerDao = require('../dao/customer-dao-sequeliza');
var logger = require('../winston');
var util = require('util');

exports.customers = function (req, res){
    customerDao.getAll(function (error, rows){
        if(error){
            logger.error("error while select : " +error);
            // console.log("error while select : " +error);
            response.err(error,res);
        }else{
        //    return res.json(rows);
            response.ok(rows, res);
        }
    });
};

exports.getCustomerById = function(req, res){
    customerDao.getById(req.params['id'], function(err, result){
        if(err){
            logger.error('error call getByid : '+err);
            // console.log('error call getByid : '+err);
            response.err(err, res);
        }else if(result ==null){
            
            logger.error('error call getByid : '+err);
            response.datanotfound('data not found ', res);

        }
        response.ok(result, res);
    });
};

exports.insertCustomer = function(req,res){
    customerDao.insert(req.body, function(err, result){
        if(err){
            // console.log(err);
            logger('data not inserted'+ err)
            response.err(err, res);
        }
        response.ok( 'data is Inserted '+ result.insertId, res);
    });
};

exports.updateCustomer = function(req, res){
    const body = req.body;
    customerDao.getById(body.customerNumber, function(err, data){
        if(err){
            // console.log(err);
            logger.error('id not found'+err);
            response.err(err, res);
        }else if (data == null){
            logger.error('id not found'+err);
            response.datanotfound('data not found ! ', res);
        }else{
            customerDao.update(body.customerNumber, body, function(err, result){
                if(err){
                    console.log("error call update : " +err);
                    response.err(err, res);
                }
                response.ok("Data has been update : "+ result.customerNumber, res);
            });
        }
    });
};

exports.deleteCustomer = function(req, res){
    customerDao.getById(req.params['id'], function(err, data){
        if(err){
            console.log('error call getById : '+err);
            logger.error('error call getById : '+err);

            response.err(err, res);
        }else if (data==null) {
            logger.error('error call getById : '+err);

            response.datanotfound("data in not found :", res);
        }else{
           customerDao.deleted(req.params['id'], function(err, result){
               if(err){
                    // console.log('error call delete');
                    logger.error('error call delete'+err);
                   
                   response.err(err, res);
               }
               response.ok(result + ' data has been deleted ', res);
           });
        }
    });
};