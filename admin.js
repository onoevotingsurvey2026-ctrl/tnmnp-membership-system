function loadMembers(){

const data = getData();

let html = `<h3>ADMIN PANEL</h3><table>
<tr><th>ID</th><th>Name</th><th>Phone</th><th>Action</th></tr>`;

data.forEach(m=>{
html += `
<tr>
<td>${m.id}</td>
<td>${m.name}</td>
<td>${m.phone}</td>
<td>
<button onclick="viewMember('${m.id}')">View</button>
<button onclick="deleteMember('${m.id}')">Delete</button>
</td>
</tr>`;
});

html += "</table>";

document.getElementById("memberList").innerHTML = html;
}

function viewMember(id){
const m = getData().find(x=>x.id===id);
if(m) renderCard(m);
}

function deleteMember(id){
let data = getData().filter(m=>m.id!==id);
saveData(data);
loadMembers();
}
