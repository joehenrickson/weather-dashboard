moment().format("L");

function searchCity(cityname) {
  var getAPI =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";

  $.ajax({
    url: getAPI,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(getAPI);
    //empty divs and ids that we need to dump content into.....
    $("#current").empty();
  });
}
