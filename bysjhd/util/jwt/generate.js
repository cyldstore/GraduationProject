const jwt = require('./jwt')

function generate(res,value) {
    const token = jwt.generate(value, '1d')
    // console.log(req.url)
    res.header("Authorization", token)
    res.header('Access-Control-Expose-Headers', 'Authorization')
}

module.exports = generate