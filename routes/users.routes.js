module.exports = app => {
 const users =  require('../controllers/user.controller.js')
 const {authenticateToken, isAdmin} = require('../middleware/auth.middleware.js')
 const router = require("express").Router();

 router.use(authenticateToken);

 // Routes spécifiques à l'administrateur
 router.get('/', isAdmin, users.getUsers);
 router.post('/edit/:id', isAdmin, users.updateUsers);
 router.post('/delete/:id', isAdmin, users.deleteUsers);

 app.use('/admin/users',  router);
}