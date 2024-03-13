const crypto = require('crypto');
// md5加密
function md5(pass) {
    let md5 = crypto.createHash('md5');
    return md5.update(pass).digest('hex');
}

module.exports = {
    md5
};
