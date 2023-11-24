const User = require ('../models/User')
module.exports = async(req,res,next) => {
    try {
        const user = await User.findById(req.session.userId)
        if(!user) {
            return res.redirect('/')
        }
        next();
    }catch(error) {
        console.log(error)
        res.status(500).send("Error occurend while in the session")
    }
}