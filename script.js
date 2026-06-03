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

authDomain:"tnmnp-membership-system.firebaseapp.com",

databaseURL:
"https://tnmnp-membership-system-default-rtdb.firebaseio.com",

projectId:"tnmnp-membership-system",

storageBucket:
"tnmnp-membership-system.firebasestorage.app",

messagingSenderId:"616857466202",

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


function setID(){

document.getElementById(
"regId"
).value=

generateID();

}


document.addEventListener(

"DOMContentLoaded",

()=>{

setID();

}

);


window.loadLogo=(e)=>{

logoPreview.src=
URL.createObjectURL(
e.target.files[0]
);

};


window.loadLeader=(e)=>{

leaderPreview.src=
URL.createObjectURL(
e.target.files[0]
);

};


window.submitMembership=()=>{

const photoFile=
document.getElementById(
"photo"
).files[0];

const member={

id:regId.value,

name:name.value,

mobile:phone.value,

voter:voter.value,

email:email.value,

address:address.value,

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
"Registered\n"+member.id
);

setID();

})

.catch(err=>{

alert(err);

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
document.createElement("a");

a.href=
URL.createObjectURL(blob);

a.download=
"TMNP-membership-report.csv";

a.click();

}
