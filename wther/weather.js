const apiKeyOpenWeatherMap = "a98ea5a721efeed5149551b68c67185d";
const urlCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=<REPLACE_W_CITY>&appid=<REPLACE_W_KEY>";
const urlForcastWeather = "https://api.openweathermap.org/data/2.5/forecast?q=<REPLACE_W_CITY>&appid=<REPLACE_W_KEY>";

var cnter = 1;


//////// functions ////////////
function BuildURL(city, baseURL, apikey) {
    return baseURL.replace('<REPLACE_W_CITY>', city).replace('<REPLACE_W_KEY>', apikey);
}


function getForcast(apiUrlForcast, city) {
    fetch(apiUrlForcast)
        .then(response => response.json()
            .then(data => {
                ForcastCount = data.cnt;
                let daynumstart = 1;
                let id = 'forcast';
                let forcastDetailedHolder = document.getElementById("forcastDetailedHolder");
                for (let inxOuter = 1; inxOuter < 9; inxOuter = inxOuter + 1) {

                    for (let inxInner = daynumstart; inxInner < ForcastCount; inxInner = inxInner + 8) {

                        if (inxOuter > 1) {

                            if (inxInner == daynumstart) {

                                let holder = document.createElement('div');
                                holder.setAttribute("class", "row");
                                holder.id = 'forcastDetailedHolder'.concat(daynumstart.toString());
                                id = holder.id;
                                forcastDetailedHolder.appendChild(holder);
                            }
                        }

                        displayWeather(data.list[inxInner], id, city);
                    }
                    daynumstart++;
                }
            }));
    //populateForcastArrays(cityNameForcast, datedtForcast, iconForcast, tempForcast, humidityForcast, windSpeedForcast);
    //  for (let inx = 0; inx <= ForcastCount; inx++) {
    //addForcastHTMLDynamic(arryCityName[inx], arryTemperature[inx], arryDate[inx], arryDescription[inx], arryHumidity[inx], arryWindSpeed[inx], arryIcon[inx]);
    //   }
}

function getCurrent(url, city) {
    fetch(url) /////////////////////////////////////////////// CURRENT //////////////////////////////////////////////////////////
        .then(response => response.json()
            .then(data => {

                displayWeather(data, "current", city);
            })
        );
}

// MAIN STARTING FUNCTION /////////////
function getWeather(cityInput) {

    document.getElementById("current").innerHTML = "";
    document.getElementById("forcast").innerHTML = "";
    document.getElementById("forcastDetailedHolder").innerHTML = "";
    document.getElementById("main").setAttribute('class', 'main visible');
    document.getElementById("history").innerHTML = "";
    document.getElementById("history").setAttribute("class", "btn-group-vertical list-group d-flex justify-content-center");
    
    //1 get url for CURRENT weather for api
    let apiUrlCurrent = BuildURL(cityInput, urlCurrentWeather, apiKeyOpenWeatherMap)
    //2 call CURRENT api
    getCurrent(apiUrlCurrent, cityInput);
    /////////////////////////////////////////////// HISTORY //////////////////////////////////////////////////////////

    /////////////////////////////////////////////// FORCAST //////////////////////////////////////////////////////////
    // 1a get url for FORECAST weather for api

    let apiUrlForcast = BuildURL(cityInput, urlForcastWeather, apiKeyOpenWeatherMap)

    //2a call FORECAST api 
    getForcast(apiUrlForcast, cityInput);


    let aryCityHistory = getHistoryArray('cityName');
    if (aryCityHistory[0] !='empty'){
    aryCityHistory.forEach(displayHistory);
    }
    setHistory(cityInput);

}

function clearHistory(){
    localStorage.clear();

}

