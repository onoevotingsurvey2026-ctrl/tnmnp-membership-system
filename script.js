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

window.onload=()=>{

document.getElementById(
"regId"
).value=

generateID();

};

window.loadLogo=(e)=>{

const file=e.target.files[0];

if(file){

logoPreview.src=
URL.createObjectURL(file);

}

};

window.loadLeader=(e)=>{

const file=e.target.files[0];

if(file){

leaderPreview.src=
URL.createObjectURL(file);

}

};

window.submitMembership=()=>{

const photo=
document.getElementById(
"photo"
).files[0];

const member={

id:
regId.value,

name:
name.value,

mobile:
phone.value,

voter:
voter.value,

email:
email.value,

address:
address.value,

photo:
photo
?
photo.name
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
"Membership Registered\n"+member.id
);

regId.value=
generateID();

});

};

function downloadCSV(member){

let csv=

"ID,Name,Mobile,Voter ID,Email,Address,Photo URL\n";

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
document.createElement("a");

a.href=
URL.createObjectURL(blob);

a.download=
"TMNP-membership-report.csv";

a.click();

}
```
