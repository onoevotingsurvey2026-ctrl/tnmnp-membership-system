import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
getDatabase,
ref,
set
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


/* FIREBASE CONFIG */

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


/* INITIALIZE */

const app =
initializeApp(firebaseConfig);

const db =
getDatabase(app);



/* AUTO ID */

function generateID(){

return "TMNP-" + Date.now();

}


/* PAGE LOAD */

window.addEventListener(

"load",

function(){

document.getElementById(
"regId"
).value=

generateID();

}

);



/* LOGO PREVIEW */

window.loadLogo=function(e){

const file=e.target.files[0];

if(!file)return;

document.getElementById(
"logoPreview"
).src=

URL.createObjectURL(
file
);

};



/* LEADER PREVIEW */

window.loadLeader=function(e){

const file=e.target.files[0];

if(!file)return;

document.getElementById(
"leaderPreview"
).src=

URL.createObjectURL(
file
);

};



/* SUBMIT MEMBERSHIP */

window.submitMembership=

function(){

const member={

id:
document.getElementById(
"regId"
).value,

name:
document.getElementById(
"name"
).value,

mobile:
document.getElementById(
"phone"
).value,

voter:
document.getElementById(
"voter"
).value,

email:
document.getElementById(
"email"
).value,

address:
document.querySelector(
"textarea"
).value,

created:
new Date()
.toLocaleString()

};


/* SAVE */

set(

ref(
db,
"members/"+member.id
),

member

)

.then(()=>{

alert(

"Membership Registered Successfully ✅\n\n"

+

member.id

);


/* CLEAR */

document.getElementById(
"name"
).value="";

document.getElementById(
"phone"
).value="";

document.getElementById(
"voter"
).value="";

document.getElementById(
"email"
).value="";

document.querySelector(
"textarea"
).value="";


/* NEW ID */

document.getElementById(
"regId"
).value=

generateID();

})

.catch(error=>{

alert(

"Save Failed\n"

+

error.message

);

});

};
