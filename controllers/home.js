const BlogPost = require('../models/BlogPost')
module.exports = async(req, res) => {
    const blogpost  = await BlogPost.find({}).populate('userid')
    console.log(req.session)
    res.render('index', {
        blogpost
    });
}