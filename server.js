const express = require('express')
const methodOverride = require('method-override')
const app = express()
const pokemon = require('./models/pokemon.js')
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
  extended: false
}))
app.use(express.static('public'))
app.use(methodOverride('_method'))

//Home Page - Shows all Pokemon
app.get('/', (req, res) => {
  res.render(
    'poke_index.ejs', {
      allpokemon: pokemon
    })
})

//Edit Page - Allows you to edit the pokemon
app.get('/pokedex/:indexOfPokemonArray/edit', (req, res) => {
  res.render('poke_edit.ejs', {

    pokemon: pokemon[req.params.indexOfPokemonArray],
    index: req.params.indexOfPokemonArray
  })
})

//Show Page - Shows the pokemon selected and their specific stats
app.put('/pokedex/:indexOfPokemonArray', (req, res) => {
  pokemon[req.params.indexOfPokemonArray] = req.body;

  const target = pokemon[req.params.indexOfPokemonArray]
  index: req.params.indexOfPokemonArray

  target.type = []
  target.type.push(req.body.types)

  target.img = req.body.img
  target.stats = {}
  target.stats.hp = req.body.hp
  target.stats.attack = req.body.attack
  target.stats.defense = req.body.defense


  res.redirect('/pokedex');
})



//Delete Route - Allows you to delete a selected pokemon
app.delete('/pokedex/:indexOfPokemonArray', (req, res) => {
  pokemon.splice(req.params.indexOfPokemonArray, 1)
  res.redirect('/pokedex')
})


//Add New - Allows you to fill out a form that creates a new pokemon
app.post('/pokedex', (req, res) => {
  pokemon.push(req.body);
  res.redirect('/pokedex');
  req.body.type = []
  req.body.type.push(req.body.types)

  req.body.stats = req.body.img
  req.body.stats = {}
  req.body.stats.hp = req.body.hp
  req.body.stats.attack = req.body.hp
  req.body.stats.defense = req.body.defense
})

//Takes you to the page to create a new pokemon
app.get('/pokedex/new', (req, res) => {
  res.render('poke_new.ejs')
})

//Index - Shows all pokemon on the index page
app.get('/pokedex', (req, res) => {
  res.render(
    'poke_index.ejs', {
      allpokemon: pokemon
    }
  )
})

//Allows you to look at a specific pokemon
app.get('/pokedex/:indexOfPokemonArray/', (req, res) => {
  res.render('poke_show.ejs', {
    pokedex: pokemon[req.params.indexOfPokemonArray]
  })
})



app.listen(PORT, () => {
  console.log('Gotta catch em all');
})