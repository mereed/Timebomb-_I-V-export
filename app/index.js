import clock from "clock";
import document from "document";
import * as messaging from "messaging";
import * as util from "./util";
import { display } from "display";
import * as messaging from "messaging";
import userSettings from "user-settings";
import { preferences } from "user-settings";
import { units } from "user-settings";
import { charger, battery } from "power";
import { today } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import * as strip from "./util";
import { user } from "user-profile";
import { inbox } from "file-transfer";
import { readFileSync } from "fs";
import * as cbor from 'cbor';

// Create a new instance of the HeartRateSensor object
var hrm = new HeartRateSensor();

let page = document.getElementById("page");
let vtiny1 = document.getElementById("vtiny1");
let vtiny2 = document.getElementById("vtiny2");

// TIME
let separator = document.getElementById("separator");
let hours1 = document.getElementById("hours1");
let hours2 = document.getElementById("hours2");
let mins1 = document.getElementById("mins1");
let mins2 = document.getElementById("mins2");
let secs1 = document.getElementById("secs1");
let secs2 = document.getElementById("secs2");

// alternate time

let separatorsmall = document.getElementById("separatorsmall");
let hours1p = document.getElementById("hours1p");
let hours2p = document.getElementById("hours2p");
let mins1p = document.getElementById("mins1p");
let mins2p = document.getElementById("mins2p");
let secs1p = document.getElementById("secs1p");
let secs2p = document.getElementById("secs2p");
let bksepbox = document.getElementById("bksepbox");

let show = "clock";
let show2 = "time1";

let timestyle = document.getElementById("timeformat");
let time1 = document.getElementById("time1");
let time2 = document.getElementById("time2");

// Views
let clockView = document.getElementById("clock");
let statsView = document.getElementById("stats");

// Clock view
let textime = document.getElementById("textime");
let dateLabel = document.getElementById("dateLabel");
let dateLabel1 = document.getElementById("dateLabel1");

// Stats View
let steps = document.getElementById("mysteps");
let distance = document.getElementById("distance");
let calories = document.getElementById("cals");
let active = document.getElementById("act");
let elevation = document.getElementById("ele");
let hrLabel = document.getElementById("hrm");
hrLabel.text ="–";
let elHRRest = document.getElementById("resting-heart");
elHRRest.text ="–";

let stepimg = document.getElementById("stepimg");
let distimg = document.getElementById("distimg");
let calimg = document.getElementById("calimg");
let actimg = document.getElementById("actimg");
let eleimg = document.getElementById("eleimg");

let stepbox = document.getElementById("stepbox");
let distbox = document.getElementById("distbox");
let calsbox = document.getElementById("calsbox");
let actbox = document.getElementById("actbox");
let floorsbox = document.getElementById("floorsbox");
let datebox = document.getElementById("datebox");
let hrmbox = document.getElementById("hrmbox");

let batterytext = document.getElementById("batterytext");
let tb10 = document.getElementById("tb10");

let background = document.getElementById("clickbg");

let bgcol0 = document.getElementById("bgcol0");
let bgcol1 = document.getElementById("bgcol1");
let bgcol2 = document.getElementById("bgcol2");
let bgcol3 = document.getElementById("bgcol3");
let bgcol4= document.getElementById("bgcol4");

clock.granularity = "seconds";

//--------- startup settings ---------//

//initialisation
inbox.onnewfile = processInbox;

let defaultSettings = {
                 color: "#ffffff",
                 color1: "#777777",
                 color2: "#aaaaaa",
                 battery: false,
                 display: false
};

let settings = defaultSettings;


//settings handling
function loadSettings()
{
  try {
    settings = readFileSync("settings.cbor", "cbor");
    transformSettings();
    mergeWithDefaultSettings();
  } catch (e) {
    console.log('No settings found, fresh install, applying default settings...');
    
    //apply default settings
    settings = defaultSettings;
  }
  
  console.log('Applying settings: ' + JSON.stringify(settings));
  applySettings();
}

function transformSettings() {
  //change all settings you want in another format as sent by the companion here
  if (settings.dateFormat) {
    settings.dateFormat = settings.dateFormat.values[0].name;
  }
}

