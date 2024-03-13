const jwt = require('jsonwebtoken');
const { SECRET_KEY, WHITE_LIST } = require('./config');

// 用户登录就生成一个token 后面操作的时候验证这个token
module.exports = {
  // 生成 token
  createToken(user) {
    // console.log('我来了');
    console.log(SECRET_KEY);
    return jwt.sign({ user }, SECRET_KEY, { expiresIn: '30s' });
  },
  checkToken(req, res, next) {
    try {
      const token = req.headers.authorization;
      const origin = req.originalUrl;
      // 白名单中的路径 无需验证
      if (WHITE_LIST.includes(origin)) {
        next();
      } else {
        if (token) {
          const userId = jwt.verify(token, SECRET_KEY).user;
          // console.log('userId', userId);
          if (!userId) {
            return res.json({
              status: 1006,
              data: [],
              msg: '登录过期?'
            });
          } else {
            next();
          }
        } else {
          return res.json({
            status: 2002,
            data: [],
            msg: '用户未登录！'
          });
        }
      }
      // jwt.verify(token, SECRET_KEY);
    } catch (err) {
      console.log('344', err);
      return res.json({
        status: 1006,
        data: err,
        msg: '登录过期?'
      });
    }
  },
  /**将token解析为userid */
  parseToken(token) {
    // const userId = jwt.verify(token, SECRET_KEY).user;
    // console.log(userId);
    // return userId;
    try {
      const userId = jwt.verify(token, SECRET_KEY).user;
      return userId; // 返回解析出来的用户信息
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        // Token 过期，返回 null 或者其他你认为合适的值

        return null;
      }
      // 处理其他可能的异常，例如 Token 无效等情况
      console.error(err);
      return 'errToken'; // 返回 null 表示解析失败 这里别删 判断token是否过期的时候会用
    }
  }
};