function displayHistory(value, index) {
    var e = "getWeather('" + value + "')";

    var colr = "primary";
    if (index % 2 == 1) { colr = "secondary" }

    //var cls='list-group-item list-group-item-action list-group-item-'.concat(colr);
    var cls = 'btn-'.concat(colr);
    var main = document.getElementById("history");
    var b = document.createElement("button");
    b.setAttribute("class", cls);

    //  var a = document.createElement("a");
    // a.setAttribute("class", cls);
    // a.click(e);
    // a.setAttribute("onclick",e);
    b.setAttribute("onclick", e)
    b.innerHTML = value;
    //a.onclick=e;
    main.appendChild(b);

}
function displayWeather(jsonNode, parentContID, city) {

    let cityName = city;//jsonNode.name;
    // const date = data.dt;
    let datedt = new Date(jsonNode.dt * 1000);
    datedt = datedt.toLocaleString();
    let icon = jsonNode.weather[0].icon;
    let imgsrc = 'https://openweathermap.org/img/w/'.concat(icon, '.png');//`<img alt="Current Weather Icon" id="imgIcon" src="https://openweathermap.org/img/w/${icon}.png" style="float: left;" />`;
    let temp = jsonNode.main.temp;
    let humidity = jsonNode.main.humidity;
    let wind = jsonNode.wind.speed;

    let a = datedt.split(',');
    let dt = a[0];
    let tm = a[1];

    let tempF = (((temp - 273.15) * 1.8) + 32).toFixed(1).toString();
  
    var main = document.getElementById(parentContID);


    if (parentContID == 'current') {
        let container_outer1 = document.createElement("div");
        container_outer1.setAttribute("class", "d-flex justify-content-center");

        let container_outer2 = document.createElement("div");
        container_outer2.setAttribute("class", "card");
        container_outer2.setAttribute("style", "width:400px");


        let img1 = document.createElement("img");
        img1.setAttribute("class", "card-img-top");
        img1.setAttribute("alt", "Card image");
        img1.setAttribute("src", imgsrc);


        let contain_containers = document.createElement("div");
        contain_containers.setAttribute("class", "card-img-overlay");

        let container_sectionText = document.createElement("div");
        container_sectionText.setAttribute("class", "d-flex justify-content-center");

        let v6 = document.createElement("h2");
        v6.innerHTML = "Current";

        container_sectionText.appendChild(v6);

        let contain_dttime = document.createElement("div");
        contain_dttime.setAttribute("class", "d-flex justify-content-between");

        let v8 = document.createElement("h4");
        v8.setAttribute("class", "card-title")
        v8.innerHTML = dt;

        let v10 = document.createElement("h4");
        v10.setAttribute("class", "card-title");
        v10.innerHTML = tm;

        contain_dttime.appendChild(v8);
        contain_dttime.appendChild(v10);


        let contain_weather = document.createElement("div");
        contain_weather.setAttribute("class", "d-flex justify-content-between");


        let v13 = document.createElement("h6");
        v13.setAttribute("class", "card-text");
        v13.innerHTML = 'Temperature: '.concat(tempF, '&ordm;F');


        let v15 = document.createElement("h6");
        v15.setAttribute("class", "card-text")
        v15.innerHTML = 'Wind: '.concat(wind);

        let v17 = document.createElement("h6");
        v17.setAttribute("class", "card-text");
        v17.innerHTML = 'Humidity: '.concat(humidity);
/*
        let contain_footer = document.createElement("div");
        contain_footer.setAttribute("class", "card-footer");
        contain_footer.setAttribute("style", "text-align:center");        

        let a= document.createElement("a");
        a.setAttribute("data-toggle", "collapse");
        a.setAttribute("href", "#outerforcast");
        a.setAttribute("class", "collapsed");
        a.setAttribute("aria-expanded", "false");
        a.innerHTML = 'Toggle Forcast';
        contain_footer.appendChild(a);
*/
        contain_weather.appendChild(v13);
        contain_weather.appendChild(v15);
        contain_weather.appendChild(v17);
        
        contain_containers.appendChild(container_sectionText);
        contain_containers.appendChild(contain_dttime);
        contain_containers.appendChild(contain_weather);


        container_outer2.appendChild(img1);
        container_outer2.appendChild(contain_containers);
        
        //container_outer2.appendChild(contain_footer);
        container_outer1.appendChild(container_outer2);
        main.appendChild(container_outer1);



    }
    else {

       
        let v1 = document.createElement("div");
        v1.setAttribute("class", "card p-2 flex-fill justify-content-sm-center column");
       // v1.setAttribute("style", "width:150px");

        let img1 = document.createElement("img");
        img1.setAttribute("class", "Card image");
        img1.setAttribute("class", "card-img-top");
        img1.setAttribute("src", imgsrc);

        let imgoverlay = document.createElement("div");
        imgoverlay.setAttribute("class", "card-img-overlay");

        let container1 = document.createElement("div");
        container1.setAttribute("class", "d-flex flex-fill flex-column justify-content-center");

        let hdt = document.createElement("h6");
        hdt.setAttribute("class", "p-2 d-flex justify-content-center card-title nowrap");
        hdt.innerHTML = dt;

        let htm = document.createElement("h6");
        htm.setAttribute("class", "p-2 d-flex justify-content-center card-title nowrap");
        htm.setAttribute("style", "color:red;");
        htm.innerHTML = tm;


        let htemp = document.createElement("h6");
        htemp.setAttribute("class", "p-2 d-flex justify-content-center card-text wrap");

        let stemp1 = document.createElement("span");
        stemp1.setAttribute("style", "color:white; background-color:black;");

        // let stemp2 = document.createElement("span");
        //stemp2.setAttribute("style", "color:blue;");
        stemp1.innerHTML = tempF.toString().concat('&ordm;F');

        htemp.appendChild(stemp1);
        // htemp.appendChild(stemp2);

        let hwind = document.createElement("h6");
        hwind.setAttribute("class", "p-2 d-flex justify-content-center card-text wrap")
        hwind.setAttribute("style", "text-align: center;")
        let swind = document.createElement("span");
        swind.setAttribute("style", "color:#800080;");
        swind.innerHTML = 'Wind<BR>'.concat(wind);
        hwind.appendChild(swind);


        let hhumidity = document.createElement("h6");
        hhumidity.setAttribute("class", "p-2 d-flex justify-content-center card-text wrap")
        hhumidity.setAttribute("style", "text-align: center;")
        let shumidity = document.createElement("span");
        shumidity.setAttribute("style", "color:#800080;");
        shumidity.innerHTML = 'Humidity<BR>'.concat(humidity);
        hhumidity.appendChild(shumidity);

        container1.appendChild(hdt);
        container1.appendChild(htm);
        container1.appendChild(htemp);
        container1.appendChild(hwind);
        container1.appendChild(hhumidity);
        imgoverlay.appendChild(container1);
        v1.appendChild(img1);
        v1.appendChild(imgoverlay);
        main.appendChild(v1);
    }
}


function getHistoryArray(keyPart) {

    if (localStorage.length!=0){
    const ary = localStorage.getItem(keyPart).split('|');
    document.getElementById("historyClear").setAttribute("class", "btn btn-warning visible");
    return ary;
}
else{
   return "empty|empty".split('|');
}
   
}

function setHistory(cityName) {

    //storing all history city list as string with a | separating them
    var historyCityList = localStorage.getItem("cityName");

    if (historyCityList != null) {
        cityName = cityName.concat('|', historyCityList);

    }
    localStorage.setItem("cityName", cityName);
}