function mergeWithDefaultSettings() {
  for (let key in defaultSettings) {
    if (!settings.hasOwnProperty(key)) {
      settings[key] = defaultSettings[key];
    }
  }
}

function applySettings() {

          hours1.style.fill = settings.color;
          hours2.style.fill = settings.color;
          hours1p.style.fill = settings.color;
          hours2p.style.fill = settings.color;
          mins1.style.fill = settings.color;
          mins2.style.fill = settings.color;
          mins1p.style.fill = settings.color;
          mins2p.style.fill = settings.color;
          secs1p.style.fill = settings.color;
          secs2p.style.fill = settings.color;
          separator.style.fill = settings.color;
          separatorsmall.style.fill = settings.color;
  
          bgcol0.style.fill = settings.color1;
          bgcol1.style.fill = settings.color1;
          bgcol2.style.fill = settings.color1;
          bgcol3.style.fill = settings.color1;
          bgcol4.style.fill = settings.color1;
  
          stepbox.style.fill = settings.color1;
          distbox.style.fill = settings.color1;
          calsbox.style.fill = settings.color1;
          actbox.style.fill = settings.color1;
          floorsbox.style.fill = settings.color1;
          datebox.style.fill = settings.color1;
          hrmbox.style.fill = settings.color1;
  
          dateLabel.style.fill = settings.color2;
          dateLabel1.style.fill = settings.color2;
          batterytext.style.fill = settings.color2;
          tb10.style.fill = settings.color2;
  
          steps.style.fill = settings.color2;
          distance.style.fill = settings.color2;
          calories.style.fill = settings.color2;
          elevation.style.fill = settings.color2;
          active.style.fill = settings.color2;
          elHRRest.style.fill = settings.color2;
          hrLabel.style.fill = settings.color2;
          vtiny1.style.fill = settings.color2;
          vtiny2.style.fill = settings.color2;
          calimg.style.fill = settings.color2;
          stepimg.style.fill = settings.color2;
          distimg.style.fill = settings.color2;
          actimg.style.fill = settings.color2;
          eleimg.style.fill = settings.color2;
  
          display.autoOff = (settings.display) ? false : true;
  
          batterytext.style.display = (settings.battery) ? 'inline' : 'none';
      //    tb10.style.display = (settings.battery) ? 'inline' : 'none';
  
          calimg.style.display = (settings.stats) ? 'inline' : 'none';
          distimg.style.display = (settings.stats) ? 'inline' : 'none';
          stepimg.style.display = (settings.stats) ? 'inline' : 'none';
          actimg.style.display = (settings.stats) ? 'inline' : 'none';
          eleimg.style.display = (settings.stats) ? 'inline' : 'none';
  
          stepbox.style.display = (settings.stats) ? 'inline' : 'none';
          distbox.style.display = (settings.stats) ? 'inline' : 'none';
          calsbox.style.display = (settings.stats) ? 'inline' : 'none';
          stepbox.style.display = (settings.stats) ? 'inline' : 'none';
          actbox.style.display = (settings.stats) ? 'inline' : 'none';
          floorsbox.style.display = (settings.stats) ? 'inline' : 'none';
          datebox.style.display = (settings.stats) ? 'inline' : 'none';
          hrmbox.style.display = (settings.stats) ? 'inline' : 'none';
  
          distance.style.display = (settings.stats) ? 'inline' : 'none';
          calories.style.display = (settings.stats) ? 'inline' : 'none';
          elevation.style.display = (settings.stats) ? 'inline' : 'none';
          active.style.display = (settings.stats) ? 'inline' : 'none';
          steps.style.display = (settings.stats) ? 'inline' : 'none';
          hrLabel.style.display = (settings.stats) ? 'inline' : 'none';
          elHRRest.style.display = (settings.stats) ? 'inline' : 'none';
          vtiny1.style.display = (settings.stats) ? 'inline' : 'none';
          vtiny2.style.display = (settings.stats) ? 'inline' : 'none';
          dateLabel.style.display = (settings.stats) ? 'inline' : 'none';
          dateLabel1.style.display = (settings.stats) ? 'inline' : 'none';

}

//load stored settings if any at startup
loadSettings();

function processInbox()
{
  let fileName;
  while (fileName = inbox.nextFile()) {
    console.log("File received: " + fileName);

    if (fileName === 'settings.cbor') {
        loadSettings();
    }
  }
};

