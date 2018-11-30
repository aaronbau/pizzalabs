var express = require('express');
var app = express();
var path = require('path');

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'views')));

//set port
var port = process.env.PORT || 8080

app.use(express.static(__dirname + "/views"));

//routes
app.get("/", function(req, res) {
	res.render('landingpage')
})

app.get('/cart', function(req, res) {
  res.render('cart');
});

app.listen(port, function() {
	console.log("app running");
})