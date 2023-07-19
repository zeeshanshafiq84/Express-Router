window.getWeather = function (event) {

  event.preventDefault();

  let cityName = document.querySelector("#cityName").value;

  axios.get(`http://localhost:3000`)
    .then(function (response) {
      // handle success
      console.log(response.data);

      let cityName = document.querySelector("#cityName");
      document.querySelector(".cityName").innerText = cityName.value
      document.querySelector(".temp").innerHTML = `${response.data.name} ${response.data.main.temp}°C`
      document.querySelector('.humidity').innerHTML = `${response.data.main.humidity}%`
      document.querySelector('.wind').innerHTML = `${response.data.wind.speed}`




    })
    .catch(function (error) {
      // handle error
      console.log(error.data);
      document.querySelector("#result").innerHTML = "Error in Getting Weather Data"
    })
}