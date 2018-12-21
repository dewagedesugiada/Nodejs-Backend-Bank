
module.exports = function(app) {
    var todoList = require('../controller/controller');

    app.route('/').get(todoList.index);

    // app.route('/customer').get(todoList.customer);

    // app.route('/customer/post').post(todoList.insertCustomer);

    // app.route('/customer/:id').delete(todoList.deleteCustomer);

    // app.route('/customer/getByid/:id').get(todoList.getCustomerGetbyId);

    // app.route('/customer/update').put(todoList.updateCustomer);
};