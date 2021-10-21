const btn = document.querySelector('.btn-country');


const whereAmI = function (lat, lng) {

    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`, {
    }).then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err))

}
// btn.addEventListener('click', whereAmI);
whereAmI(52.508, 13.381);



