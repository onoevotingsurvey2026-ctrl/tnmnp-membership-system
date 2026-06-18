function saveMember(){

const name = document.getElementById("name").value;
const phone = document.getElementById("phone").value;

if(!name || !phone){
alert("Required fields missing");
return;
}

const file = document.getElementById("photo").files[0];

const reader = new FileReader();

reader.onload = function(){

const member = {
id: generateID(),
timestamp: getTimestamp(),
name,
phone,
district: document.getElementById("district").value,
email: document.getElementById("email").value,
voterid: document.getElementById("voterid").value,
photo: reader.result || ""
};

const data = getData();
data.push(member);
saveData(data);

renderCard(member);
};

if(file) reader.readAsDataURL(file);
else reader.onload();
}
