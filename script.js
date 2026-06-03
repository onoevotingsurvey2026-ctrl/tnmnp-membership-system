```javascript
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



function generateID(){

return "TMNP-"+Date.now();

}



function createID(){

const reg=
document.getElementById(
"regId"
);

if(reg){

reg.value=
generateID();

}

}



document.addEventListener(

"DOMContentLoaded",

()=>{

createID();

}

);



window.loadLogo=function(e){

const file=e.target.files[0];

if(!file)return;

document.getElementById(
"logoPreview"
).src=

URL.createObjectURL(file);

};



window.loadLeader=function(e){

const file=e.target.files[0];

if(!file)return;

document.getElementById(
"leaderPreview"
).src=

URL.createObjectURL(file);

};



window.submitMembership=
function(){

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

downloadCSV(member);

alert(

"Membership Registered Successfully\n\n"

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

document.getElementById(
"address"
).value="";

document.getElementById(
"photo"
).value="";


createID();

})

.catch(err=>{

alert(
"Error : "+err
);

});

};



function downloadCSV(member){

let csv=

"ID,Name,Mobile,Voter ID,Email,Address,Photo\n";


csv +=

`"${member.id}","${member.name}","${member.mobile}","${member.voter}","${member.email}","${member.address}","${member.photo}"`;


const blob=

new Blob(

["\uFEFF"+csv],

{

type:
"text/csv;charset=utf-8"

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
"TMNP-membership-report.csv";

document.body.appendChild(
a
);

a.click();

document.body.removeChild(
a
);

}
```
