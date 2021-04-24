
const user = require("../controllers").user

module.exports = (app) => {
    app.put('/user/:id', user.update);
    app.post('/user', user.create);
    app.get('/user', user.list);
    app.get('/user/:id', user.get);
}