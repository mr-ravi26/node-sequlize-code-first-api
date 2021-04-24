const user = require("./user");
const subscription = require("./subscription");

module.exports = (app) => {

    user(app);
    subscription(app);

    // error handler
    app.use(function (err, req, res, next) {
        console.error("Application error", err)
        res.status(err.status || 500).send(err.message || 'Server error!.');
    });
};

