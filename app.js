"use strict";
let url = "https://restcountries.com/v3.1/all";
const container = document.querySelector("#content");
const UserInput = document.querySelector("#searchInput");

const getCurrencyName = function (para) {
  const [key] = Object.entries(para);
  const [key1, currency1] = key;
  return currency1.name;
};
const getCurrencySymbols = function (para) {
  const [key] = Object.entries(para);
  const [key1, symbols1] = key;

  const sym = symbols1.symbol ? symbols1.symbol : "none";

  return sym;
};
const getLanguage = function (language) {
  const [key] = Object.entries(language);
  const [key1, lan] = key;
  return lan;
};
const mapData = function (country) {
  return `
      <div class="card col-lg-3 col-sm-4 mx-3 my-5 p-0" style="width: 16rem">
        <!-- Your card template here -->
           <img
             class="card-img-top"
             src=${country.flags.png}
             alt="${country.flags.png}"
             style="height: 150px"
           />
           <ul class="list-group list-group-flush">
             <li class="list-group-item">Country: ${country.name.common}</li>
             <li class="list-group-item">Capital: ${
               country.capital ? country.capital : ""
             }</li>
             <li class="list-group-item">Currency:${
               country.currencies ? getCurrencyName(country.currencies) : "none"
             }(${
    country.currencies ? getCurrencySymbols(country.currencies) : "none"
  })</li>
             <li class="list-group-item">Continent: ${country.continents}</li>
             <li class="list-group-item">Population: ${country.population}</li>
             <li class="list-group-item">Languages: ${
               country.languages ? getLanguage(country.languages) : "none"
             }</li>
           </ul>
           <div class="card-body">
             <a href="detail.html?name=${
               country.name.common
             }"  class="btn btn-info ms-4">View full Details</a>
        </div>
      </div>
    `;
};

const getCountry = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const allData = data.map(mapData);

  container.innerHTML = allData;
};

const getHtmlStructure = function () {};

const getSearchInput = async () => {
  const response = await fetch(url);
  const data = await response.json();
  const userInputValue = UserInput.value.toLowerCase();

  const filteredData = data
    .filter((country) =>
      country.name.common.toLowerCase().includes(userInputValue)
    )
    .map(mapData);

  container.innerHTML = filteredData;
};

UserInput.addEventListener("input", getSearchInput);
window.addEventListener("DOMContentLoaded", () => getCountry(url));
