var response = require('../model/res');
var accountDao = require('../dao/account-dao-sequelize');

exports.accounts = function(req, res){
    let whereClause = {};
    if(req.query.openDate){
        whereClause.openDate = req.query.openDate;
    }
    if(req.query.accountNumber){
        whereClause.accountNumber = req.query.accountNumber;
    }
    if(req.query.balance){
        whereClause.balance = req.query.balance ;
    }
    if(req.query.customerNumber){
        whereClause.customerNumber = req.query.customerNumber;
    }

    accountDao.getAll(whereClause, function(err, rows){
        if(err){
            console.log('error while select : '+ err);
            response.err(err,res);
        }else{
            // return res.json(rows);
            response.ok(rows, res);
        }
    });
}

exports.getAccountById = function(req, res){
    accountDao.getById(req.params['id'], function(err, result){
        if(err){
            console.log('error call getById : '+ err);
            response.err(err, res);
        }
        response.ok(result, res);
    });
}

exports.insertAccount = function(req, res){
    accountDao.insert(req.body, function(err, result){
        if(err){
            console.log('error call inserted'+ err);
            response.err(err, res);
        }
        response.ok(result, res);
    });
}

exports.updateAccount = function(req, res){
    const body = req.body;
    accountDao.getById(body.accountNumber, function(err, data){
        if(err){
            console.log('error call getById : '+err);
            response.err(err, res);
        }else if (data == null){
            response.datanotfound('data not found !! ', res);
        }else{
            accountDao.update(body.accountNumber, body, function(error, result){
                if(error){
                    console.log('data call update'+ err);
                    response.err(err, res);
                }
                response.ok('Update Successfully : '+result.message, res);
            });
        }
    });
}

exports.deleteAccount = function(req, res){
    accountDao.getById(req.params['id'], function(err, data){
        if(err){
            response.err(err, res);
        }else if(data == null){
            response.datanotfound('data not found !! ', res);
        }else{
            accountDao.deleted(req.params['id'],function(error, result){
                if(error){
                    response.err(err, res);
                }
                response.ok(result.affectedRows +' data has been deleted  ', res);
            });
        }
    });
}

