const {Account, Customer} = require('../db/conn-sequelize');
var logger = require('winston');

exports.getAll = function getAll(whereClause, callback) {
    Account.findAll({
        where : whereClause,
        include:[Customer]
    })
    .then((accounts) => {
        return callback(null, accounts);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.getById = function getById(id, callback){
    Account.findById(id, {
        include:[Customer]
    })
    .then(account=>{
        return callback (null, account);
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
}

exports.insert = function insert(data, callback) {
    let account = data;
    if(account.customer==null && account.customerNumber==null){
        res.json('customer kosong');
    }else{
        if(account.customerNumber==null){
            account.customerNumber = account.customer.customerNumber;
        }
    }
    
    Account.create(account)
    .then(account => {

        return callback(null, account);
    })
    .catch((error) => {
        logger.error(error);
        return callback(error);
    })
};

exports.update = function update(id, data, callback){
    Account.update(data,{
        where : {accountNumber : data.accountNumber},
        returning: true,
        plain: true
       
    })
    .then(account=>{
        return callback(null, data)
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
}

exports.deleted = function deleted (id, callback){
    Account.destroy({
        where : {accountNumber : id}
    })
    .then(result=>{
        logger.info(result);
        return callback(null, id) ;
    })
    .catch((error)=>{
        logger.error(error);
        return callback(error);
    })
}


