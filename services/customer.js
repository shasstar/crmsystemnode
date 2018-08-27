const ErrorConstants = require('../constants').ErrorConstants;
const DbSystem = require('../db-management');
const Configuration = require('../configuration');
const CustomerModel = require('../models').CustomerModel;

const MIN_SEARCH_STR_LEN = 3;
const IGNORE_CASE = 'i';

class CustomerService {
    async getCustomers(customerName) {
        let customers = [];

        try {
            await DbSystem.DbConnection.connect(Configuration.DbConfiguration.MONGO_CONNECTION_STRING, {
                useNewUrlParser: true
            });

            const validation = customerName && customerName.length >= MIN_SEARCH_STR_LEN;

            if (validation) {
                customers = await DbSystem.CustomerModel.find({
                    name: new RegExp(customerName, IGNORE_CASE)
                });
            } else {
                customers = await DbSystem.CustomerModel.find();
            }
        } catch (error) {
            throw new Error(error);
        } finally {
            await DbSystem.DbConnection.disconnect();
        }

        return customers;
    }

    async getCustomerDetails(customerId) {
        if (!customerId || (customerId && isNaN(parseInt(customerId)))) {
            throw new Error(ErrorConstants.INVALID_ARGUMENTS);
        }

        let filteredCustomer = null;

        try {
            await DbSystem.DbConnection.connect(Configuration.DbConfiguration.MONGO_CONNECTION_STRING, {
                useNewUrlParser: true
            });

            filteredCustomer = await DbSystem.CustomerModel.find({
                id: customerId
            });
        } catch (error) {
            throw new Error(error);
        } finally {
            await DbSystem.DbConnection.disconnect();
        }

        return filteredCustomer;
    }

    async saveCustomerDetails(customer) {
        const validation = customer && customer instanceof CustomerModel;

        if (!validation) {
            throw new Error(ErrorConstants.INVALID_ARGUMENTS);
        }

        const savedCustomerRecord = null;

        try {
            await DbSystem.DbConnection.connect(Configuration.DbConfiguration.MONGO_CONNECTION_STRING, {
                useNewUrlParser: true
            });

            savedCustomerRecord = await DbSystem.CustomerModel.create(customer);
        } catch (error) {
            throw new Error(error);
        } finally {
            await DbSystem.DbConnection.disconnect();
        }

        return savedCustomerRecord;
    }
}

module.exports = CustomerService;
