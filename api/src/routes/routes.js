const bodyParser = require('body-parser');
const votacao = require('./votacao-route');

module.exports = function(app) {
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    
    app.use('/votacao', votacao);
}