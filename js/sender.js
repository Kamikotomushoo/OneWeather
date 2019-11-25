function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
  
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open(method, url, true);
  
    } else if (typeof XDomainRequest != "undefined") {
  
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open(method, url);
  
    } else {
  
      // Otherwise, CORS is not supported by the browser.
      xhr = null;
  
    }
    return xhr;
  }

function sendRequest(){
    var city = document.getElementById('cityField').value;

    if(city.length > 0)
    {
      var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city  + "&appid=5d60c80406f8941039d85837e08019a1";
          var xhr = createCORSRequest('GET', url);
        if (!xhr) {
          window.alert('CORS not supported');
        }
        xhr.send();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
              var json = JSON.parse(xhr.responseText);
              if(json.cod == 200){
                  createForecast(json)
              } 
          } else if (xhr.readyState === 4 && xhr.status !== 200)
              {
                document.getElementById('mainText').innerHTML = "<strong class= \"cityName\"><b>City does not exist!</b></strong>";
                document.getElementById('details').innerHTML = "";
                document.getElementById('cityField').value = "";
              }          
          }   
    }
    else {
      clearAll();
    }
}

function createForecast(json){
  var quantity = json.name.lenght + 10;
  var tempreC = (json.main.temp-273).toFixed(1);
  var temperF = ((tempreC * (9/5) ) + 32).toFixed(0);
  document.getElementById('mainText').innerHTML ="<strong>" +tempreC +"<sup class=\"cORf\">C</sup><sub class=\"cORf\">"+ 
  temperF +"<sup  id =\"merticF\" >F</sup></sub></strong>"
   + "<strong class=\"cityName\"><b>"+ json.name  + "</b><sub class=\"cORf\">" + json.sys.country +  "</sub></strong>";

   var mainForecast = json.weather[0].main == "Fog" ? "Mist" :  json.weather[0].main;
   document.getElementById('details').innerHTML = 
                "<strong><img class=\"imagesBox\" src=\"file:///D:/exoft/OneWeather/image/" + mainForecast + ".png\">" + json.weather[0].main +  "</strong>" +
               " <strong><img class=\"imagesBox\" src=\"file:///D:/exoft/OneWeather/image/waterDrop.png\">" + json.main.humidity +"%</strong>" +
               " <strong><img class=\"imagesBox\" src=\"file:///D:/exoft/OneWeather/image/wind.png\">"+ json.wind.speed +"m/s </strong>" +
               " <strong><img class=\"imagesBox\" src=\"file:///D:/exoft/OneWeather/image/pressure.png\">" + json.main.pressure + "hpa</strong>";
}
  
function clearAll(){
  document.getElementById('mainText').innerHTML = "<strong class=\"cityName\"><b>What city are we looking for?</b></strong>";
  document.getElementById('details').innerHTML = "";
  document.getElementById('cityField').value = "";

}

