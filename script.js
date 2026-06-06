// =========================
// DEFAULT STORAGE
// =========================

function getDefaults(){

return JSON.parse(

localStorage.getItem(

"tnmnp_defaults"

)

) || {};

}

// =========================
// OPEN AUTOFILL PANEL
// =========================

function checkAutoFill(value){

if(value.length>=1){

document.getElementById(

"autoFillPanel"

).style.display=

"block";

let defaults=

getDefaults();

document.getElementById(

"default_voter"

).value=

defaults.voter || "";

document.getElementById(

"default_mobile"

).value=

defaults.mobile || "";

document.getElementById(

"default_email"

).value=

defaults.email || "";

}

}

// =========================
// SAVE DEFAULTS
// =========================

function saveDefaults(){

let data={

voter:

document.getElementById(

"default_voter"

).value,

mobile:

document.getElementById(

"default_mobile"

).value,

email:

document.getElementById(

"default_email"

).value

};

localStorage.setItem(

"tnmnp_defaults",

JSON.stringify(data)

);

alert(

"Defaults Saved Successfully"

);

document.getElementById(

"autoFillPanel"

).style.display=

"none";

}

// =========================
// PAGE LOAD AUTOFILL
// =========================

window.addEventListener(

"load",

function(){

let d=

getDefaults();

if(d.voter){

document.getElementById(

"voterid"

).value=d.voter;

}

if(d.mobile){

document.getElementById(

"phone"

).value=d.mobile;

}

if(d.email){

document.getElementById(

"email"

).value=d.email;

}

}

);

// =========================
// QR SCANNER
// =========================

let html5QrcodeScanner;

function startScanner(){

const scanner=

document.getElementById(

"scannerApp"

);

if(scanner){

scanner.style.display=

"flex";

html5QrcodeScanner=

new Html5QrcodeScanner(

"reader",

{

fps:10,

qrbox:250,

rememberLastUsedCamera:true

}

);

html5QrcodeScanner.render(

onScanSuccess

);

}

}

startScanner();

// =========================
// QR SUCCESS
// =========================

function onScanSuccess(decodedText){

if(navigator.vibrate){

navigator.vibrate(

[200,100,200]

);

}

db.collection(

"members"

)

.where(

"regNo",

"==",

decodedText

)

.get()

.then(snapshot=>{

let result=

document.getElementById(

"scanResult"

);

if(!result)return;

if(snapshot.empty){

result.innerHTML=

"<div class='popup red'>INVALID MEMBER</div>";

return;

}

snapshot.forEach(doc=>{

let data=

doc.data();

result.innerHTML=

`

<div class='popup green'>

<h3>VERIFIED MEMBER</h3>

Reg No:

${data.regNo}

<br>

Voter ID:

${data.voterId}

<br>

Mobile:

${data.mobile}

<br>

Email:

${data.email}

</div>

`;

});

});

}

// =========================
// MEMBER REGISTER
// =========================

memberForm.addEventListener(

"submit",

function(e){

e.preventDefault();

const regId=

"TNMNP-"+Date.now();

document.getElementById(

"reg"

).innerText=

regId;

document.getElementById(

"cvoter"

).innerText=

document.getElementById(

"voterid"

).value;

document.getElementById(

"cmobile"

).innerText=

document.getElementById(

"phone"

).value;

document.getElementById(

"cemail"

).innerText=

document.getElementById(

"email"

).value;

document.getElementById(

"cvote"

).innerText=

document.getElementById(

"voteName"

).value;

document.getElementById(

"caddress"

).innerText=

document.getElementById(

"address"

).value;

const photo=

document.getElementById(

"photo"

);

if(photo.files.length){

document.getElementById(

"memberPhoto"

).src=

URL.createObjectURL(

photo.files[0]

);

}

db.collection(

"members"

).add({

regNo:regId,

voterId:

document.getElementById(

"voterid"

).value,

mobile:

document.getElementById(

"phone"

).value,

email:

document.getElementById(

"email"

).value,

voteName:

document.getElementById(

"voteName"

).value,

address:

document.getElementById(

"address"

).value,

createdAt:

new Date()

})

.then(()=>{

document.getElementById(

"card"

).style.display=

"block";

window.scrollTo(

0,

document.body.scrollHeight

);

})

.catch(err=>{

alert(

"Save Error : "+err

);

});

}

);

// =========================
// WHATSAPP SHARE
// =========================

function shareWA(){

let msg=

"TMNP Membership Registration\n\n"+

"Reg ID : "+

document.getElementById(

"reg"

).innerText+

"\nMobile : "+

document.getElementById(

"cmobile"

).innerText+

"\nName : "+

document.getElementById(

"cvote"

).innerText;

window.open(

"https://wa.me/918939324309?text="+

encodeURIComponent(msg)

);

}

// =========================
// GMAIL SHARE
// =========================

function gmailOpen(){

let body=

"TMNP Registration\n\n"+

"Registration ID : "+

document.getElementById(

"reg"

).innerText+

"\nMobile : "+

document.getElementById(

"cmobile"

).innerText;

window.location=

"mailto:tnmakkalnalvazhvuperiyakkam@gmail.com"+

"?subject=TMNP Membership Registration"+

"&body="+

encodeURIComponent(body);

}

// =========================
// RESET
// =========================

function resetAll(){

location.reload();

}
