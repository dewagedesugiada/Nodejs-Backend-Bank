
module.exports = function(app){
    var controller = require('../controller/account-controller');

    app.route('/account/list').get(controller.accounts);
    app.route('/account/:id').get(controller.getAccountById);
    app.route('/account').post(controller.insertAccount);
    app.route('/account').put(controller.updateAccount);
    app.route('/account/:id').delete(controller.deleteAccount);


}