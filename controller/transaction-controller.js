var response = require('../model/res');
var transactionDao = require('../dao/transaction-dao-sequelize');

exports.transactions = function (req, res){
    let whereClause = {};
    if(req.query.type){
        whereClause.type = req.query.type;
    }
    if(req.query.amount){
        whereClause.amount = req.query.amount;
    }
    
    if(req.query.amountSign){
        whereClause.amountSign = req.query.amountSign;
    }
    
    if(req.query.idTransaction){
        whereClause.idTransaction = req.query.idTransaction;
    }
    
    if(req.query.accountNumber){
        whereClause.accountNumber = req.query.accountNumber;
    }

    transactionDao.getAll(whereClause,function(err, rows){
        if(err){
            response.err(err, res);
        }
        // return res.json(rows);
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
        response.ok("data inserted "+ result.idTransaction, res);
    });
}

exports.updateTransaction = function (req, res){
    const body = req.body ;
    transactionDao.getById(body.idTransaction, function(err, data){
        if(err){
            response.err(err, res)
        }else if(data == null){
            response.datanotfound('data not found !', res);
        }else{
            transactionDao.update(body.idTransaction, body, function(err, result){
                if(err){
                    response.err(err, res);
                }
                response.ok('data Update '+ result.idTransaction, res);
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
                response.ok(result.effectedRow +'data has been deteled ', res);

            });
        }
    });
}
