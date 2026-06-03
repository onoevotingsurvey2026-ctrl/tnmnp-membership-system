import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const app = initializeApp({
apiKey:"AIzaSyBJaHZfEyg4pID4jmPSyVxEbDhta4VY0kY",
databaseURL:"https://tnmnp-membership-system-default-rtdb.firebaseio.com"
});

const db = getDatabase(app);

/* ID GENERATOR */
function genID(){
return "TMNP-" + Date.now();
}

document.getElementById("regId").value = genID();

/* SUBMIT */
window.submitForm = function(){

const data = {
id: regId.value,
name: name.value,
mobile: mobile.value,
voter: voter.value,
email: email.value,
address: address.value,
time: Date.now()
};

if(!data.name || !data.mobile){
alert("Fill required fields");
return;
}

set(ref(db,"members/"+data.id), data)
.then(()=>{

alert("Registered Successfully ✔");

name.value="";
mobile.value="";
voter.value="";
email.value="";
address.value="";

regId.value = genID();

});

};
