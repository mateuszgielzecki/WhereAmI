const btn = document.querySelector('.btn-country');
const countries = document.querySelector('.countries');
const countryName = document.querySelector('.country__name');
const countryRegion = document.querySelector('.country__region');
const population = document.querySelector('.country__name');
const countryRow = document.querySelectorAll('.country__row');

const whereAmI = function (lat, lng) {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
        .then(res => {
            if (!res.ok) throw new Error(`Problem with geocodin ${res.status}`);
            return res.json();
        })
        .then(data => {
            return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`)
        })
        .then(response => {
            if (!response.ok) throw new Error(`Country not found (${response.status})`);

            return response.json();
        })
        .then(data => {
            renderCountry(data[0])
        })
        .catch(err => console.log(err.message))


}

const renderCountry = function (data) {
    countries.style.opacity = '1';


    const html = ` <article class="country">
        <img class="country__img" src="" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${data.languages}</p>
            <p class="country__row"><span>💰</span>CUR</p>
        </div>
    </article>`

    countries.insertAdjacentHTML('beforeend', html)

}


whereAmI(52.508, 13.381);
whereAmI(12.508, 42.381);

