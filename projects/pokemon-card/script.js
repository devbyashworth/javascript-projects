const pokemonName = document.getElementById("pokemon-name");
const pokemonAbilities = document.getElementById("abilities");
const pokemonSpecies = document.getElementById("species");
const pokemonHpValue = document.getElementById("hp-value");
const pokemonTypes = document.getElementById("types");
const pokemonMoves = document.getElementById("moves");
const pokemonDescription = document.getElementById("description");
const pokemonContainer = document.querySelector(".pokemon-body");
const pokemonDataContainer = document.querySelector(".pokemon-data");

async function fetchPokemonData() {
  const pokemon = document.getElementById("pokemon").value.trim().toLowerCase();

  if (!pokemon) {
    alert("Please enter a Pokémon name.");
    return;
  }

  try {
    const pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    if (!pokemonResponse.ok) {
      throw new Error("Pokémon not found");
    }
    const data = await pokemonResponse.json();

    const name = capitalizeFirstLetter(data.name);
    const abilities = data.abilities
      .map((ability) => capitalizeFirstLetter(ability.ability.name))
      .join(", ");
    const species = capitalizeFirstLetter(data.species.name);
    const hp = data.stats.find((stat) => stat.stat.name === "hp").base_stat;
    const types = data.types
      .map((type) => capitalizeFirstLetter(type.type.name))
      .join(", ");
    const image = data.sprites.front_default;
    const moves = await fetchMoveDetails(data.moves);

    // Clear existing image if present
    const existingImageContainer =
      pokemonContainer.querySelector(".imageContainer");
    if (existingImageContainer) {
      existingImageContainer.remove();
    }

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("imageContainer");
    const setImage = document.createElement("img");
    setImage.src = image;
    imageContainer.appendChild(setImage);

    pokemonContainer.prepend(imageContainer);
    pokemonName.textContent = name;
    pokemonAbilities.textContent = abilities;
    pokemonSpecies.textContent = species;
    pokemonHpValue.textContent = hp;
    pokemonTypes.textContent = types;
    pokemonMoves.innerHTML = moves;

    fetchDescription(data.species.url);

    // Show the Pokémon data container
    pokemonDataContainer.style.display = "block";
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    alert("Could not find the Pokémon. Please check the name and try again.");
  }
}

async function fetchMoveDetails(moves) {
  const movePromises = moves.slice(0, 5).map(async (move) => {
    const moveResponse = await fetch(move.move.url);
    const moveDetails = await moveResponse.json();
    return `${capitalizeFirstLetter(moveDetails.name)}: ${
      moveDetails.power || "N/A"
    } power`;
  });

  return (await Promise.all(movePromises)).join("<br>");
}

async function fetchDescription(speciesUrl) {
  try {
    const speciesResponse = await fetch(speciesUrl);
    const speciesDetails = await speciesResponse.json();
    const descriptionEntry = speciesDetails.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    const description = descriptionEntry
      ? descriptionEntry.flavor_text
      : "Description not available.";
    pokemonDescription.textContent = description.replace(/\f/g, " ");
  } catch (error) {
    console.error("Error fetching Pokémon description:", error);
    pokemonDescription.textContent = "Description not available.";
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
