```javascript
/* ==================================
   TMNP V5 EXTRA MODULE
================================== */

/* TOTAL MEMBERS */

function totalMembers(){

const data =
JSON.parse(
localStorage.getItem("tmnp")
|| "[]"
);

return data.length;

}

/* DISTRICT REPORT */

function districtReport(){

const data =
JSON.parse(
localStorage.getItem("tmnp")
|| "[]"
);

let report = {};

data.forEach(m=>{

let d =
m.district || "Unknown";

report[d] =
(report[d] || 0) + 1;

});

let output =
"District Report\n\n";

for(let key in report){

output +=
key +
" : " +
report[key] +
"\n";

}

alert(output);

}

/* DELETE MEMBER */

function deleteMember(){

const memberId =
prompt(
"Enter Member ID"
);

if(!memberId) return;

let data =
JSON.parse(
localStorage.getItem("tmnp")
|| "[]"
);

const newData =
data.filter(
m => m.id !== memberId
);

localStorage.setItem(
"tmnp",
JSON.stringify(newData)
);

alert(
"Member Deleted"
);

}

/* CLEAR DATABASE */

function clearDatabase(){

if(
confirm(
"Delete All Members?"
)
){

localStorage.removeItem(
"tmnp"
);

alert(
"Database Cleared"
);

}

}

/* EXPORT JSON */

function exportJSON(){

const data =
localStorage.getItem(
"tmnp"
);

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

/* IMPORT JSON */

function importJSON(event){

const file =
event.target.files[0];

if(!file) return;

const reader =
new FileReader();

reader.onload =
function(){

localStorage.setItem(
"tmnp",
reader.result
);

alert(
"Backup Imported"
);

};

reader.readAsText(file);

}

/* DASHBOARD */

function dashboard(){

alert(

"TMNP Dashboard\n\n" +

"Total Members : " +

totalMembers()

);

}
```
