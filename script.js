// Registration ID Auto Generate

window.onload=function(){

let reg=document.getElementById("regId");

if(reg){

reg.value="TMNP-"+Date.now();

}

};


// Logo Upload

function loadLogo(e){

const file=e.target.files[0];

if(!file)return;

const reader=new FileReader();

reader.onload=function(){

document.getElementById(
"logoPreview"
).src=reader.result;

};

reader.readAsDataURL(file);

}



// Leader Upload

function loadLeader(e){

const file=e.target.files[0];

if(!file)return;

const reader=new FileReader();

reader.onload=function(){

document.getElementById(
"leaderPreview"
).src=reader.result;

};

reader.readAsDataURL(file);

}



// Open Admin Dashboard

function openAdmin(){

window.location.href=
"admin.html";

}



// QR Scanner Optional

if(document.getElementById("reader")){

const scanner=
new Html5Qrcode("reader");

scanner.start(

{facingMode:"environment"},

{

fps:10,

qrbox:220

},

(txt)=>{

document.getElementById(
"scanResult"
).innerHTML=

"QR Result : "+txt;

}

).catch(()=>{

document.getElementById(
"scanResult"
).innerHTML=

"QR Camera Not Active";

});

}
