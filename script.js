<script type="module">

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

const app=
initializeApp(firebaseConfig);

const db=
getDatabase(app);


/* AUTO ID */

function generateID(){

return "TMNP-"+Date.now();

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
"",

created:
new Date()
.toLocaleString()

};


/* SAVE TO FIREBASE */

set(

ref(
db,
"members/"+member.id
),

member

)

.then(()=>{

downloadCSV(
[
member
]
);

alert(

"Membership Registered Successfully ✅\n\n"

+

member.id

);

document.getElementById(
"regId"
).value=

generateID();

})

.catch(err=>{

alert(
"Error : "+err
);

});

};



/* CSV EXPORT */

function downloadCSV(data){

let csvContent=

"ID,Name,Mobile,Voter ID,Gmail,Address,Photo URL\n";

data.forEach(row=>{

csvContent+=

`"${row.id}",
"${row.name}",
"${row.mobile}",
"${row.voter}",
"${row.email || ''}",
"${row.address || ''}",
"${row.photo || ''}"\n`;

});


const blob=

new Blob(

[
"\uFEFF"+csvContent
],

{

type:
"text/csv;charset=utf-8;"

}

);


const link=

document.createElement(
"a"
);

link.href=

URL.createObjectURL(
blob
);

link.download=

"TMNP-membership-report.csv";

document.body.appendChild(
link
);

link.click();

document.body.removeChild(
link
);

}

</script>
