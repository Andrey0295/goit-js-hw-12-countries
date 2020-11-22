// const { data } = require("autoprefixer");
import templateCard from "../templates/templates-country.hbs" ;

const countriesContainerEl=document.querySelector('.js-countries');
const inputEl=document.querySelector('.countries-input');
inputEl.addEventListener('input', searchCountry);



function searchCountry(event){
    let inputValue = event.currentTarget.value
    console.log(inputValue)

    fetchCountries(inputValue)
    
     
   
}



// fetchCountries(countryName)

// .then(renderCountryCard)
// .catch(error=>console.log(error))

function fetchCountries(countryName) {

    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(response=>response.json()).then(renderCountryCard).catch(error=>console.log(error))
    // .then(data=>console.log(data)) ;
  
   

}




function renderCountryCard(country){
    const markup = templateCard(country);
    // console.log(markup);
    countriesContainerEl.insertAdjacentHTML('beforeend', markup)
}
