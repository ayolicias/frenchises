'use strict';

const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const Provinces = require('./routes/clients');
const ProvinceAPI = require('./api/province-api');
const Clients = require('./routes/province');
const ClientAPI = require('./api/client-api');

const app = express();
const session = require('express-session');
const flash = require('express-flash');
const ProvinceService = require('./services/province-service');
const ClientService = require('./services/client-servince');

const pg = require('pg');
const provinceApi = require('./api/province-api');
const province = require('./routes/franch');
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://ziyanda:pg123@localhost:5432/frenchises_dbsite';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });

const provinceService = ProvinceService(pool);
const clientService = ClientService(pool);
const provinceRoutes = Provinces(provinceService);
const provinceAPI = ProvinceAPI(provinceService);
const clientRoutes = Clients(clientService, provinceService);
const clientAPI = ClientAPI(clientService);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
   
//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

//setup the handlers
app.get('/provinces', provinceRoutes.show);
app.get('/provinces/add', provinceRoutes.showAdd);
app.get('/provinces/edit/:id', provinceRoutes.get);
app.get('/provinces/home', provinceRoutes.showAdd);
app.get('/provinces/update/1', provinceRoutes.update);

// app.get('/provinces/home', provinceRoutes.showAdd);
// app.get('/provinces/home', provinceRoutes.showAdd);

app.post('/provinces/home', provinceRoutes.sortRecords);
app.post('/province/update', provinceRoutes.update);
app.post('/provinces/add', provinceRoutes.add);
app.post('/province/add', provinceRoutes.add);
app.post('/province/home', provinceRoutes.sorts);

//delete
app.get('/province/delete', provinceRoutes.delete);

app.get('/', clientRoutes.show);
app.get('/clients', clientRoutes.show);
app.get('/client/edit', clientRoutes.showAdd);

app.get('/client/update', clientRoutes.showAdd);
app.get('/client/add', clientRoutes.showAdd);
app.get('/client/home', clientRoutes.showAdd),
app.get('/client/home', clientRoutes.sortRecords),

// app.post('/client/home', clientRoutes.sortRecords),
app.post('/client/home', clientRoutes.sorts),
app.post('/client/add', clientRoutes.add);
app.post('/client/update', clientRoutes.update);

//delete
app.get('/client/delete/:id', clientRoutes.delete);

app.get('/api/client', clientAPI.all);
app.post('/api/client', clientAPI.add);

app.get('/api/province', provinceAPI.all);

app.use(errorHandler);

// // configure the port number using and environment number
// var portNumber = process.env.PORT || 3000;

// //start everything up

// app.listen(portNumber, function () {
//   console.log('Create, Read, Update, and Delete (clients) server listening on:', portNumber);
// });

// let PORT = process.env.PORT || 3000;
// app.listen(PORT, function () {
// console.log("App started on Port", PORT);
// }); 

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('Server started on port '+app.get('port'));
});
