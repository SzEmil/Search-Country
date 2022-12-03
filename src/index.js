'use strict';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchUsers } from './fetchCountries';

const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInformation = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

const drawCountryInfo = ({ name, capital, population, flags, languages }) => {
  const parsedlanguages = languages.map(lang => lang.name).join(', ');
  countryInformation.innerHTML = '';
  countryList.innerHTML = '';
  countryInformation.innerHTML = `<img src="${flags.svg}"><a>${name}</a><a>${capital}</a><a>${population}</a><a>${parsedlanguages}</a>`;
};

function drawCountryBlock(countries) {
  const countriesArray = countries.map(({ name, flags }) => {
    const countryCard = document.createElement('div');
    countryCard.innerHTML = `<img src="${flags.svg}"><a>${name}</a>`;

    return countryCard;
  });

  countryList.innerHTML = '';
  countryInformation.innerHTML = '';
  countryList.append(...countriesArray);
}

const inputHandler = () => {
  const country = inputCountry.value;
  fetchUsers(country).then(countries => {
    if (countries.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
      return;
    }
    if (countries.length === 1) {
      return drawCountryInfo(countries[0]);
    }
    return drawCountryBlock(countries);
  });
};

inputCountry.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));
