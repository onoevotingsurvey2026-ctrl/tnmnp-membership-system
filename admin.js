import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const app = initializeApp({
databaseURL:"https://tnmnp-membership-system-default-rtdb.firebaseio.com"
});

const db = getDatabase(app);

let DATA = [];

/* LOAD REALTIME */
onValue(ref(db,"members"), snap=>{

DATA = [];

snap.forEach(s=>{
DATA.push(s.val());
});

render(DATA);

});

/* RENDER */
function render(list){

table.innerHTML = list.map(d=>`
<tr>
<td>${d.id}</td>
<td>${d.name}</td>
<td>${d.mobile}</td>
<td>${d.email}</td>
</tr>
`).join("");

count.innerText = list.length;
}

/* SEARCH */
window.filterData = function(){

let v = search.value.toLowerCase();

let f = DATA.filter(d =>
(d.name||"").toLowerCase().includes(v) ||
(d.mobile||"").includes(v)
);

render(f);
};

/* CSV */
window.exportCSV = function(){

let csv="ID,Name,Mobile,Email\n";

DATA.forEach(d=>{
csv+=`${d.id},${d.name},${d.mobile},${d.email}\n`;
});

let blob = new Blob([csv]);
let a = document.createElement("a");

a.href = URL.createObjectURL(blob);
a.download = "TMNP-Members-v5.csv";
a.click();
};
