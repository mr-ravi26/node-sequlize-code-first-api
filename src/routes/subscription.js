const subscription = require("../controllers").subscription

module.exports = (app) => {
    app.post('/subscription', subscription.create);
    app.get('/subscription/:user_id', subscription.getUserSubscriptions);
    app.get('/subscription/:user_id/:start_date', subscription.getSubscription);
}