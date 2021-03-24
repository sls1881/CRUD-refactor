const pool = require('../utils/pool');

// static methods -> Order.insert(): Math.random(), Number.parseInt(), JSON.stringify()
// instance methods -> arr.map(), params.get('code')
module.exports = class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }

  //Post new order
  static async insert(order) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
      [order.quantity]
    );

    return new Order(rows[0]);
  }

  //Get all orders
  static async select(orders) {
    const {
      rows, 
    } = await pool.query(
      `SELECT *
      FROM orders` 
  );
  
  return rows.map(row => new Order(row)) 
};

//Get by ID
  static async selectId(orders) {
    const {
      rows, 
    } = await pool.query(
      `SELECT *
      FROM orders
      WHERE id=$1`, 
      [req.id]
  );
  
  return new Order(rows[0])
};

};
