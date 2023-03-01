const express = require('express');
var app = express();
const router = express.Router();

const auth = require('../middlewares/auth');
const userController = require('../controllers/userController')


router.use(auth.authenticateSession);



app.use('/user/registerUser', userController.registerUser);
app.use('/user/userLogin', userController.userLogin);
app.use('/user/updateUser', userController.updateUser);
app.use('/user/deleteUser', userController.deleteUser);
app.use('/user/getAllUser', userController.getAllUser);


app.use('', router);
module.exports = app;