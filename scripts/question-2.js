// question 2
const apiKey = "a1addfc96cf64b23b132339d1600e75b";
const url = `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=${apiKey}`;

const gameList = document.querySelector(".game-list");

const getGames = async () => {
  gameList.innerHTML = "<div class='loading'>Please wait</div>";

  try {
    const response = await fetch(url);
    const json = await response.json();
    createGameList(json.results);
  } catch (error) {
    console.error("Something went wrong");
    showError();
  }
};

const createGameList = async (results) => {
  gameList.innerHTML = "";

  for (let i = 0; i < 8; i++) {
    const wrapper = document.createElement("div");
    wrapper.className = "game";

    const name = document.createElement("strong");
    name.innerText = results[i].name;

    const rating = document.createElement("span");
    rating.innerText = `Rating: ${results[i].rating}`;

    const tagCount = document.createElement("span");
    tagCount.innerText = `Tag count: ${results[i].tags.length}`;

    wrapper.append(name, rating, tagCount);
    gameList.appendChild(wrapper);
  }
};

const showError = () => {
  const error = document.createElement("h1");
  error.innerText = "Something went wrong";
  gameList.appendChild(error);
};

getGames();
