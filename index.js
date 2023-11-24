const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const newPostController = require('./controllers/newPost')
const homePageController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')
const validateController = require('./middleware/validationMiddleware')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession =  require('cookie-session')
const authmiddleware = require('./middleware/authMiddleware')
const redirectifAuthMiddleware = require('./middleware/redirectifAuthenticationMiddleware')
const flash = require('connect-flash');
mongoose.connect('mongodb+srv://rvahora8155:Rifat@cluster0.x4hgbj7.mongodb.net/assignment2?retryWrites=true&w=majority',{useNewUrlParser:true})
const app = new express()
global.loggedIn = null;
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/posts/store',validateController)
app.use(expressSession( {
    secret: 'keyboard',
    resave: true,
    saveUninitialized: true
}))
app.use('*', (req,res,next) => {
    loggedIn= req.session.userId;
    next()
})
app.use(flash());
app.listen(3500, () => {
    console.log('App listening on port 3500')
})
app.get('/', homePageController)
app.post('/posts/store',authmiddleware,storePostController)
app.get('/post/new',authmiddleware,newPostController)
app.get('/post/:id',getPostController)
app.get('/auth/register',redirectifAuthMiddleware,newUserController)
app.post('/user/register',redirectifAuthMiddleware,storeUserController)
app.get('/auth/login',redirectifAuthMiddleware,loginController)
app.post('/user/login',redirectifAuthMiddleware,loginUserController)
app.get('/auth/logout',logoutController)
app.use((req, res) => res.render('notfound'));