module.exports = ((e, req, res, next)=>{
    if (e.name === 'JsonWebTokenError'){
         res.status(401).json({message: 'missing token'})
    }
    if (e.message === 'jwt expired'){
        res.status(401).json({message: 'token has expired'})
    }
})

