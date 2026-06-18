async function downloadPDF(){

const { jsPDF } = window.jspdf;

const card = document.getElementById("idCard");

if(!card){
alert("No Card Found");
return;
}

const canvas = await html2canvas(card);

const img = canvas.toDataURL("image/png");

const pdf = new jsPDF("p","mm","a4");

pdf.addImage(img,"PNG",10,10,190,250);

pdf.save("TMNP_CARD.pdf");
}
