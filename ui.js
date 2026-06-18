function renderCard(m){

document.getElementById("idCard").innerHTML = `
<div class="card">

<div class="card-header">
<h2>TMNP GOLD CARD</h2>
<p>Lifetime Membership</p>
</div>

<div class="card-body">

<img src="${m.photo || 'https://via.placeholder.com/100'}">

<div class="badge">${m.id}</div>

<div class="smalltxt">${m.name}</div>
<div class="smalltxt">${m.phone}</div>
<div class="smalltxt">${m.district}</div>

<div class="qr-box"></div>

</div>

<div class="card-footer">
TMNP • Verified Member
</div>

</div>
`;

setTimeout(()=>{
if(window.generateQR) generateQR(m.id);
},100);

}
