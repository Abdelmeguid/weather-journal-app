//create the Buttonn
function button_create() {
  const h22 = document.getElementById("thefeelings");
  const xx2 =
    '<button id="thegenerate" type="submit">Please press here to generate</button>';
  h22.insertAdjacentHTML("afterend", xx2);
}

button_create();

//adjust the obacity
const obacity = function () {
  document.getElementById("theentry").style.opacity = 1;
};

//the needed variables
let TheDate = new Date();
let OurDate = TheDate.toDateString();
const TheBaseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const TheApiKey = ",&appid=539c0ca33a3fa2a278320b73d4be2d98&units=metric";
const OurServer = "http://127.0.0.1:4000";
const error = document.getElementById("theerror");

//the main function
const DataGeneration = function () {
  const zip = document.getElementById("thezip").value;
  const feelings = document.getElementById("thefeelings").value;
  getWeatherData(TheBaseURL, zip, TheApiKey).then(function (data) {
    if (data.cod == 200) {
      const {
        main: { temp, pressure, humidity },
        name: city,
        weather: [{ description }],
      } = data;
      const info = {
        OurDate,
        city,
        temp: Math.round(temp),
        description,
        feelings,
        pressure,
        humidity,
      };
      console.log(pressure);
      postData(OurServer + "/post", info);
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //We use setTimeout to solve problem that the result appear only after second click this Because the //
      //server need more time to send and update with the new data so i make a small delay to show the result in API.         //
      /////////////////////////////////////////////////////////////////////////////////////////////////////
      setTimeout(result, 100);
      obacity();
    }
  });
};

//start function to intiate our button if it clicked
function start() {
  document
    .getElementById("thegenerate")
    .addEventListener("click", DataGeneration);
}

start();

// get data from API
const getWeatherData = async function (X, Y, Z) {
  try {
    const res = await fetch(X + Y + Z);
    const data = await res.json();
    if (data.cod != 200) {
      error.innerHTML = data.message;
      let MyError = function () {
        error.innerHTML = "";
      };
      setTimeout(MyError, 2000);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
//send data to server
const postData = async function (url = "", info = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  try {
    const newData = await res.json();
    console.log(`You just saved`, newData);
    console.log(`this only for test  ${newData.city}`);
    return newData;
  } catch (error) {
    console.log(error);
  }
};
//find data from server and show it in API
const result = async function () {
  const res = await fetch(OurServer + "/get");
  try {
    const savedData = await res.json();

    // let div = document.getElementById("theentryHolder");
    // let rr = document.createElement("div");
    // rr.setAttribute("id", box);
    // rr.style.background = "red";
    // let text1 = document.createTextNode("i am new div");
    // rr.appendChild(text1);
    // div.append(rr);
    let div = document.getElementById("theentryHolder");
    //to prevent create the same element again if we click the button again
    div.innerHTML = " ";
    for (let i = 0; i < 7; i++) {
      let rr$i = document.createElement("div");
      div.append(rr$i);

      if (i === 0) {
        rr$i.setAttribute("id", "thedate");
        rr$i.innerHTML = "Date:" + savedData.OurDate;
      }
      if (i === 1) {
        rr$i.setAttribute("id", "thecity");
        rr$i.innerHTML = "City:" + savedData.city;
      }
      if (i === 2) {
        rr$i.setAttribute("id", "thetemp");
        rr$i.innerHTML = "Temp:" + savedData.temp + "&degC";
      }
      if (i === 3) {
        rr$i.setAttribute("id", "description");
        rr$i.innerHTML = "Description:" + savedData.description;
      }
      if (i === 4) {
        rr$i.setAttribute("id", "thecontent");
        rr$i.innerHTML = "Feelings:" + savedData.feelings;
      }
      if (i === 5) {
        rr$i.setAttribute("id", "thehumidity");
        rr$i.innerHTML = "Humidity:" + savedData.humidity;
      }
      if (i === 6) {
        rr$i.setAttribute("id", "thepressure");
        rr$i.innerHTML = "Pressure:" + savedData.pressure;
      }
    }
    // secoond method to prevent create the same element again if we click the button again
    // for (let i = 0; i < 7; i++) {

    //   let rr$i = document.createElement("div");
    //   div.append(rr$i);
    //   let cc = document.getElementById("thepressure");
    //   if (i === 1 && cc === null) {
    //     rr$i.setAttribute("id", "thepressure");
    //     vv = 1;
    //     rr$i.innerHTML = savedData.pressure;
    //   }
    // }

    //catch and show the error
  } catch (error) {
    console.log(error);
  }
};
