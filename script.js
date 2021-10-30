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

    console.log(data);
    console.log(data.languages[Object.keys(data.languages)[0]]);

    const html = ` <article class="country">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1) + ' people'}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
            <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
        </div>
    </article>`

    countries.insertAdjacentHTML('beforeend', html)

}


whereAmI(50.012100, 20.985842);
whereAmI(12.508, 42.381);
whereAmI(39.508, 32.381);

