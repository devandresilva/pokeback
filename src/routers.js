import Express, { Router } from 'express'
import { getPokemon, insertPokemons } from '../controllers/pokemonController.js'

const router = Express.Router()


router.get("/insert", insertPokemons)
router.get('/list', getPokemon)


export default router