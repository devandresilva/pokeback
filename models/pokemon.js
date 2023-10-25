import { sequelize } from "./connection.js";
import { DataTypes } from "sequelize";


export const Pokemon = sequelize.define('pokemon', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idPokemon: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

await Pokemon.sync()