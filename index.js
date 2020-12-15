'use strict';

const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const Franch = require('./routes/franch');
const FranchAPI = require('./api/franch-api');
const Franchises = require('./routes/franchises');
const FranchisesAPI = require('./api/franchises-api');

const app = express();
const session = require('express-session');
const flash = require('express-flash');
const FranchService = require('./services/franch-service');
const FranchiseService = require('./services/franchises-service');
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

const franchService = FranchService(pool);
const franchiseService = FranchiseService(pool);
const franchRoutes = Franch(franchService);
const franchAPI = FranchAPI(franchService);
const franchisesRoutes = Franchises(franchiseService, franchService);
const franchisesAPI = FranchisesAPI(franchiseService);

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
app.get('/franch', franchRoutes.show);
app.get('/franch/add', franchRoutes.showAdd);
app.get('/franch/edit/:id', franchRoutes.get);
app.get('/franch/home', franchRoutes.showAdd);
app.get('/franch/update/1', franchRoutes.update);

app.post('/franch/home', franchRoutes.show);
app.post('/franch/update', franchRoutes.update);
app.post('/franch/add', franchRoutes.add);
app.post('/franch/home', franchRoutes.showAdd);

app.post('/franchises', franchisesRoutes.show);
app.post('/franchises/home', franchisesRoutes.show);
app.post('/franchises/get', franchisesRoutes.get);
app.post('/franchises/add', franchisesRoutes.add);
app.post('/franchises/home', franchisesRoutes.showAdd);
app.post('/franchises/update', franchisesRoutes.update);

app.get('/franchises', franchisesRoutes.show);
app.get('/franchises/home', franchisesRoutes.show);
app.get('/franchises/get', franchisesRoutes.get);
app.get('/franchises/add', franchisesRoutes.add);
app.get('/franchises/home', franchisesRoutes.showAdd);
app.get('/franchises/update', franchisesRoutes.update);

//delete
app.get('/franch/delete/:id', franchRoutes.delete);
app.get('/franchises/delete/:id', franchisesRoutes.delete)

app.get('/api/franchises', franchisesAPI.all);
app.post('/api/franchises', franchisesAPI.add);

app.post('/api/franchises', franchisesAPI.add);
app.get('/api/franch', franchAPI.all);

app.use(errorHandler);

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('Server started on port '+app.get('port'));
});
