const ACCESS_KEY = 'frWfpDLauQSLS9pLI5fIQEGTxMFnpqfHCrZXn1da';
const SECRET_KEY: string = 'hello';
const BUCKET = 'shirley';
const TOKEN_SECRET = 'ronaldo';

/**不需要验证token的白名单 */
const WHITE_LIST = [
  /**普通用户登录注册 */
  `/users/login`,
  `/users/register`,
  `/users/getCVCode`,
  /**根路径 */
  `/`,
  /**admin */
  '/admin'
];

module.exports = {
  ACCESS_KEY,
  SECRET_KEY,
  BUCKET,
  TOKEN_SECRET,
  WHITE_LIST
};
