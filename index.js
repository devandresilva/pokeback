const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'pokemon',
  host: 'db',
  database: 'pokemons',
  password: 'pokemon', // Use a senha que você definiu anteriormente
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao obter cliente do pool', err);
  }

  const createTableItens = `
      CREATE TABLE IF NOT EXISTS itens (
          id serial PRIMARY KEY,
          idPokemon INTEGER,
          name VARCHAR(255),
          imageUrl VARCHAR(255)
      );
  `;

  let insertData = `
      INSERT INTO itens (idPokemon, name, imageUrl)
      VALUES
  `;

  const pokemonData = [
    { idPokemon: 1, name: 'Bulbasaur', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif' },
    { idPokemon: 2, name: 'Ivysaur', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/2.gif' },
    { idPokemon: 3, name: 'Venusaur', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/3.gif' },
    { idPokemon: 4, name: 'Charmander', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/4.gif' },
    { idPokemon: 5, name: 'Charmeleon', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/5.gif' },
    { idPokemon: 6, name: 'Charizard', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif' },
    { idPokemon: 7, name: 'Squirtle', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif' },
    { idPokemon: 8, name: 'Wartortle', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/8.gif' },
    { idPokemon: 9, name: 'Blastoise', imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/9.gif' }
  ];

  const values = [];

  // Monta a consulta de inserção e os valores com base no array pokemonData
  pokemonData.forEach((pokemon, index) => {
    insertData += `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3}),`;
    values.push(pokemon.idPokemon, pokemon.name, pokemon.imageUrl);
  });

  // Remove a vírgula extra no final da consulta de inserção
  insertData = insertData.slice(0, -1);

  // Executa a consulta para criar a tabela
  client.query(createTableItens, (err, result) => {
    if (err) {
      console.error('Erro ao criar a tabela', err);
    } else {
      console.log('Tabela criada com sucesso');
      // Agora, vamos inserir os dados na tabela
      client.query(insertData, values, (err, result) => {
        release(); // Libera o cliente de volta ao pool

        if (err) {
          console.error('Erro ao inserir dados na tabela', err);
        } else {
          console.log('Dados inseridos com sucesso');
        }
      });
    }
  });
});


app.use(express.json());

// Rota GET para recuperar dados do banco de dados
app.get('/list', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM itens');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados do banco de dados.' });
  }
});


app.listen(port, () => {
  console.log(`Servidor Express em execução na porta ${port}`);
});
