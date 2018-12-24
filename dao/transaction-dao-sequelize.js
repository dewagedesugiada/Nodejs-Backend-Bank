const {Transaction, Account} = require('../db/conn-sequelize');
var logger = require('winston');

exports.getAll = function getAll(callback){
    Transaction.findAll({
        include : [Account]
    })
    .then ((transactions)=>{
        return callback(null, transactions);
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
}