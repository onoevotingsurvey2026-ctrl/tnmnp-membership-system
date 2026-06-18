```javascript
/* ==================================
   TMNP V5 QR + PDF MODULE
================================== */

/* QR CODE */

function generateQR(memberId){

const qrBox =
document.querySelector(".qr-box");

if(!qrBox) return;

qrBox.innerHTML = "";

new QRCode(qrBox,{

text:
"https://onoevotingsurvey2026-ctrl.github.io/tnmnp-membership-system/?id="
+
memberId,

width:120,

height:120

});

}

/* GOLD CARD + QR */

function renderGoldCard(member){

document.getElementById("idCard")
.innerHTML = `

<div class="card">

<div class="card-header">

<h2>
TMNP GOLD MEMBERSHIP CARD
</h2>

<p>
Lifetime Membership
</p>

</div>

<div class="card-body">

<img
class="member-img"
src="${member.photo || ''}"
>

<div class="member-id">
${member.id}
</div>

<div class="member-name">
${member.name}
</div>

<div class="member-info">

<b>Phone:</b>
${member.phone}<br>

<b>District:</b>
${member.district}<br>

<b>Email:</b>
${member.email || '-'}<br>

<b>Datestamp:</b>
${member.timestamp}

</div>

<div class="badge">

LIFETIME MEMBER

</div>

<div class="qr-box"></div>

</div>

<div class="card-footer">

TMNP • Free Lifetime Membership

</div>

</div>

`;

generateQR(member.id);

}

/* PDF DOWNLOAD */

async function downloadPDF(){

const { jsPDF } =
window.jspdf;

const pdf =
new jsPDF(
'portrait',
'mm',
'a4'
);

const card =
document.getElementById(
"idCard"
);

pdf.setFontSize(18);

pdf.text(
"TMNP MEMBERSHIP CARD",
20,
20
);

pdf.setFontSize(12);

pdf.text(
card.innerText,
20,
40
);

pdf.save(
"TMNP_MEMBER_CARD.pdf"
);

}

/* PRINT CARD */

function printCard(){

window.print();

}

/* A4 EXPORT */

function exportA4(){

window.print();

}
```
