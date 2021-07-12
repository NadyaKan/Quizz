const router = require('express').Router();
const connectEnsureLogin = require('connect-ensure-login');
const quizController = require('../controllers/quizController');


router.get('/library/:id', connectEnsureLogin.ensureLoggedIn(), quizController.getAllQuizzesFromUser);
router.get('/create',connectEnsureLogin.ensureLoggedIn(), quizController.getNewQuiz);
router.post('/:id/create', quizController.createNewQuiz);
router.get("/view/:id", quizController.showQuiz);

router.post("/view/:id", quizController.updateQuizz);
router.get("/remove/all/:userId", quizController.removeAllQuizzes);
router.delete("/:quizId/:userId", quizController.removeQuizById);

router.get('/code', quizController.getCode);
router.post('/code', quizController.loadQuiz);

// QR-link: /quiz/code/:code 
router.get('/code/:code', quizController.generateQR);


module.exports = router;