const { checkToken } = require('../utils/authorization');

const useMiddleware = (app) => {
    app.use(checkToken);
};

module.exports = useMiddleware;
