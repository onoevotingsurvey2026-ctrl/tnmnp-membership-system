```javascript
/* ==================================
   TMNP V5 ADMIN MODULE
================================== */

/* LOAD ALL MEMBERS */

function loadMembers(){

const data =
JSON.parse(
localStorage.getItem("tmnp")
|| "[]"
);

let html = `
<h3>Registered Members</h3>

<table>
<tr>
<th>ID</th>
<th>Name</th>
<th>Phone</th>
<th>District</th>
<th>Action</th>
</tr>
`;

data.forEach((m,index)=>{

html += `
<tr>
<td>${m.id}</td>
<td>${m.name}</td>
<td>${m.phone}</td>
<td>${m.district}</td>

<td>

<button
class="btn"
onclick="viewMember('${m.id}')">
View
</button>

<button
class="btn-green"
onclick="editMember(${index})">
Edit
</button>

</td>

</tr>
`;

});

html += "</table>";

const div =
document.getElementById("memberList");

if(div){
div.innerHTML = html;
}

}

/* VIEW MEMBER */

function viewMember(id){

const data =
JSON.parse(
localStorage.getItem("tmnp")
|| "[]"
);

const member =
data.find(
m => m.id === id
);

if(member){

renderGoldCard(member);

}

}

/* EDIT MEMBER */

function editMember(index){

let data =
JSON.parse(
localStorage.getItem("tmnp")
|| "[]"
);

const member =
data[index];

document.getElementById("name").value =
member.name || "";

document.getElementById("phone").value =
member.phone || "";

document.getElementById("voterid").value =
member.voterid || "";

document.getElementById("email").value =
member.email || "";

document.getElementById("address").value =
member.address || "";

document.getElementById("district").value =
member.district || "";

alert(
"Member loaded into form. Update and Save."
);

}

/* MEMBER SEARCH BOX */

function searchMemberBox(){

const keyword =
document.getElementById("searchBox")
.value
.toLowerCase();

const data =
JSON.parse(
localStorage.getItem("tmnp")
|| "[]"
);

const result =
data.filter(m =>

(m.id || "")
.toLowerCase()
.includes(keyword)

||

(m.name || "")
.toLowerCase()
.includes(keyword)

||

(m.phone || "")
.toLowerCase()
.includes(keyword)

);

if(result.length===0){

alert("No Member Found");

return;

}

renderGoldCard(result[0]);

}

/* MEMBER STATS */

function memberStats(){

const data =
JSON.parse(
localStorage.getItem("tmnp")
|| "[]"
);

const total =
data.length;

let districts = {};

data.forEach(m=>{

districts[m.district] =
(districts[m.district] || 0) + 1;

});

let msg =
"TMNP Dashboard\n\n";

msg +=
"Total Members : "
+
total
+
"\n\n";

for(let d in districts){

msg +=
d +
" : "
+
districts[d]
+
"\n";

}

alert(msg);

}

/* EXPORT CSV V5 */

function exportCSVV5(){

const data =
JSON.parse(
localStorage.getItem("tmnp")
|| "[]"
);

let rows = [];

rows.push([

"ID",
"Timestamp",
"Name",
"Phone",
"Voter ID",
"Email",
"Address",
"District"

]);

data.forEach(m=>{

rows.push([

m.id,
m.timestamp,
m.name,
m.phone,
m.voterid,
m.email,
m.address,
m.district

]);

});

const csv =
rows.map(
r=>r.join(",")
).join("\n");

const blob =
new Blob(
[csv],
{
type:"text/csv"
}
);

const a =
document.createElement("a");

a.href =
URL.createObjectURL(blob);

a.download =
"TMNP_V5_REPORT.csv";

a.click();

}

/* AUTO LOAD */

window.addEventListener(
"load",
loadMembers
);
```
