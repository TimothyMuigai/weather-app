function fetchApi(city){
    const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
    const apiKey ='cd49d85458b39e88b8167552ff5128ec';    

   return fetch(url + city +`&appid=${apiKey}`)
        .then(response =>{
            if(!response.ok){
                throw new Error ('Could not fetch weather data'); 
            }
            return response.json();
        })
        .catch(error =>{
            console.error('Error: ' + error);
        });
}

const textInput = document.querySelector("input");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener('click',async () => {   

    const searchCountry = textInput.value;

    if(!searchCountry){
        displayError("Enter a country or city")
        windinfo.style.display="none";
        humidityinfo.style.display="none";
        displayCountry.style.display="none";
        showIcon.style.display="none"
        displayCard.style.display="none";
    }else{
        try {
            const countryDetails = await fetchApi(searchCountry);
                displayData(countryDetails);
        } catch (error) {
            displayError(`Country/city [${searchCountry}] doesn't exist.`);
            windinfo.style.display="none";
            humidityinfo.style.display="none";
            displayCountry.style.display="none";
            showIcon.style.display="none"
            displayCard.style.display="none";
        }
    }    
});

const showIcon = document.querySelector("img");
const displayCard = document.querySelector(".display");
const windinfo = document.getElementById("windDetails");
const humidityinfo = document.getElementById("humidDetails");
const displayCountry = document.querySelector("h2");

function displayData(input) {
    const {
        name:country,
        main:{humidity},
        wind:{speed},
        weather:[{id,main}]
    } = input;

    displayCountry.textContent = country;
    displayCountry.style.display="flex";

    const windSpeedKmH = (speed * 3.6).toFixed(1);
    humidityinfo.textContent=`Humidity amount: ${humidity}%`;
    humidityinfo.style.display = "flex";

    windinfo.textContent = `Wind speed: ${windSpeedKmH}km/h`;
    windinfo.style.display = "flex";
    displayCard.style.display = "flex";

    showIcon.src = showIcons(id);
    showIcon.alt = main;
    showIcon.style.display="block"

}

function showIcons(icon){
    switch (true) {
        case (icon >= 200 && icon<300 ):
            return "images/mist.png";
        case (icon >=300 && icon < 500):
            return "images/rain.png";
        case (icon >=300 && icon < 500):
            return "images/drizzle.png";
        case (icon >=500 && icon < 600):
            return "images/rain.png";
        case (icon >=600 && icon < 700):
            return "images/snow.png";
        case (icon >=700 && icon <= 800):
            return "images/clear.png";
        case (icon >=801):
            return "images/clouds.png";  
        default:
            return "images/search.png";
    }
}

const errorDisplay = document.getElementById("errors");
function displayError(message){
    errorDisplay.style.display="flex";
    errorDisplay.textContent=message;
}