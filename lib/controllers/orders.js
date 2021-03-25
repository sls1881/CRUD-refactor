const { Router } = require('express');
const OrderService = require('../services/OrderService');
const Order = require('../models/Order');

module.exports = Router()
  .post('/', async (req, res, next) => {
    // OrderService
    //   .create(req.body)
    //   .then(order => res.send(order))
    //   .catch(next);
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  //Get all orders
  .get('/', async (req, res, next) => {
    //allOrders variable points to the SQL query in Order.js
    const allOrders = await Order.select();
    //Send all orders, rows/instances that we mapped through in Order.js
    res.send(allOrders);
  })

  .get('/:id', async (req, res, next) => {
    const anOrder = await Order.selectId(req.params.id);
    res.send(anOrder);
  })

  .put('/:id', async (req, res, next) => {
   //OrderService for update
   try {
    const updatedOrder = await OrderService.update(req.params.id, req.body);
    res.send(updatedOrder);
  } catch (err) {
    next(err);
  }
  })

  .delete('/:id', async (req, res, next) => {
    //OrderService
    try {
      const deleteOrder = await OrderService.delete(req.params.id, req.body);
      res.send(deleteOrder);
    } catch (err) {
      next(err);
    }
    
  });
