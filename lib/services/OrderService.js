const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async create({ quantity }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    const order = await Order.insert({ quantity });

    return order;
  }

  //TODO UpdateService and DeleteService
  static async update(id, { quantity }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Updated Order received for ${quantity}`
    );

    const order = await Order.update({ id, quantity });

    return order;
  }

  static async delete(id, { quantity }){
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Delete Order received for ${quantity}`
    );

    const order = await Order.delete({ id, quantity });

    return order;
  }
};
