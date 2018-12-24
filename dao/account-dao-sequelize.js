const {Account, Customer} = require('../db/conn-sequelize');
var logger = require('winston');

exports.getAll = function getAll(callback) {
    Account.findAll({
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
    Account.create(data,{
        include : [Customer]
    })
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


