import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('pokemons', 'pokemon', 'pokemon', {
  host: 'bd',
  dialect: 'postgres',
  port: 5432
});
