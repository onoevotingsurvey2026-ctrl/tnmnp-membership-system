```javascript
/* ==================================
   TMNP V5 SCRIPT
================================== */

let memberCounter =
parseInt(localStorage.getItem("tmnp_counter") || "0");

/* MEMBER ID */

function generateMemberID(){

memberCounter++;

localStorage.setItem(
"tmnp_counter",
memberCounter
);

return "TMNP-LM-" +
String(memberCounter)
.padStart(6,"0");

}

/* TIMESTAMP */

function getDateStamp(){

const now = new Date();

const y = now.getFullYear();

const m = String(
now.getMonth()+1
).padStart(2,"0");

const d = String(
now.getDate()
).padStart(2,"0");

const h = String(
now.getHours()
).padStart(2,"0");

const min = String(
now.getMinutes()
).padStart(2,"0");

const s = String(
now.getSeconds()
).padStart(2,"0");

return `${y}-${m}-${d}_${h}-${min}-${s}`;

}

/* GOLD CARD */

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
${member.phone}
<br>

<b>District:</b>
${member.district}
<br>

<b>Voter ID:</b>
${member.voterid || '-'}
<br>

<b>Email:</b>
${member.email || '-'}
<br>

<b>Datestamp:</b>
${member.timestamp}

</div>

<div class="badge">
LIFETIME MEMBER
</div>

<div class="qr-box">

QR VERIFICATION
<br>

${member.id}

</div>

</div>

<div class="card-footer">

தமிழ்நாடு மக்கள் நல்வாழ்வு பேரியக்கம்

<br>

Free Lifetime Membership

</div>

</div>

`;

}

/* SEARCH MEMBER */

function searchMember(){

const searchId =
prompt("Enter Member ID");

if(!searchId) return;

const data =
JSON.parse(
localStorage.getItem("tmnp")
|| "[]"
);

const member =
data.find(
m => m.id === searchId
);

if(member){

renderGoldCard(member);

}else{

alert(
"Member Not Found"
);

}

}

/* MEMBER COUNT */

function getMemberCount(){

const data =
JSON.parse(
localStorage.getItem("tmnp")
|| "[]"
);

return data.length;

}

/* DASHBOARD */

function showStats(){

alert(
"Total Members : "
+
getMemberCount()
);

}

/* EXPORT JSON BACKUP */

function exportBackup(){

const data =
localStorage.getItem("tmnp");

const blob =
new Blob(
[data],
{
type:"application/json"
}
);

const a =
document.createElement("a");

a.href =
URL.createObjectURL(blob);

a.download =
"TMNP_BACKUP.json";

a.click();

}
```
