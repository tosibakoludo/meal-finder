const searchApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
const randomApi = `https://www.themealdb.com/api/json/v1/1/random.php`;
const mealDetailsApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`;

document.querySelector(".search-container form").addEventListener("submit", function (e) {
    e.preventDefault();
    const searchTerm = document.getElementsByName("search")[0].value;

    if (searchTerm) {
        findMeals(searchApi + searchTerm, searchTerm);
    }
});

random.addEventListener("click", function (e) {
    e.preventDefault();
    chooseRandomMeal();
});

async function findMeals(url, searchTerm) {
    try {
        const data = await fetch(url).then(result => {
            if (result.ok) {
                return result.json();
            }
            throw new Error(result.status + " " + result.statusText);
        });
        showMeals(data, searchTerm);
    }
    catch (err) {
        console.log(err);
    }
}

async function chooseRandomMeal() {
    try {
        const data = await fetch(randomApi).then(result => {
            if (result.ok) {
                return result.json();
            }
            throw new Error(result.status + " " + result.statusText);
        });
        showRandomMeal(data);
    }
    catch (err) {
        console.log(err);
    }
}

async function findMeal(id) {
    try {
        const data = await fetch(mealDetailsApi + id).then(result => {
            if (result.ok) {
                return result.json();
            }
            throw new Error(result.status + " " + result.statusText);
        });
        showMealDetails(data);
    }
    catch (err) {
        console.log(err);
    }
}

function showMeals(data, searchTerm) {
    var resultsHeading = document.querySelector(".search-results-heading");
    var meals = document.querySelector(".search-results-container");

    ispis = ``;
    if (data.meals === null) {
        resultsHeading.innerHTML = `<h2>There are no search results. Try again!</h2>`;
    }
    else {
        resultsHeading.innerHTML = `<h2>Search results for '${searchTerm}':</h2>`;
        data.meals.forEach(element => {
            ispis += `<div class="search-result-container"><a href="#meal"><img src="${element.strMealThumb}" alt="${element.strMeal}" data-id="${element.idMeal}" /></a><h3>${element.strMeal}</h3></div>`;
        });
        ispis += `</div>`;
    }
    meals.innerHTML = ispis;

    document.querySelectorAll(".search-results-container .search-result-container img").forEach(element => {
        element.addEventListener("click", function (e) {
            // e.preventDefault();
            let id = e.target.dataset.id;
            findMeal(id);
        });
    });

    document.querySelector(".meal-details-container").innerHTML = "";
}

function showRandomMeal(data) {
    var resultsHeading = document.querySelector(".search-results-heading");
    var meals = document.querySelector(".search-results-container");

    resultsHeading.innerHTML = `<h2>Search results for random meal:</h2>`;
    meals.innerHTML = `<div class="search-result-container"><a href="#meal"><img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}" data-id="${data.meals[0].idMeal}" /></a><h3>${data.meals[0].strMeal}</h3></div></div>`;

    document.querySelector(".search-results-container .search-result-container img").addEventListener("click", function (e) {
        e.preventDefault();
        let id = e.target.dataset.id;
        findMeal(id);
    });

    document.querySelector(".meal-details-container").innerHTML = "";
}

function showMealDetails(data) {
    var mealDetails = document.querySelector(".meal-details-container");
    ispis = `<h2 id="meal">${data.meals[0].strMeal}</h2><img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}" /><div class="meal-details"><p id="cat">${data.meals[0].strCategory}</p><p id="area">${data.meals[0].strArea}</p></div><p id="instr">${data.meals[0].strInstructions}</p><h2>Ingredients</h2><div class="meal-ingredients">`;

    for (let i = 1; i < 21; i++) {
        if (data.meals[0]["strIngredient" + i] !== null && data.meals[0]["strMeasure" + i] !== null && data.meals[0]["strIngredient" + i].trim() !== "" && data.meals[0]["strMeasure" + i].trim() !== "") {
            var ingredient = data.meals[0]["strIngredient" + i];
            var measure = data.meals[0]["strMeasure" + i];
            ispis += `<span class="ingredient-measure">${ingredient} - ${measure}</span>`
        } else if (data.meals[0]["strIngredient" + i] !== null && data.meals[0]["strIngredient" + i].trim() !== "") {
            var ingredient = data.meals[0]["strIngredient" + i];
            ispis += `<span class="ingredient-measure">${ingredient}</span>`
        } else if (data.meals[0]["strMeasure" + i] !== null && data.meals[0]["strMeasure" + i].trim() !== "") {
            var measure = data.meals[0]["strMeasure" + i];
            ispis += `<span class="ingredient-measure">${measure}</span>`
        }
    }
    ispis += "</div>";
    mealDetails.innerHTML = ispis;
}