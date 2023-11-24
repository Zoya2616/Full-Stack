const User = require('../models/User')
const bcrypt = require('bcrypt')
module.exports = async(req, res) => {
    try{
        const {username , password} = req.body
        const user  = await User.findOne({username:username});
        if(user){
            bcrypt.compare(password , user.password , (error,same) =>{
                if(same){
                    req.session.userId = user._id
                    res.redirect('/')
                    console.log("SAME")
                }
                else{
                    res.redirect('/auth/login')
                    console.log("NOT SAME")
                }
            })
        }
      
    }
    catch(error){
        console.log(error + "ERROR")
    }
}
