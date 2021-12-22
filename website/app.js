/* Global Variables */
const generateButton = document.getElementById("generate");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate =  (d.getMonth() + 1) + '/'+ d.getDate()+'/'+ d.getFullYear();
// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/forecast?zip=";
const key = "&appid=cf175d458a14722a1920a1dab72e585f&units=metric";
// Event listener to add function to existing HTML DOM element
generateButton.addEventListener("click", submitData);
/* Function called by event listener */
function submitData(e) {
  const zipCodeValue = document.getElementById("zip").value;
  const feelingsValue = document.getElementById("feelings").value;
  getWeatherData(baseURL, zipCodeValue, key)
    .then(function (data) {
      postWeatherData("/addWeatherData", {
        date: newDate,
        temp: data.main.temp,
        content: feelingsValue,
      });
    })
    .then(function () {
      updateUI();
    });
}
/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, ZipCode, key) => {
  const resposne = await fetch(baseURL + ZipCode + key);
  try {
    const data = await resposne.json();
    return data.list[0];
  } catch (error) {
    console.log("error:", error);
  }
};
/* Function to POST data */
const postWeatherData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const response = await response.json();
    console.log(response.msg);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */
const updateUI = async () => {
  const resposne = await fetch("/all");
  try {
    const data = await resposne.json();
    document.getElementById("date").innerHTML = `Date: ${newDate}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temperature: ${data.temp} C`;
    document.getElementById(
      "content"
    ).innerHTML = `I feel: ${data.content}`;
  } catch (error) {
    console.log("error:", error);
  }
};
