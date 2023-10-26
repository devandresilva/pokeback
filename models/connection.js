import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('pokemons', 'pokemon', 'pokemon', {
  host: '172.16.0.12',
  dialect: 'postgres',
  port: 5432
});
