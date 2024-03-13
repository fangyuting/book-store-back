"use strict";
var _a = require('sequelize'), Sequelize = _a.Sequelize, DataTypes = _a.DataTypes;
var sequelize = new Sequelize('book_store', 'root', '123456', {
    host: '127.0.0.1',
    dialect: 'mysql'
});
var Users = sequelize.define('users', {
    id: {
        // 使用时间戳生成 UUID
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    account: { type: DataTypes.STRING, unique: true }, // 账号
    nickname: { type: DataTypes.STRING }, // 昵称
    password: DataTypes.STRING, // 密码
    sex: { type: DataTypes.INTEGER, defaultValue: 0 }, // 性别 0 男 1 女
    age: { type: DataTypes.INTEGER, defaultValue: 0 }, // 年龄
    avatar: { type: DataTypes.STRING, defaultValue: '' } // 头像
});
module.exports = { Users: Users };
//# sourceMappingURL=users.js.map