module.exports = (sequelize, type) => {
    return sequelize.define('customer',{
        customerNumber : {
            field : 'customer_number',
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        firstName: {
            field:'First_name',
            type: type.STRING
        },
        lastName: {
            field:'Last_name',
            type: type.STRING
        },
        birthDate: {
            field:'Birth_date',
            type: type.DATE
        },
        username: {
            field:'Username',
            type: type.STRING
        },
        password: {
            field:'Password',
            type: type.STRING
        },
        phoneType: {
            field:'Phone_type',
            type: type.STRING
        },  phoneNumber: {
            field:'Phone_number',
            type: type.STRING
        }
    }, {
        tableName: 'customer',
        timestamps: false
    })
}