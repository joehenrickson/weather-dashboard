moment().format("L");

//-- weather search function --//

function searchCity(cityname) {
  var getAPI =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&units=imperial&appid=8694667569947d15259554b3609320a2";
  var forecast =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityname +
    "&units=imperial&appid=8694667569947d15259554b3609320a2";

  $.ajax({
    url: getAPI,
    method: "GET",
  }).then(function (response) {
    $("#current").empty();
    var mainDate = moment().format("LL");

    //-- city information --//

    var cityName = $("<h2>").text(response.name + " - ");
    var displayDate = cityName.append(" " + mainDate);
    var temperature = $("<p>").text(
      "Temperature: " + response.main.temp + " °F"
    );
    var humidity = $("<p>").text("Humidity: " + response.main.humidity + " %");
    var windSpeed = $("<p>").text(
      "Wind Speed: " + response.wind.speed + " MPH"
    );
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

    //-- new HTML div --//

    var newDiv = $("<div>");

    newDiv.append(displayDate, weatherIMG, temperature, humidity, windSpeed);

    $("#current").html(newDiv);

    //-- uvl function --//

    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var uvIndex =
      "https://api.openweathermap.org/data/2.5/uvi?&appid=8694667569947d15259554b3609320a2&lat=" +
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
  });

  //-- 5 day forecast function --//

  $.ajax({
    url: forecast,
    method: "GET",
  }).then(function (response) {
    var results = response.list;
    $("#5day").empty();
    for (var i = 0; i < results.length; i += 8) {
      var fiveDayDiv = $(
        "<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>"
      );
      var date = results[i].dt_txt;
      var setDate = date.substr(5, 5);
      var temp2 = results[i].main.temp;
      var hum2 = results[i].main.humidity;
      var h5date = $("<h5 class='card-title'>").text(setDate);
      var pTemp = $("<p class='card-text'>").text("Temp: " + temp2 + " °F");
      var pHum = $("<p class='card-text'>").text("Humidity: " + hum2 + " %");

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
}
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
