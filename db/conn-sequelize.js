const Sequelize = require('sequelize');
const CustomerModel = require('../model/cutomer');
const AccountModel = require('../model/account');
const TransactionModel = require('../model/transaction');

const sequelize = new Sequelize('tugas_pertama', 'root', '',{
    host : 'localhost',
    dialect : 'mysql',
    operatorsAliases: false,

    pool : {
        max : 10, 
        min : 0,
        acquire : 30000,
        idle : 10000
    }
}) 

const Customer = CustomerModel(sequelize, Sequelize);
const Account = AccountModel(sequelize,Sequelize);
const Transaction = TransactionModel(sequelize,Sequelize);
Account.belongsTo(Customer, {foreignKey : 'customerNumber'});
Transaction.belongsTo(Account, {foreignKey : 'Account_number'});

module.exports = {
    Customer,
    Account,
    Transaction
}