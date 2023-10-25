import { sequelize } from "../models/connection.js";


export async function testController(req, res) {
  try {
    await sequelize.authenticate();
    return res.status(200).json('Connection has been established successfully.')
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Unable to connect to the database:'
    })
  }
}