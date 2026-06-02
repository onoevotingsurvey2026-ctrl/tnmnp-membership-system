<script type="module">

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig={
apiKey:"AIzaSyBJaHZfEyg4pID4jmPSyVxEbDhta4VY0kY",
authDomain:"tnmnp-membership-system.firebaseapp.com",
databaseURL:"https://tnmnp-membership-system-default-rtdb.firebaseio.com",
projectId:"tnmnp-membership-system",
storageBucket:"tnmnp-membership-system.firebasestorage.app",
messagingSenderId:"616857466202",
appId:"1:616857466202:web:0fb4fae39e938ec0edef63"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


/* ===========================
   AUTO REGISTRATION ID FIX
=========================== */

function generateID(){

return "TMNP-" + Date.now();

}

/* Activate ID immediately on page load */

document.addEventListener("DOMContentLoaded",()=>{

document.getElementById("regId").value = generateID();

});


/* ===========================
   MEMBERSHIP SUBMIT
=========================== */

window.submitMembership=function(){

const id=document.getElementById("regId").value;

const name=document.getElementById("name").value;

const phone=document.getElementById("phone").value;

const voter=document.getElementById("voter").value;

const email=document.getElementById("email").value;

const address=document.querySelector("textarea").value;


set(
ref(db,"members/"+id),
{
id:id,
name:name,
mobile:phone,
voter:voter,
email:email,
address:address,
time:new Date().toLocaleString()
}

)

.then(()=>{

alert("Saved Successfully\n\n"+id);

/* Generate next ID automatically */

document.getElementById("regId").value = generateID();

});

}


/* ===========================
   IMAGE PREVIEW
=========================== */

window.loadLogo=function(e){

logoPreview.src=
URL.createObjectURL(
e.target.files[0]
);

}

window.loadLeader=function(e){

leaderPreview.src=
URL.createObjectURL(
e.target.files[0]
);

}

</script>