function clocker() {
  let d = new Date();

// HOURS
  let hour = ("0" + util.formatHours(d.getHours())).slice(-2);
  setHours(hour);
  setHours2(hour);

  // MINUTES
  let minute = ("0" + d.getMinutes()).slice(-2);
  setMins(minute);
  setMins2(minute);

  // SECONDS
  let seconds = ("0" + d.getSeconds()).slice(-2);
  setSecs2(seconds);
  
  // BLINK 
  setSeparator(d.getSeconds());

  let monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  let weekdays = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];
  
  let weekdate = d.getDate();
  let weekindex = d.getDay();
  let monthIndex = d.getMonth();

//dateLabel.text = "Wednesday";
dateLabel.text = `${weekdays[weekindex]}`;
//dateLabel1.text = "September 24";
dateLabel1.text = `${monthNames[monthIndex]} ${weekdate}`;
batterytext.text = (Math.floor(battery.chargeLevel) + "%");

vtiny1.text = "bpm";
vtiny2.text = "rHR";
updateStatsData();
}

//--------- health stats ---------//

function updateStatsData(){
  
     steps.text = (today.adjusted.steps || 0);
     calories.text = (today.adjusted.calories || 0);
     active.text = (today.adjusted.activeMinutes || 0);
     elevation.text = (today.adjusted.elevationGain || 0);
  
    if (units.distance === "metric") {
       let units =  (today.adjusted.distance / 1000 || 0);
       distance.text = units.toFixed(2) + "km";
//  console.log("dist km = " + JSON.stringify(units));
    } else {
       let units =  ((today.adjusted.distance / 1000) * 0.624 || 0);
       distance.text = units.toFixed(2) + "mi";
//  console.log("dist mi = " + JSON.stringify(units));
    }
}

// Declare a even handler that will be called every time a new HR value is received.
   hrm.onreading = function() {
// Initialize the UI with some values
   hrLabel.text = (hrm.heartRate || 0);
   elHRRest.text = (user.restingHeartRate || 0 );
   hrm.stop();
   }

// This function updates the label on the display that shows when data was last updated.
function updateDisplay() {
// Begin monitoring the sensor
   hrm.start();
   }

// And update the display every 5 sec
   setInterval(updateDisplay, 5000);

// time style
timestyle.onclick = function(evt) {
//  console.log("Click");
  if (show2 == "time1") {           // large
    show2 = "time2";
    time1.style.display = "none";   
    time2.style.display = "inline";   
  } else if (show2 == "time2") {    // small with seconds
    show2 = "time1";
    time1.style.display = "inline";
    time2.style.display = "none";
    } 
} 

// ------- stats panal ----------- //

background.onclick = function(evt) {
//  console.log("Click");
  if (show == "clock") {           // In Clock -> Switching to Stats
    show = "stats";
    updateStatsData()
    statsView.style.display = "inline";
    batterytext.style.display = "inline";
batterytext.text = (Math.floor(battery.chargeLevel) + "%");
    display.poke()
    
  } else if (show == "stats") {    // In Stats -> Switching to Clock 
    show = "clock";
    //updateStatsData()
    statsView.style.display = "none";
//   battrect.style.display = "none";
    batterytext.style.display = "none";
  //  batteryBar.style.display = "none";

    } 
} 


// Blink time separator
function setSeparator(val) {
  separator.style.display = (val % 2 === 0 ? "inline" : "none");
}

function setHours(val) {
  drawDigits("", val, hours1, hours2);
}

function setMins(val) {
  drawDigits("", val, mins1, mins2);
}

function setHours2(val) {
  drawDigits("s", val, hours1p, hours2p);
}

function setMins2(val) {
  drawDigits("s", val, mins1p, mins2p);
}

function setSecs2(val) {
  drawDigits("p", val, secs1p, secs2p);
}

function drawDigits(prefix, val, place1, place2) {
  place1.href = prefix + Math.floor(val / 10) + ".png";
  place2.href = prefix + Math.floor(val % 10) + ".png";
}

  
// -------------------------------------------------

// Update the clock every tick event
clock.ontick = () => clocker();

// Don't start with a blank screen
clocker();