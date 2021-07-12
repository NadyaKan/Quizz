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

// get /quiz/:code
router.get('/:code', quizController.loadQuiz);
// when manually entering code
router.post('/quiz/code', quizController.loadQuiz);

// QR-link: /quiz/code/:code 
router.get('/code/:code', quizController.generateQR);


module.exports = router;