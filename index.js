'use strict';

const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const Provinces = require('./routes/provinces');
const ProvincesAPI = require('./api/provinces-api');
const Clients = require('./routes/clients');
const ClientsAPI = require('./api/clients-api');

const app = express();
const session = require('express-session');
const flash = require('express-flash');
const ProvinceService = require('./services/province-service');
const ClientsService = require('./services/clients-service');
const pg = require("pg");
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
const provinceAPI = CategoriesAPI(provinceService);
const clientRoutes = Clients(clientService, provinceService);
const clientsAPI = clientsAPI(clientService);

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
app.post('/provinces/update/:id', provinceRoutes.update);
app.post('/provinces/add', provinceRoutes.add);
//delete
app.get('/provinces/delete/:id', provinceRoutes.delete);

app.get('/', clientRoutes.show);
app.get('/clients', clientRoutes.show);
app.get('/clients/edit/:id', clientRoutes.get);
app.post('/clients/update/:id', clientRoutes.update);
app.get('/clients/add', clientRoutes.showAdd);
app.post('/clients/add', clientRoutes.add);
//delete
app.get('/clients/delete/:id', clientRoutes.delete);

app.get('/api/clients',clientsAPI.all);
app.post('/api/clients',clientsclientsAPI.add);

app.get('/api/provinces', provinceAPI.all);

app.use(errorHandler);

//configure the port number using and environment number
var portNumber = process.env.PORT || 3000;

//start everything up
app.listen(portNumber, function () {
    console.log('Create, Read, Update, and Delete (frenchises) server listening on:', portNumber);
});
