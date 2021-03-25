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

  //Select all orders for the Get endpoint
  static async select() {
    //Select all columns/data from the orders table
    const { rows } = await pool.query(
      `SELECT *
      FROM orders`
    );
    //Map through an array of rows and for each row create a new instance of the order class
    //TODO get TA help  
    return rows.map((row) => new Order(row));
  }

  //Get by ID
  static async selectId(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM orders
      WHERE id=$1`,
      [id]
    );

    return new Order(rows[0]);
  }

  static async update({ id, quantity }) {
    const { rows } = await pool.query(
      `UPDATE orders 
      SET quantity = $1  
      WHERE id = $2
      RETURNING *`,
      [quantity, id]
    );
    return new Order(rows[0]);
  }

  static async delete({ id }) {
    const { rows } = await pool.query(
      `DELETE FROM orders
      WHERE id = $1
      RETURNING *`, 
      [id]
      );

    return new Order(rows[0]);
  }

};


