let conf = require('./enviroment.js');
let y;
switch (process.env.NODE_ENV) {
    case 'development':
        y = Object.assign({}, conf.development)
        break;
    case 'production':
        y = Object.assign({}, conf.production)
        break;
    default:
        y = Object.assign({}, conf.development)
}

module.exports = y;