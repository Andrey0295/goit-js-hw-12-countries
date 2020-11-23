
import API from "./fetchCountries" ;
import getRefs from "./get-refs" ;
import templateCard from "../templates/templates-country.hbs" ;
import countryListTmp from "../templates/country-list.hbs" ;
import {error} from '@pnotify/core' ;
import '@pnotify/core/dist/BrightTheme.css';

const debounce = require('lodash.debounce');
const refs = getRefs();


refs.inputEl.addEventListener('input',  debounce(searchCountry, 500));

function searchCountry(event){
    let inputValue = event.target.value

    API.fetchCountries(inputValue).then(estimateResult)
    
    clearCountryContainer()
    
     
   
}



function renderCountryCard(country){
    const markup = templateCard(country);

    refs.countriesContainerEl.insertAdjacentHTML('beforeend', markup)
}

function renderCountryList(country){
    const listMarkup = countryListTmp(country)
    refs.countriesContainerEl.insertAdjacentHTML('beforeend', listMarkup)
}


function pushError(err){
    error({
        text: err,
        delay: 1000,
        animateSpeed: 'slow',
        width: '600px',
        addClass: 'push-message',
        closer: false,
        sticker: false,

    });
}


function estimateResult(answer){
    if(answer.length > 10) return pushError('Too many matches found. Please enter a more specific query!');
    if(answer.length === 1) return renderCountryCard(answer);
    if(answer.length > 1) return renderCountryList(answer);
}



function clearCountryContainer(){
    refs.countriesContainerEl.innerHTML = ''
}