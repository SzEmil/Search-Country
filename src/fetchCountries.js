'use strict';
import Notiflix from 'notiflix';

const getUrl = name =>
  `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;
export function fetchUsers(countryName) {
  const parsedName = countryName.trim();
  if (parsedName.length === 0) return;

  const url = getUrl(parsedName);
  return fetch(url)
    .then(response => {
      if (!response) {
        throw new Error('Failed to fetch countries API');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
