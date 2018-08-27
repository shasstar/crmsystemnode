const express = require('express');
const CustomerMap = require('../models/customer-map');
const CustomerService = require('../services').CustomerService;

class CustomerRouter {
    constructor() {
        this.router = express.Router();
        this.customerService = new CustomerService();
        this.initializeRouting();
    }

    initializeRouting() {
        this.router.get('/', async (req, res) => {
            const customers = await this.customerService.getCustomers();
            res.json(customers);
        });

        this.router.get('/search/:customerName', async (req, res) => {
            const customerName = req.params.customerName;
            const customers = await this.customerService.getCustomers(customerName);
            res.json(customers);
        });

        this.router.get('/:customerId', async (req, res) => {
            const customerId = parseInt(req.params.customerId);
            const customer = await this.customerService.getCustomerDetails(customerId);
            res.json(customer);
        });

        this.router.post('/', async (req, res) => {
            const body = req.body;
            const customer = CustomerMap.transform(body);
            const savedCustomer = await this.customerService.saveCustomerDetails(customer);
        });
    }
}

module.exports = CustomerRouter;
