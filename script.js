
const apikey = "a32aedf513bbc72a70a0e671b422dc02";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")





async function checkWeather(city){
  const response = await fetch(apiurl + city +`&appid=${apikey}`);

  if(response.status == 404){
    document.querySelector(".error").style.display="block";
    document.querySelector(".weather").style.display="none";
  }else{
    var data = await response.json();

    // console.log(data);
  
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity+ "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
  
    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
  
    }
    else if (data.weather[0].main == "Clear"){
      weatherIcon.src = "images/cs.png";
    }
    else if (data.weather[0].main == "Rain"){
      weatherIcon.src = "images/rain.png";
    }
    else if (data.weather[0].main == "Mist"){
      weatherIcon.src = "images/fog.png";
    }
    else if (data.weather[0].main == "Snowy"){
      weatherIcon.src = "images/snow.png";
    }
  
    document.querySelector(".weather").style.display ="block";
    document.querySelector(".error").style.display="none";
  
  }
  
}

searchBtn.addEventListener("click",()=> {
checkWeather(searchBox.value);
})


let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const favoriteBtn = document.querySelector("#favorite");
const favoritesList = document.querySelector("#favoritesList");

function saveFavorites() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderFavorites();
}





function renderFavorites() {
  favoritesList.innerHTML = '';
  favorites.forEach(city => {
    const li = document.createElement('li');
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="bi bi-trash3-fill"></i>'
    deleteBtn.addEventListener('click', () => {
      favorites = favorites.filter(f => f !== city);
      saveFavorites();
    });

    li.textContent = city;
    li.appendChild(deleteBtn);
    favoritesList.appendChild(li);
  });
}

favoriteBtn.addEventListener("click", () => {
  const currentCity = document.querySelector(".city").textContent;
  
  if (!favorites.includes(currentCity)) {
    favorites.push(currentCity);
    saveFavorites();
  }
});

// Initial render of favorites
renderFavorites();









// // Add to existing script.js
// let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// const favoriteBtn = document.querySelector("#favorite");
// const favoritesList = document.querySelector("#favoritesList");

// function saveFavorites() {
//   localStorage.setItem('favorites', JSON.stringify(favorites));
//   renderFavorites();
// }

// function renderFavorites() {
//   favoritesList.innerHTML = '';
//   favorites.forEach(city => {
//     const li = document.createElement('li');
//     li.textContent = city;
//     favoritesList.appendChild(li);
//   });
// }

// favoriteBtn.addEventListener("click", () => {
//   const currentCity = document.querySelector(".city").textContent;
  
//   if (!favorites.includes(currentCity)) {
//     favorites.push(currentCity);
//     saveFavorites();
//   }
// });

// // Initial render of favorites
// renderFavorites();
