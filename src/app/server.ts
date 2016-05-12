import {ToDo, IToDo} from'./todo';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {ToDos} from './todos';

var todos:IToDo[] = [];

var app = module.exports.app = exports.app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var host = `http://localhost:${port}`;
var urls = {
    post: '/session/create'
};

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
    next();
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json(urls);
});

router.route(urls.post)
    .post(function (req, res) {
        res.json({"token": "0f3a641f-1e0c-4498-936f-b9ab14ab7f6a"});
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api', router);
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);