// =========================
// 💾 DEFAULT STORAGE
// =========================
function getDefaults(){
    return JSON.parse(localStorage.getItem("tnmnp_defaults")) || {};
}

// =========================
// ⚙️ OPEN AUTOFILL PANEL
// =========================
function checkAutoFill(value){

    if(value.length >= 1){
        document.getElementById("autoFillPanel").style.display = "block";

        let defaults = getDefaults();

        document.getElementById("default_voter").value = defaults.voter || "";
        document.getElementById("default_mobile").value = defaults.mobile || "";
        document.getElementById("default_email").value = defaults.email || "";
    }
}

// =========================
// 💾 SAVE DEFAULT SETTINGS
// =========================
function saveDefaults(){

    let data = {
        voter: document.getElementById("default_voter").value,
        mobile: document.getElementById("default_mobile").value,
        email: document.getElementById("default_email").value
    };

    localStorage.setItem("tnmnp_defaults", JSON.stringify(data));

    alert("Defaults Saved Successfully ✅");

    document.getElementById("autoFillPanel").style.display = "none";
}

// =========================
// ⚡ AUTO FILL ON PAGE LOAD
// =========================
window.addEventListener("load", function(){

    let d = getDefaults();

    if(d.voter){
        document.getElementById("voterid").value = d.voter;
    }

    if(d.mobile){
        document.getElementById("phone").value = d.mobile;
    }

    if(d.email){
        document.getElementById("email").value = d.email;
    }
});


// =========================
// 🔳 SCANNER SETUP
// =========================
let html5QrcodeScanner;

function startScanner(){

    document.getElementById("scannerApp").style.display = "flex";

    html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        {
            fps: 10,
            qrbox: 250,
            rememberLastUsedCamera: true
        }
    );

    html5QrcodeScanner.render(onScanSuccess);
}

startScanner();


// =========================
// 🔊 SCAN RESULT (UPGRADED)
// =========================
function onScanSuccess(decodedText){

    // 🔊 Beep sound
    let beep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    beep.play();

    // 📳 Vibration
    if(navigator.vibrate){
        navigator.vibrate([200, 100, 200]);
    }

    db.collection("members")
    .where("regNo", "==", decodedText)
    .get()
    .then(snapshot => {

        let resultDiv = document.getElementById("scanResult");

        if(snapshot.empty){
            resultDiv.innerHTML = `
              <div class="popup red">
                ❌ INVALID QR<br>
                Member Not Found
              </div>
            `;
            return;
        }

        snapshot.forEach(doc => {

            let data = doc.data();

            resultDiv.innerHTML = `
              <div class="popup green">
                🏛️ VERIFIED MEMBER<br><br>

                <b>Reg No:</b> ${data.regNo}<br>
                <b>Voter ID:</b> ${data.voterId}<br>
                <b>Mobile:</b> ${data.mobile}<br>
                <b>Email:</b> ${data.email}<br><br>

                <b style="color:#000;">STATUS: ACTIVE MEMBER</b>
              </div>
            `;
        });

    });

}
