let DB_KEY = "tmnp";

function getData(){
return JSON.parse(localStorage.getItem(DB_KEY) || "[]");
}

function saveData(data){
localStorage.setItem(DB_KEY, JSON.stringify(data));
}

let counter = Number(localStorage.getItem("tmnp_counter") || Date.now()%100000);

function generateID(){
counter++;
localStorage.setItem("tmnp_counter", counter);
return "TMNP-LM-" + String(counter).padStart(6,"0");
}

function getTimestamp(){
return new Date().toLocaleString("en-IN");
}
