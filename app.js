// Require packages
var express        = require('express');
var cors           = require('cors');
var bodyParser     = require('body-parser');
var morgan         = require('morgan');
var mongoose       = require('mongoose');
var methodOverride = require('method-override');
var app            = express();

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use("/", express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendfile('public/index.html');
});

// Setup database
var databaseURL    = 'mongodb://localhost:27017/flash-app';
mongoose.connect(process.env.MONGODB_URI || databaseURL);

// Require routes
var routes         = require('./config/routes');
  
// Setup Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === "object" && "_method" in req.body){
    var method = req.body._method;
    delete req.body._method;
    return method; 
  }
}));
app.use(routes);








io.on('connection', function(socket){
  console.log('a user connected');

  // io.emit('new user', 'new user connection');
  socket.on('update location' , function(user) {
    //the user is an abject from socket.emit.updatelocation
    //sending info back
    console.log("This should be hidden: " + user.display)

  if(!!user.display){
    socket.broadcast.emit('location updated' , user);
    console.log(user);
    console.log('location updated');
  }

  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });


});






var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *:3000');
});


// Listen on the correct PORT
// app.listen(process.env.PORT || 3000);
// console.log("Express is alive and listening.")