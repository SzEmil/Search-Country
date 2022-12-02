'use strict';
import './css/styles.css';
import debounce from 'lodash.debounce';

const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInformation = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;
let countryInfo = [];

function fetchUsers(countryName) {
  return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => {
      if (!response) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(...data);
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

const inputHandler = () => {
  const country = inputCountry.value;
  fetchUsers(country)
    .then(countryArray => {
      countryArray.map(({ name, population, flags }) => {
        if (countryArray.length === 1) {
          countryInformation.innerHTML = `<a>${name.common}</a><a>${population}</a><a>${name.common}</a>`;
        }
        if (countryArray.length > 1) {
          let countryObj = {
            name: name.common,
            flag: flags.png,
          };
          countryInfo.push(countryObj);
        }
      });
      return countryInfo;
    })
    .then(objectDataArray => {
      console.log(objectDataArray);
      objectDataArray.map(arrayData => {
        drawCountryBlock(arrayData);
      });
    })
    .catch(error => {
      console.error(error);
    });
};

function drawCountryBlock({ name, flag }) {
  const liCountry = document.createElement('li');
  const imgCountry = document.createElement('img');
  const linkCountry = document.createElement('a');

  imgCountry.setAttribute('src', flag);
  linkCountry.textContent = name;
  liCountry.appendChild(imgCountry);
  liCountry.appendChild(linkCountry);
  countryList.appendChild(liCountry);
}

inputCountry.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));
