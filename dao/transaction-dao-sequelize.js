const {Transaction, Account , Customer } = require('../db/conn-sequelize');
var logger = require('winston');

exports.getAll = function getAll(whereClause, callback){
    Transaction.findAll({
        where : whereClause,
       include : [
           {
               model : Account,
               include : [{
                   model : Customer
               }]
           }
       ]
    })
    .then ((transactions)=>{
        return callback(null, transactions);
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
}

exports.getById = function getById(id, callback){
    Transaction.findById(id,{
        include : [Account]
    })
    .then(transaction=>{
        return callback(null, transaction)
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
}

exports.insert = function insert (data, callback){

    let transaction = data ;
    if(transaction.account==null && transaction.accountNumber==null){
        res.json('Account kosong');
    }else{
        if(transaction.customerNumber==null){
            transaction.accountNumber = transaction.account.accountNumber;
        }
    }

    Transaction.create(transaction)
    .then(transaction =>{
        return callback(null, transaction);
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
}

exports.update = function update(id, data, callback){
    Transaction.update(data,{
        where : {idTransaction : data.idTransaction},
        returning : true,
        plain : true
    })
    .then(transaction=>{
        // logger.info(transaction);
        return callback(null, data);
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
}

exports.deleted = function deleted(id, callback){
    Transaction.destroy({
        where : {idTransaction : id}
    })
    .then(result=>{
        logger.info(result);
        return callback(null, id);
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error)
    })
}