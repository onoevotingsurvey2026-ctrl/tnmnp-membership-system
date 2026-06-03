<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>TMNP Admin Dashboard</title>

<style>

body{
font-family:Arial;
background:#f2f2f2;
padding:20px;
margin:0;
}

.container{
max-width:1100px;
margin:auto;
background:#fff;
padding:20px;
border-radius:10px;
box-shadow:0 0 10px rgba(0,0,0,.1);
}

/* LOGIN */

#dashboard{
display:none;
}

input,button{
width:100%;
padding:10px;
margin:8px 0;
box-sizing:border-box;
}

button{
background:#0b5ed7;
color:white;
border:none;
cursor:pointer;
}

/* DASHBOARD */

.title{
text-align:center;
font-size:28px;
font-weight:bold;
margin-bottom:20px;
}

.stats{
display:flex;
gap:20px;
justify-content:center;
margin-bottom:20px;
flex-wrap:wrap;
}

.card{
width:220px;
background:#0b5ed7;
color:white;
padding:20px;
border-radius:10px;
text-align:center;
}

.controls{
display:flex;
gap:10px;
margin-bottom:15px;
}

.controls input{
flex:1;
}

table{
width:100%;
border-collapse:collapse;
}

th,td{
border:1px solid #ddd;
padding:10px;
}

th{
background:#eee;
}

.loading{
text-align:center;
padding:15px;
color:gray;
}

@media(max-width:700px){

.controls{
flex-direction:column;
}

}

</style>

</head>

<body>

<div class="container">

<h2>TMNP Admin Login</h2>

<div id="loginBox">

<input id="user" placeholder="Email">

<input id="pass"
type="password"
placeholder="Password">

<button onclick="login()">

Login

</button>

</div>


<div id="dashboard">

<div class="title">

TMNP Admin Dashboard

</div>


<div class="stats">

<div class="card">

<h2 id="totalCount">

0

</h2>

<div>

Total Members

</div>

</div>

</div>


<div class="controls">

<input
id="search"
placeholder="Search Name / Mobile"
onkeyup="filterData()">

<button onclick="downloadCSV()">

Export CSV

</button>

</div>

<div class="loading" id="loading">

Loading Members...

</div>


<table>

<thead>

<tr>

<th>ID</th>

<th>Name</th>

<th>Mobile</th>

<th>Voter ID</th>

<th>Email</th>

</tr>

</thead>

<tbody id="dataBody">

</tbody>

</table>

</div>

</div>

<script type="module">

import {
initializeApp
}
from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
getDatabase,
ref,
onValue
}
from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


const firebaseConfig={

apiKey:"AIzaSyBJaHZfEyg4pID4jmPSyVxEbDhta4VY0kY",

authDomain:
"tnmnp-membership-system.firebaseapp.com",

databaseURL:
"https://tnmnp-membership-system-default-rtdb.firebaseio.com",

projectId:
"tnmnp-membership-system",

storageBucket:
"tnmnp-membership-system.firebasestorage.app",

messagingSenderId:
"616857466202",

appId:
"1:616857466202:web:0fb4fae39e938ec0edef63"

};


const app=
initializeApp(firebaseConfig);

const db=
getDatabase(app);

let allData=[];


/* LOGIN */

window.login=function(){

const u=
document.getElementById(
"user"
).value;

const p=
document.getElementById(
"pass"
).value;

if(

u==="onoe.voting.survey2026@gmail.com"

&&

p==="nraman131069"

){

loginBox.style.display="none";

dashboard.style.display="block";

loadData();

}

else{

alert(
"Invalid Login"
);

}

}


/* LOAD */

function loadData(){

loading.style.display="block";

onValue(

ref(
db,
"members"
),

(snapshot)=>{

allData=[];

let html="";

if(snapshot.exists()){

snapshot.forEach(child=>{

const d=
child.val();

allData.push(d);

html+=`

<tr>

<td>${d.id||""}</td>

<td>${d.name||""}</td>

<td>${d.mobile||""}</td>

<td>${d.voter||""}</td>

<td>${d.email||""}</td>

</tr>

`;

});

}

else{

html=`

<tr>

<td colspan="5">

No Records

</td>

</tr>

`;

}

dataBody.innerHTML=html;

totalCount.innerText=
allData.length;

loading.style.display="none";

}

);

}


/* SEARCH */

window.filterData=function(){

const q=
search.value.toLowerCase();

const filtered=

allData.filter(d=>

(d.name||"")
.toLowerCase()
.includes(q)

||

(d.mobile||"")
.includes(q)

);

let html="";

filtered.forEach(d=>{

html+=`

<tr>

<td>${d.id}</td>

<td>${d.name}</td>

<td>${d.mobile}</td>

<td>${d.voter}</td>

<td>${d.email}</td>

</tr>

`;

});

dataBody.innerHTML=html;

};


/* CSV */

window.downloadCSV=function(){

if(allData.length===0){

alert("No Data");

return;

}

let csv=
"ID,Name,Mobile,Voter,Email\n";

allData.forEach(d=>{

csv +=

`${d.id},${d.name},${d.mobile},${d.voter},${d.email}\n`;

});

const blob=
new Blob(
[csv],
{
type:"text/csv"
}
);

const a=
document.createElement(
"a"
);

a.href=
URL.createObjectURL(
blob
);

a.download=
"TMNP-members.csv";

a.click();

}

</script>

</body>
</html>
