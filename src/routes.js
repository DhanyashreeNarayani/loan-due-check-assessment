const router = require('express').Router({ mergeParams: true });
const multer = require('multer');
const controller = require('./controller');

const upload = multer();

router.get('/', (req, res) => res.render('home', {}));

router.get('/customers', controller.getUsersDetails);
router.post('/customers', upload.none(), controller.addUser, controller.getUsersDetails);
router.get('/dueDetails', controller.getdueDetails);
router.post('/dueDetails', upload.none(), controller.addDueDetails, controller.getdueDetails);
router.post('/getcost', upload.none(), controller.calculateDueDetails);

module.exports = router;
