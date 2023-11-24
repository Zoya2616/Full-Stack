module.exports = (req,res,next)=>{
        if(req.files == null || req.body.title == null || req.body.title == null){
            console.log('Validate middleware called')
            return res.redirect('/post/new')
        }
    next()
    }