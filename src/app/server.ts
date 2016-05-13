import * as express from 'express';
import * as bodyParser from 'body-parser';

var users = [{
    userName: "Admin",
    password: "Admin",
    displayName: "Mr Admin",
    id: "30453856-f626-4786-bae4-a9d151cc19b1"
}];

var app = module.exports.app = exports.app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var host = `http://localhost:${port}`;

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
    res.json('Hello World');
});

router.route('/session/create')
    .post(function (req, res) {
        let found;
        users.map((user) => {
            if (user.userName === req.params.userName &&
                user.password === req.params.password) {
                found = user;
            }
        });
        if (found) {
            res.json({
                "token": "0f3a641f-1e0c-4498-936f-b9ab14ab7f6a",
                "userName": found.userName,
                "id": found.username,
                "displayName": found.displayName
            });
        } else {
            res.status(404);
        }


    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api', router);
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);