function onScanSuccess(decodedText){

    // 🔊 Beep sound
    let beep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    beep.play();

    // 📳 Vibration (mobile)
    if(navigator.vibrate){
        navigator.vibrate(200);
    }

    db.collection("members")
    .where("regNo", "==", decodedText)
    .get()
    .then(snapshot => {

        let resultDiv = document.getElementById("scanResult");

        if(snapshot.empty){
            resultDiv.innerHTML = `
                <h3 style="color:red;">❌ INVALID QR</h3>
                <p>Member not found</p>
            `;
            return;
        }

        snapshot.forEach(doc => {
            let data = doc.data();

            resultDiv.innerHTML = `
                <h3 style="color:#00ff88;">✅ VERIFIED MEMBER</h3>

                <p><b>Reg No:</b> ${data.regNo}</p>
                <p><b>Voter ID:</b> ${data.voterId}</p>
                <p><b>Mobile:</b> ${data.mobile}</p>
                <p><b>Email:</b> ${data.email}</p>

                <p style="color:#00ff88;font-weight:bold;">
                    STATUS: ACTIVE
                </p>
            `;
        });

    });
}
