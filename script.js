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

    //-- city information --//

    var cityNameEl = $("<h2>").text(response.name);
    var displayDate = cityNameEl.append(" " + mainDate);
    var temperature = $("<p>").text("Tempraturer: " + response.main.temp);
    var humidity = $("<p>").text("Humidity: " + response.main.humidity);
    var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed);
    var weather = response.weather[0].main;

    if (weather === "Rain") {
      var weatherIMG = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/09d.png"
      );
      weatherIMG.attr("style", "height: 60px; width: 60px");
    } else if (weather === "Drizzle") {
      var weatherIMG = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/10d.png"
      );
      weatherIMG.attr("style", "height: 60px; width: 60px");
    } else if (weather === "Clear") {
      var weatherIMG = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/01d.png"
      );
      weatherIMG.attr("style", "height: 60px; width: 60px");
    } else if (weather === "Clouds") {
      var weatherIMG = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/03d.png"
      );
      weatherIMG.attr("style", "height: 60px; width: 60px");
    } else if (weather === "Snow") {
      var weatherIMG = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/13d.png"
      );
      weatherIMG.attr("style", "height: 60px; width: 60px");
    }
  });
}

//-- new HTML div --//

var newDiv = $("<div>");

newDiv.append(displayMainDate, weatherIMG, temperature, humidity, windSpeed);

$("#current").html(newDiv);

//-- uvl function --//

var latitude = response.coord.latitude;
var longitude = response.coord.longitude;
var uvIndex =
  "https://api.openweathermap.org/data/2.5/uvi?&appid=ecc0be5fd92206da3aa90cc41c13ca56&lat=" +
  lat +
  "&lon=" +
  lon;

$.ajax({
  url: uvIndex,
  method: "GET",
}).then(function (response) {
  $("#uvIndex-display").empty();
  var uvIndexResults = response.value;
  //create HTML for new div
  var uvlIndex = $("<button class='btn bg-success'>").text(
    "UV Index: " + response.value
  );

  $("#uvIndex-display").html(uvlIndex);
});
//-- 5 day forecast function --//

$.ajax({
  url: forcast,
  method: "GET",
}).then(function (response) {
  var results = response.list;
  $("#5day").empty();
  for (var i = 0; i < results.length; i += 8) {
    var fiveDayDiv = $(
      "<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>"
    );
    var date = results[i].dt_txt;
    var setDate = date.substr(0, 10);
    var temp2 = results[i].main.temp;
    var hum2 = results[i].main.humidity;
    var h5date = $("<h5 class='card-title'>").text(setDate);
    var pTemp = $("<p class='card-text'>").text("Temp: " + temp2);
    var pHum = $("<p class='card-text'>").text("Humidity " + hum2);

    var weather = results[i].weather[0].main;

    if (weather === "Rain") {
      var icon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/09d.png"
      );
      icon.attr("style", "height: 40px; width: 40px");
    } else if (weather === "Clouds") {
      var icon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/03d.png"
      );
      icon.attr("style", "height: 40px; width: 40px");
    } else if (weather === "Clear") {
      var icon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/01d.png"
      );
      icon.attr("style", "height: 40px; width: 40px");
    } else if (weather === "Drizzle") {
      var icon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/10d.png"
      );
      icon.attr("style", "height: 40px; width: 40px");
    } else if (weather === "Snow") {
      var icon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/13d.png"
      );
      icon.attr("style", "height: 40px; width: 40px");
    }

    //append items to.......
    fiveDayDiv.append(h5date);
    fiveDayDiv.append(icon);
    fiveDayDiv.append(pTemp);
    fiveDayDiv.append(pHum);
    $("#5day").append(fiveDayDiv);
  }
});

pageLoad();

$("#select-city").on("click", function (event) {
  // Preventing the button from trying to submit the form......
  event.preventDefault();
  // Storing the city name........
  var cityInput = $("#city-input").val().trim();

  //save search term to local storage.....
  var textContent = $(this).siblings("input").val();
  var storearr = [];
  storearr.push(textContent);
  localStorage.setItem("cityName", JSON.stringify(storearr));

  searchCity(cityInput);
  pageLoad();
});

function pageLoad() {
  var lastSearch = JSON.parse(localStorage.getItem("cityName"));
  var searchDiv = $(
    "<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>"
  ).text(lastSearch);
  var psearch = $("<div>");
  psearch.append(searchDiv);
  $("#searchhistory").prepend(psearch);
}

//Event deligation...
$("#searchhistory").on("click", ".btn", function (event) {
  event.preventDefault();
  console.log($(this).text());
  searchCity($(this).text());
});
