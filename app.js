//using ntwitter
var twitter = require('ntwitter');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//TWITTER KEYS

var twitterConsumerKey = process.env.TWITTER_CONSUMER_KEY;
var twitterConsumerSecret = process.env.TWITTER_CONSUMER_SECRET;

var twitterAccessToken = process.env.TWITTER_ACCESS_TOKEN;
var twitterAccessSecret = process.env.TWITTER_ACCESS_SECRET;

//Create server
var server = require('http').createServer(app);
var port = 3000;
server.listen(port);
console.log("Socket.io server listening at http://127.0.0.1:"+ port);

//Initialize twitter and connect it
var twit = new twitter ( {
    consumer_key: twitterConsumerKey,
    consumer_secret: twitterConsumerSecret,
    access_token_key: twitterAccessToken,
    access_token_secret: twitterAccessSecret
});

/*
twit.stream('statuses/filter',{'track': 'love, hate'}, function(stream){
    stream.on('data',function(data) {
      //console.log(data);
      //var txt= JSON.parse(data);
      console.log(data.text);
    });
});
*/

var sio = require ('socket.io').listen(server);
var lv=0, ht=0;
//send tweets to the client

sio.sockets.on('connection', function(socket) {
    //search tweets with keywords love and hate
   twit.stream('statuses/filter',{'track': 'love, hate'}, function(stream){
     stream.on('data',function(data) {
       if(data.text.toLowerCase().indexOf("love")>=0)
       {
         lv++;  //love tweet counter
         socket.volatile.emit('love-tweet' ,{text: data.text, user: data.user.screen_name, love: lv});
       }
       else
       {
	//hate tweet: ht <-- counter
         ht++;
         var total = ht+lv;
         socket.volatile.emit('hate-tweet',{text: data.text, user: data.user.screen_name, hate: ht, total: total});
       }
      });
   });

    socket.on('disconnect', function() {
      console.log('Web client disconnected');
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
