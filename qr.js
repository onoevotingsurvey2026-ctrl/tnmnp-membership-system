function generateQR(id){

const box = document.querySelector(".qr-box");
if(!box) return;

box.innerHTML = "";

new QRCode(box,{
text: "https://onoevotingsurvey2026-ctrl.github.io/tnmnp-membership-system/?id=" + id,
width:120,
height:120
});

}
