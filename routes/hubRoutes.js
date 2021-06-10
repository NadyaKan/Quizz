const router = require('express').Router();
const connectEnsureLogin = require('connect-ensure-login');

router.get("/", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.status(200).render('hub');
});


module.exports = router;