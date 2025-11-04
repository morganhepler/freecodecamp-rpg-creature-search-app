// DOM Elements
const creatureAPI = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const creatureName = document.getElementById("creature-name");
const creatureID = document.getElementById("creature-id");
const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById("height");
const creatureTypes = document.getElementById("types");
const creatureSpecial = document.getElementById("special");
const creatureHP = document.getElementById("hp");
const creatureAttack = document.getElementById("attack");
const creatureDefense = document.getElementById("defense");
const creatureSpecialAttack = document.getElementById("special-attack");
const creatureSpecialDefense = document.getElementById("special-defense");
const creatureSpeed = document.getElementById("speed");

// Types Array
const typesArray = [
  {type: "fire", color:	"#ee8130"},
  {type: "water", color:	"#6390f0"},
  {type: "rock", color:	"#b6a136"},
  {type: "electric", color:	"#f7d02c"},
  {type: "dragon", color:	"#ab8aff"},
  {type: "grass", color:	"#7ac74c"},
  {type: "poison", color:	"#b785b7"},
  {type: "ice", color:	"#96d9d6"},
  {type: "fairy", color:	"#d685ad"},
  {type: "ground", color:	"#e2bf65"},
  {type: "flying", color:	"#a98ff3"},
  {type: "bug", color:	"#a6b91a"},
  {type: "dark", color:	"#99806f"},
  {type: "psychic", color:	"#ff83a8"},
  {type: "steel", color:	"#b7b7ce"},
  {type: "ghost", color:	"#9077b0"}
];

// Reset Display
const resetDisplay = () => {
  searchInput.value = '';
  creatureName.textContent = '';
  creatureID.textContent = '';
  creatureWeight.textContent = '';
  creatureHeight.textContent = '';
  creatureTypes.innerHTML = '';
  creatureSpecial.textContent = '';
  creatureHP.textContent = '';
  creatureAttack.textContent = '';
  creatureDefense.textContent = '';
  creatureSpecialAttack.textContent = '';
  creatureSpecialDefense.textContent = '';
  creatureSpeed.textContent = '';
}

// Display Creature Info
const displayCreatureInfo = (data) => {
  const { id, name, weight, height, special, stats, types } = data;
  resetDisplay();

  // Update DOM Elements
  creatureName.textContent = name;
  creatureID.textContent = ` #${id}`;
  creatureWeight.textContent = `Weight: ${weight}`;
  creatureHeight.textContent = ` Height: ${height}`;

  creatureTypes.innerHTML = types.map(type => {
    const match = typesArray.find(t => t.type === type.name);
    const color = match ? match.color : "white";
    return `<span style="background-color: ${color}">${type.name}</span>`
  }).join("");

  creatureSpecial.innerHTML = `
    <p id="special-name">${special.name}</p>
    <p id="special-description">${special.description}</p>
  `;

  creatureHP.textContent = stats[0].base_stat;
  creatureAttack.textContent = stats[1].base_stat;
  creatureDefense.textContent = stats[2].base_stat;
  creatureSpecialAttack.textContent = stats[3].base_stat;
  creatureSpecialDefense.textContent = stats[4].base_stat;
  creatureSpeed.textContent = stats[5].base_stat;
}

// Fetch Creature
const fetchCreature = async () => {
  try {
    const creatureInput = searchInput.value.toLowerCase();
    const response = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${creatureInput}`);
    const data = await response.json();
    displayCreatureInfo(data);
  }
  catch (err) {
    alert("Creature not found");
    console.log(err);
  }
}

searchBtn.addEventListener("click", fetchCreature);