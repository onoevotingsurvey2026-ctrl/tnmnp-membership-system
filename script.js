```javascript

const firebaseConfig={

apiKey:"AIzaSyBJaHZfEyg4pID4jmPSyVxEbDhta4VY0kY",

authDomain:
"tnmnp-membership-system.firebaseapp.com",

databaseURL:
"https://tnmnp-membership-system-default-rtdb.firebaseio.com",

projectId:
"tnmnp-membership-system"

};

firebase.initializeApp(
firebaseConfig
);

const db=
firebase.database();



window.onload=function(){

document.getElementById(
"regId"
).value=

"TMNP-"+Date.now();

};



function saveMember(){

let id=
document.getElementById(
"regId"
).value;


let data={

id:id,

name:
name.value,

mobile:
mobile.value,

voter:
voter.value,

email:
email.value,

address:
address.value,

status:
"pending"

};


db.ref(
"members/"+id
).set(data)

.then(()=>{

alert(
"Membership Saved Successfully"
);

})

.catch(e=>{

alert(
e.message
);

});

}



function loadLogo(e){

const reader=
new FileReader();

reader.onload=
()=>{

logoPreview.src=
reader.result;

};

reader.readAsDataURL(
e.target.files[0]
);

}



function loadLeader(e){

const reader=
new FileReader();

reader.onload=
()=>{

leaderPreview.src=
reader.result;

};

reader.readAsDataURL(
e.target.files[0]
);

}



function openAdmin(){

location.href=
"admin.html";

}
```
