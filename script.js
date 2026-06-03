import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const app = initializeApp({
apiKey:"AIzaSyBJaHZfEyg4pID4jmPSyVxEbDhta4VY0kY",
databaseURL:"https://tnmnp-membership-system-default-rtdb.firebaseio.com"
});

const db = getDatabase(app);

/* ID */
function genID(){
return "TMNP-" + Date.now();
}

document.getElementById("regId").value = genID();

/* SUBMIT */
window.submitForm = function(){

const id = document.getElementById("regId").value;

const data = {
id,
name: name.value,
mobile: mobile.value,
voter: voter.value,
email: email.value,
address: address.value,
time: Date.now()
};

if(!data.name || !data.mobile){
alert("Required fields missing");
return;
}

set(ref(db,"members/"+id), data)
.then(()=>{
alert("Registered Successfully");

document.getElementById("name").value="";
document.getElementById("mobile").value="";
document.getElementById("voter").value="";
document.getElementById("email").value="";
document.getElementById("address").value="";

document.getElementById("regId").value = genID();

});
};
