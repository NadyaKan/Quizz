module.exports = (express) => {
    // Create express Router
    const   router = express.Router(),
            userRoutes = require('./userRoutes'),
            quizRoutes = require('./quizRoutes'),
            maintainRoutes = require('./maintainRoutes'),
            hubRoutes = require('./hubRoutes'),
            homeRoutes = require('./homeRoutes')
    ;
  
    // add routes
    router.use('/', homeRoutes);
    router.use('/user', userRoutes);
    router.use('/login', userRoutes);   // connect-ensure-login redirects to /login
    router.use('/quiz', quizRoutes);
    router.use('/hub', hubRoutes);
    router.use('/maintain', maintainRoutes);
  
    return router;
  }