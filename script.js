moment().format("L");

//-- weather search function --//

function searchCity(cityname) {
  var getAPI =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";
  var forecast =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityname +
    "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";

  $.ajax({
    url: getAPI,
    method: "GET",
  }).then(function (response) {
    $("#current").empty();
    var mainDate = moment().format("L");

    var cityNameEl = $("<h2>").text(response.name);
    var displayDate = cityNameEl.append(" " + mainDate);
    var temperature = $("<p>").text("Tempraturer: " + response.main.temp);
    var humidity = $("<p>").text("Humidity: " + response.main.humidity);
    var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed);
    var weather = response.weather[0].main;

    if (weather === "Rain") {
      var currentIcon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/09d.png"
      );
      currentIcon.attr("style", "height: 60px; width: 60px");
    } else if (weather === "Clouds") {
      var currentIcon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/03d.png"
      );
      currentIcon.attr("style", "height: 60px; width: 60px");
    } else if (weather === "Clear") {
      var currentIcon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/01d.png"
      );
      currentIcon.attr("style", "height: 60px; width: 60px");
    } else if (weather === "Drizzle") {
      var currentIcon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/10d.png"
      );
      currentIcon.attr("style", "height: 60px; width: 60px");
    } else if (weather === "Snow") {
      var currentIcon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/13d.png"
      );
      currentIcon.attr("style", "height: 60px; width: 60px");
    }
  });
}
