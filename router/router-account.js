
module.exports = function(app){
    var controller = require('../controller/account-controller');

    app.route('/accounts').get(controller.accounts);
    app.route('/account/:id').get(controller.getAccountById);
    app.route('/account').post(controller.insertAccount);
    app.route('/account').put(controller.updateAccount);
    app.route('/account/:id').delete(controller.deleteAccount);
    app.route('/accountCust/:idcust').get(controller.getAccountByIdCust);

}