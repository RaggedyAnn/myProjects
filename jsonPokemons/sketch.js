var pokemons;

//max 649
var pokeID = 1;
var c;

function preload() {
  //JSON from https://github.com/dariusk/corpora/
  pokemons = loadJSON('pokemon.json');
}


function setup() {
  c = createCanvas(500,800);

  //input bar
  var inp = createInput('Integer between 1 and 649');
  inp.position(20,20);
  inp.input(myEvent);

  //text
  textAlign(CENTER,CENTER);
  textSize(32);
}

function draw() {
  //do nothing
}

//change id when input in inputbar
function myEvent() {
  if (int(this.value()) >=0 && int(this.value()) <650) {
    pokeID = int(this.value());
  } else {
    this.value('Integer between 1 and 649');
  }
  background(255);
  text(specNGen(pokeID-1) + preEvolutions(pokeID-1) + nextEvolution(pokeID-1), width/2, height/2);
}

//all evolutions before + itself. takes an index. returns a string.
function preEvolutions(index) {
  var result = "";
  var poke = pokemons.pokemon[index];
  if(poke.evolution_parent_pokemon_id != null) {
    result = preEvolutions(poke.evolution_parent_pokemon_id -1);
  }
  result = result + results(index);

  return result;
}

//all evolutions after. takes an index. returns a string.
function nextEvolution(index) {
  var result = "";
  var nextPoke = pokemons.pokemon[index+1];
  if(nextPoke.evolution_parent_pokemon_id != null && nextPoke.evolution_parent_pokemon_id == pokemons.pokemon[index].id) {
    result = results(index+1);
    result = result + nextEvolution(index+1);
  }

  return result;
}

//the generation and species. takes an index. returns a string.
function specNGen(index) {
  return "Generation: " + pokemons.pokemon[index].generation_id + "\nSpecies: " + pokemons.pokemon[index].species +"\n\n" + "Evolutions: \n";
}

//the id and name. takes an index. returns a string.
function results(index) {
  return "ID: " + pokemons.pokemon[index].id + "\nName: " + pokemons.pokemon[index].name + "\n\n";

}
