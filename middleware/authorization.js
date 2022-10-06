const middleware = (req, res, next) =>{

    next()
}

module.exports = (...role) =>{
    return middleware
}