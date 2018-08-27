const ErrorConstants = require('../constants').ErrorConstants;
const DbSystem = require('../db-management');
const Configuration = require('../configuration');

class OrderService {
    async getOrdersByCustomerId(customerId) {
        if (!customerId || (customerId && isNaN(parseInt(customerId)))) {
            throw new Error(ErrorConstants.INVALID_ARGUMENTS);
        }

        let orders = [];

        try {
            await DbSystem.DbConnection.connect(Configuration.DbConfiguration.MONGO_CONNECTION_STRING, {
                useNewUrlParser: true
            });

            orders = await DbSystem.OrderModel.find({
                customerId: customerId
            });
        } catch (error) {
            throw new Error(error);
        } finally {
            await DbSystem.DbConnection.disconnect();
        }

        return orders;
    }
}

module.exports = OrderService;
