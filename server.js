var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var account  = require('./account');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'views')));

app.use(express.static(__dirname + "/views"));

//set port
var port = process.env.PORT || 8080
var router = express.Router();

app.use(cors());
app.use('/api', router);

mongoose.connect('mongodb://aarontbautista:abcd1234@ds119374.mlab.com:19374/pizzalabs');

router.use(function (req, res, next) {
    console.log('Logging of request will be done here');
    next();
});

//REST API
//Accounts
router.route('/accounts').post(function (req, res) {
    var p = new account();
    p.email = req.body.email;
    p.username = req.body.username;
    p.password = req.body.password;
 
    p.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.send({ message: 'Account Created !' })
    })
});

router.route('/accounts').get(function (req, res) {
    account.find(function (err, accounts) {
        if (err) {
            res.send(err);
        }
        res.send(accounts);
    });
});

router.route('/accounts/:account_id').get(function (req, res) {
    account.findById(req.params.account_id, function (err, prod) {
        if (err)
            res.send(err);
        res.json(prod);
    });
});

router.route('/accounts/:account_id').put(function (req, res) {

    account.findById(req.params.account_id, function (err, prod) {
        if (err) {
            res.send(err);
        }
        prod.email = req.body.email;
        prod.username = req.body.username;
        prod.password = req.body.password;
        prod.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Account updated!' });
        });

    });
});


router.route('/accounts/:account_id').delete(function (req, res) {
    account.remove({ _id: req.params.account_id }, function (err, prod) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    })

});

//routes
app.get("/", function(req, res) {
	res.render('landingpage')
})

app.get("/login", function(req, res) {
	res.render('login')
})

app.get("/register", function(req, res) {
	res.render('register')
})

app.get('/cart', function(req, res) {
  res.render('cart');
});

app.listen(port, function() {
	console.log("app running");
})