import { Pokemon } from "../models/pokemon.js"


export async function insertPokemons(req, res) {
    try {
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
        ]

        await Pokemon.bulkCreate(pokemonData)

        return res.status(200).json("Pokemons inseridos com sucesso")

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Errro no servidor'
        })
    }
}

export async function getPokemon(req, res) {
    try {
        const data = await Pokemon.findAll()
        return res.status(200).json({ data })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Errro no servidor'
        })
    }
}