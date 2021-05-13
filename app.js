const port = process.env.PORT || 3000;
const express = require('express');
const logController = require('./controllers/LogController');
const indexController = require('./controllers/IndexController');
const errorController = require('./controllers/ErrorController');
const registerController = require('./controllers/RegisterController');
const profileController = require('./controllers/ProfileController');
const lobbyController = require('./controllers/lobbyController');
const dataCTRL = require('./controllers/databaseController');
const app = express();
const expressLayouts = require('express-ejs-layouts');

//before middleware
app.use(logController.log);
app.use(express.json());
app.use(express.static('public'));
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/img', express.static('public/img'));
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(expressLayouts);

//routes
app.get('/', indexController.getIndex);
app.get('/sign-up', registerController.getSignup);
app.post('/sign-up', registerController.postSignup);
app.get('/profile', profileController.getProfile);
app.post('/profile', profileController.postProfile);
app.get('/users', registerController.getAllRegistered);

app.get('/lobby', lobbyController.createLobby);
app.get('/join', lobbyController.joinLobby);

app.get('/howstart',function(req, res){
    res.render('howstart');
});
app.get('/about',function(req, res){
    res.render('about');
});


//views
app.set('views', './views');
app.set('view engine', 'ejs');
app.set('layout', './layout');

//after middleware
app.use(errorController.respondInternalError);
app.use(errorController.respondNoResourceFound);




dataCTRL.openConnection;
app.listen(port, () => console.info(`server listening on port ${port}`))
