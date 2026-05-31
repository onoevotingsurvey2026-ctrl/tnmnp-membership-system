let counter = localStorage.getItem("regCounter") || 0;
counter = parseInt(counter);

// 🌍 GLOBAL VARIABLES
let regNoGlobal = "";
let voteridGlobal = "";
let phoneGlobal = "";

/* =========================
   📌 FORM SUBMIT
========================= */

document.getElementById("registerForm").addEventListener("submit", function(e){
    e.preventDefault();

    let voterid = document.getElementById("voterid").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let declaration = document.getElementById("declaration").checked;

    if(!voterid || !phone || !email){
        alert("Please fill all mandatory fields");
        return;
    }

    if(!declaration){
        alert("Please accept declaration");
        return;
    }

    // AUTO REG NO
    counter++;
    localStorage.setItem("regCounter", counter);

    let regNo = "TNMNP-2026-" + String(counter).padStart(6, "0");

    // 📷 PHOTO
    let photoFile = document.getElementById("photo").files[0];

    if(photoFile){
        let reader = new FileReader();
        reader.onload = function(e){
            document.getElementById("cardPhoto").src = e.target.result;
        };
        reader.readAsDataURL(photoFile);
    }

    // SAVE FIREBASE
    db.collection("members").add({
        voterId: voterid,
        mobile: phone,
        email: email,
        regNo: regNo,
        createdAt: new Date().toISOString()
    })
    .then(() => {

        // ACK
        document.getElementById("acknowledgement").innerHTML = `
            <h3>✅ Registration Successful</h3>
            <p><b>Reg No:</b> ${regNo}</p>
        `;
        document.getElementById("acknowledgement").style.display = "block";

        this.reset();

        // CARD DATA
        document.getElementById("c_regNo").innerText = regNo;
        document.getElementById("c_voter").innerText = voterid;
        document.getElementById("c_mobile").innerText = phone;
        document.getElementById("c_email").innerText = email;
        document.getElementById("c_date").innerText = new Date().toLocaleString();

        // SHOW CARD
        document.getElementById("card").style.display = "block";
        document.getElementById("downloadCard").style.display = "block";
        document.getElementById("whatsappShare").style.display = "block";

        // GLOBAL
        regNoGlobal = regNo;
        voteridGlobal = voterid;
        phoneGlobal = phone;

        // 🔳 QR GENERATION
        document.getElementById("qrcode").innerHTML = "";

        new QRCode(document.getElementById("qrcode"), {
            text: regNoGlobal,
            width: 120,
            height: 120
        });

    })
    .catch(err => {
        console.error(err);
        alert("Error saving data");
    });

});

/* =========================
   📄 PDF DOWNLOAD (HIGH QUALITY)
========================= */

document.getElementById("downloadCard").addEventListener("click", function(){

    const card = document.getElementById("card");

    html2canvas(card, {
        scale: 3,
        useCORS: true
    }).then(canvas => {

        const imgData = canvas.toDataURL("image/png");
        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = 210;

        const imgWidth = 180;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const x = (pageWidth - imgWidth) / 2;
        const y = 20;

        pdf.setFontSize(16);
        pdf.text("TNMNP MEMBERSHIP ID CARD", 50, 15);

        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

        pdf.save("TNMNP_ID_CARD.pdf");
    });

});

/* =========================
   📲 WHATSAPP SHARE
========================= */

document.getElementById("whatsappShare").addEventListener("click", function(){

    let text =
`TNMNP Membership Card
Reg No: ${regNoGlobal}
Voter ID: ${voteridGlobal}
Mobile: ${phoneGlobal}`;

    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
});

/* =========================
   🖥️ ADMIN SEARCH
========================= */

function searchMember(){

    let key = document.getElementById("search").value;

    db.collection("members")
    .where("regNo", "==", key)
    .get()
    .then(snapshot => {

        let resultDiv = document.getElementById("result");

        if(snapshot.empty){
            resultDiv.innerHTML = "❌ No Member Found";
            return;
        }

        snapshot.forEach(doc => {
            let data = doc.data();

            resultDiv.innerHTML = `
                <h3>Member Found</h3>
                <p><b>Reg No:</b> ${data.regNo}</p>
                <p><b>Voter ID:</b> ${data.voterId}</p>
                <p><b>Mobile:</b> ${data.mobile}</p>
                <p><b>Email:</b> ${data.email}</p>
            `;
        });
    });
}

/* =========================
   📷 QR SCANNER
========================= */

function startScanner(){

    const scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: 250
    });

    scanner.render(onScanSuccess);
}

/* =========================
   🔳 QR RESULT HANDLER
========================= */

function onScanSuccess(decodedText, decodedResult){

    db.collection("members")
    .where("regNo", "==", decodedText)
    .get()
    .then(snapshot => {

        let resultDiv = document.getElementById("scanResult");

        if(snapshot.empty){
            resultDiv.innerHTML = "❌ INVALID QR / MEMBER NOT FOUND";
            return;
        }

        snapshot.forEach(doc => {
            let data = doc.data();

            resultDiv.innerHTML = `
              <h3>✅ VERIFIED MEMBER</h3>
              <p><b>Reg No:</b> ${data.regNo}</p>
              <p><b>Voter ID:</b> ${data.voterId}</p>
              <p><b>Mobile:</b> ${data.mobile}</p>
              <p><b>Email:</b> ${data.email}</p>
              <p style="color:green;"><b>STATUS:</b> ACTIVE MEMBER</p>
            `;
        });

    });

}

/* AUTO START SCANNER (optional) */
// startScanner();
