module.exports = (sequelize, type) => {
    return sequelize.define('transaction', {
        idTransaction : {
            field : 'Id_transaction',
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        type : {
            field : 'Type',
            type : type.STRING
        },
        amount : {
            field : 'Amount',
            type : type.STRING
        },
        amountSign : {
            field : 'Amount_sign',
            type :type.STRING
        },
        accountNumber : {
            field : 'Account_number',
            type : type.INTEGER,
            ononDelete : 'CASCADE',
            reference : {
                model : "Account",
                key : 'accountNumber'
            }
        }

    },{
        tableName : "transaction",
        timestamps : false 
    })
}