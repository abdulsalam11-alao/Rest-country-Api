"use strict";
let nameid = new URLSearchParams(window.location.search).get("name");
const container = document.querySelector(".container");
const getCurrencyName = function (para) {
  const [key] = Object.entries(para);
  const [key1, currency1] = key;
  return currency1.name;
};
const getCurrencySymbols = function (para) {
  const [key] = Object.entries(para);
  const [key1, symbols1] = key;
  return symbols1.symbol;
};
const getAllLanguages = function (lang) {
  const lan1 = Object.entries(lang);
  const values = lan1.map((key) => {
    const [, value1] = key;
    return `<li class="m-0 p-0">${value1}</li>`;
  });
  return values.join(" ");
};

const mapData = function (country) {
  return ` <div class="card mt-3 bg-primary " id="cont">
    <div class='m-3 row '>
      <img
        class="card-img-right"
        src=${country.flags.png}
        alt="Card image cap"
        style="width: 50%"
      />
      <img
        class="card-img-left"
        src=${country.coatOfArms.png}
        alt="Card image cap"
        style="width: 50%"
      />
      </div>
    
      
    </div>
    <div class="row justify-content-center" id="content">
      <div class="card m-3 bg-primary" style="width: 18rem">
        <div class="card-body ">
          <h5 class="card-title">Country: ${country.name.common}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Capital: ${
            country.capital ? country.capital : "none"
          }</h6>
          <p class="card-text">Continent: ${country.continents}</p>
          <p class="card-text">Sub-region: ${
            country.subregion ? country.subregion : "None"
          }</p>
          <p class="card-text">Population: ${country.population}</p>
          <p class="card-text">Currency:${
            country.currencies ? getCurrencyName(country.currencies) : "none"
          }(${
    country.currencies ? getCurrencySymbols(country.currencies) : "none"
  })</p>
        </div>
      </div>
      
      <div class="card m-3 bg-primary" style="width: 18rem">
        <div class="card-body">
          <p class="card-text m-0">Independent:  ${
            country.independent == true ? "Is Independent" : "Not Independent"
          }</p>
          

            <p class="card-text m-0 p-0 ">Borders: ${
              country.borders
                ? country.borders
                    .map((data) => `<li class="m-0 p-0">${data}</li>`)
                    .join("")
                : "No Border"
            }</p>
          
          <p class="card-text">Timezones: ${
            country.timezones
              ? country.timezones
                  .map((data) => `<li class="m-0 p-0">${data}</li>`)
                  .join(" ")
              : "no timezone"
          }</p>
          <p class="card-text">Start of Week: ${country.startOfWeek}</p>
        </div>
      </div>
      <div class="card m-3 bg-primary" style="width: 18rem">
        <div class="card-body">
         
          <p class="card-text">Languages:</p>
          <p class="card-text">Areas: ${country.area}m<sup>2<sup></p>
          <p class="card-text">Languages:${
            country.languages ? getAllLanguages(country.languages) : "none"
          }</p>
        
        </div>
      </div>
    </div>`;
};

const getEachCountryFullData = async () => {
  const url = await fetch(`https://restcountries.com/v3.1/name/${nameid}`);
  const data = await url.json();
  const mapArr = data.map(mapData);
  console.log(data);

  container.innerHTML = mapArr;
};

getEachCountryFullData();
