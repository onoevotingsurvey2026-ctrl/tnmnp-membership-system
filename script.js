import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
getDatabase,
ref,
set
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


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


/* GENERATE REGISTRATION ID */

function generateID(){

return "TMNP-"+Date.now()+"-"+Math.floor(
Math.random()*1000
);

}


/* LOAD PAGE */

window.addEventListener(

"DOMContentLoaded",

()=>{

createNewID();

}

);


function createNewID(){

const reg=

document.getElementById(
"regId"
);

if(reg){

reg.value=
generateID();

}

}


/* LOGO */

window.loadLogo=(e)=>{

const file=e.target.files[0];

if(!file)return;

document.getElementById(
"logoPreview"
).src=

URL.createObjectURL(
file
);

};


/* LEADER */

window.loadLeader=(e)=>{

const file=e.target.files[0];

if(!file)return;

document.getElementById(
"leaderPreview"
).src=

URL.createObjectURL(
file
);

};


/* SUBMIT */

window.submitMembership=()=>{

const photoFile=

document.getElementById(
"photo"
).files[0];


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

document.getElementById(
"address"
).value,

photo:

photoFile

?

photoFile.name

:

""

};


set(

ref(
db,
"members/"+member.id
),

member

)

.then(()=>{

alert(

"Membership Registered Successfully\n\n"

+

member.id

);


/* RESET FORM */

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

document.getElementById(
"address"
).value="";

document.getElementById(
"photo"
).value="";


/* NEW REG ID */

createNewID();

})

.catch(err=>{

alert(
"Error : "+err
);

});

};
