const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order.js');

jest.mock('../lib/utils/twilio.js');
const twilio = require('../lib/utils/twilio');

describe('endpoints', () => {
  beforeEach(() => {
    return setup(pool);
  });

  let order;
  beforeEach(async () => {
    order = await Order.insert({ quantity: 10 });

    twilio.sendSms.mockClear();
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(() => {
        expect(twilio.sendSms).toHaveBeenCalledTimes(1);
      });
  });

  // it('ASYNC/AWAIT: creates a new order in our database and sends a text message', async () => {
  //   const res = await request(app)
  //     .post('/api/v1/orders')
  //     .send({ quantity: 10 });

  //   expect(res.body).toEqual({
  //     id: '1',
  //     quantity: 10,
  //   });

  //Get endpoint
  it('gets all the orders from the database', async () => {
    //Await the promise to get the order(s)
    const res = await request(app).get('/api/v1/orders');
    //Expect the returned body to match the new order
    expect(res.body).toEqual([order]);
  });

  //Get by ID endpoint
  it('get an order by ID', async () => {
    //Insert a new order to test
    const order = await Order.insert({ quantity: 15 });

    const res = await request(app).get(`/api/v1/orders/${order.id}`);

    expect(res.body).toEqual(order);
  });

  it('updates a new order in our database and sends a text message', async () => {
    //Insert a new order to test
    const order = await Order.insert({ quantity: 40 });

    return request(app)
      .put(`/api/v1/orders/${order.id}`)
      .send({ quantity: 50 })
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: order.id,
          quantity: 50,
        });
      });
  });

  //Delete by ID endpoint
  it('delete an order by ID and send a text message', () => {
    //creates a new order to manipulate in this test
    return request(app)
      .delete(`/api/v1/orders/${order.id}`)
      .then(() => {
        expect(twilio.sendSms).toHaveBeenCalledTimes(1);
      });
  });
});
