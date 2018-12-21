var response = require('../model/res');
var transactionDao = require('../dao/transaction-dao');

exports.transactions = function (req, res){
    transactionDao.getAll(function(err, rows){
        if(err){
            response.err(err, res);
        }
        response.ok(rows,res);
    });
}

exports.transactionById = function (req,res){
    transactionDao.getById(req.params['id'], function(err, result){
        if(err){
            response.err(err,res);
        }
        response.ok(result, res);
    });
}

exports.insertTransaction = function (req, res){
    transactionDao.insert(req.body, function(err, result){
        if(err){
            response.err(err, res);
        }
        response.ok("data inserted "+ result.insertId, res);
    });
}

exports.updateTransaction = function (req, res){
    const body = req.body ;
    transactionDao.getById(body.Id_transaction, function(err, data){
        if(err){
            response.err(err, res)
        }else if(data == null){
            response.datanotfound('data not found !', res);
        }else{
            transactionDao.update(body.Id_transaction, body, function(err, result){
                if(err){
                    response.err(err, res);
                }
                response.ok('data Inserted '+ result.message, res);
            });
        }
    });
}

exports.deleteTransaction = function (req, res){
    transactionDao.getById(req.params['id'], function (err, data){
        if(err){
            response.err(err, res);
        } else if(data==null){
            response.datanotfound('data not found !', res);
        }else{
            transactionDao.deleted(req.params['id'], function(err, result){
                if(err){
                    response.err(err, res);
                }
                response.ok(+result.effectedRow +'data has been deteled ', res);

            });
        }
    });
}

exports.transactionByIdAcc = function (req,res){
    transactionDao.getByIdAcc(req.params['id'], function(err, result){
        if(err){
            response.err(err,res);
        }
        response.ok(result, res);
    });
}