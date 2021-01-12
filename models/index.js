const User = require('./User');
const Routes = require('./Routes');
const User_Routes = require('./User_Routes');

// create model associations
User.hasMany(User_Routes, {
    foreignKey: 'user_id'
});

User_Routes.belongsTo(User, {
    foreignKey: 'user_id'
});

Routes.hasMany(User_Routes,{
    foreignKey: 'route_id'
});

User_Routes.belongsTo(Routes, {
    foreignKey: 'route_id'
});

module.exports = { User, Routes, User_Routes };