const User = require('../models/User')
const path = require('path')
module.exports = async(req, res) => {
    try{
        const user  = await User.create(req.body)
        res.redirect("/")
    }
    catch(error){
        if(error.name === 'ValidationError'){
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            console.log(validationErrors)
            req.flash('validationErrors', validationErrors)
            // req.session.validationErrors = validationErrors;
                return res.redirect('/auth/register')
        }
        console.log(error)
        res.status(500).send('error occured while creating user')
    }
}
