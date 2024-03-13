"use strict";
var ACCESS_KEY = 'frWfpDLauQSLS9pLI5fIQEGTxMFnpqfHCrZXn1da';
var SECRET_KEY = 'hello';
var BUCKET = 'shirley';
var TOKEN_SECRET = 'ronaldo';
/**不需要验证token的白名单 */
var WHITE_LIST = [
    /**普通用户登录注册 */
    "/users/login",
    "/users/register",
    "/users/getCVCode",
    /**根路径 */
    "/",
    /**admin */
    '/admin'
];
module.exports = {
    ACCESS_KEY: ACCESS_KEY,
    SECRET_KEY: SECRET_KEY,
    BUCKET: BUCKET,
    TOKEN_SECRET: TOKEN_SECRET,
    WHITE_LIST: WHITE_LIST
};
//# sourceMappingURL=config.js.map