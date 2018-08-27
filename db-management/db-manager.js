const mongoose = require('mongoose');
const DbSchemas = require('../db-schemas');

const CustomerModel = mongoose.model('customer', mongoose.Schema(DbSchemas.CustomerSchema));

const OrderModel = mongoose.model('order', mongoose.Schema(DbSchemas.OrderSchema));

const UserProfileModel = mongoose.model('userprofile', mongoose.Schema(DbSchemas.UserProfileSchema));

module.exports = {
    DbConnection: mongoose,
    CustomerModel,
    OrderModel,
    UserProfileModel
};
