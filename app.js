var express = require('express');
var path = require('path');
 // var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var common = require('./routes/common');
var login = require('./routes/account/login');
var register = require('./routes/account/register');
var forgetPassword = require('./routes/account/forgetPassword');
var itemList = require('./routes/item/itemList');
var item = require('./routes/item/item');
var shops = require('./routes/shops/shops');
var mycollect = require('./routes/shops/mycollect');
var mybought = require('./routes/shops/mybought');
var order = require('./routes/order/order');
var apply = require('./routes/apply/apply');
var success = require('./routes/apply/success');
var myOrder = require('./routes/order/myOrder');
var waitpay = require('./routes/order/waitpay');
var waitgoods = require('./routes/order/waitgoods');
var waiteval = require('./routes/order/waiteval');
var error = require('./routes/error');
// var news = require('./routes/news/news');
// var newsDetail = require('./routes/news/newsDetail');
// var introduction = require('./routes/firm/introduction');
// var other = require('./routes/firm/other');
// var contact = require('./routes/firm/contact');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/index', index);
app.use('/common', common);
app.use('/itemList', itemList);
app.use('/item', item);
app.use('/login', login);
app.use('/register', register);
app.use('/forgetPassword', forgetPassword);
app.use('/shops',shops);
app.use('/mycollect',mycollect);
app.use('/mybought',mybought);
app.use('/order',order);
app.use('/myorder',myOrder);
app.use('/apply',apply);
app.use('/success',success);
app.use('/waitpay',waitpay);
app.use('/waitgoods',waitgoods);
app.use('/waiteval',waiteval);
app.use('/error', error);
// app.use('/news', news);
// app.use('/newsDetail', newsDetail);
// app.use('/introduction', introduction);
// app.use('/other', other);
// app.use('/contact', contact);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(req, res, next){
  var lan = req.cookies['lan'];
  if(lan === undefined){
    res.cookie("lan", 'en', {maxAge: 60000});
  }
});
// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
