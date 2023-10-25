import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('pokemons', 'pokemon', 'pokemon', {
  host: 'pokeback',
  dialect: 'postgres',
  port: 5432
});
