module.exports = (sequlize, type) => {
    return sequlize.define('account',{
        accountNumber : {
            field : 'Account_number',
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        openDate : {
            field : 'Open_date',
            type : type.STRING
        },
        balance : {
            field : 'Balance',
            type : type.STRING
        },
        customer_number : {
            type : type.INTEGER,
            ononDelete: 'CASCADE',
            references:{
              model:'Customer',
              key: 'customerNumber'
            }
  
        }
    },{
        tableName : "account",
        timestamps : false 
    })
}