/* ==========================
   OPEN INVITATION
========================== */

const openInvitation = document.getElementById("openInvitation");
const opening = document.getElementById("opening");

openInvitation.addEventListener("click", function () {

    opening.classList.add("hide");

});
/* ==========================
   COUNTDOWN
========================== */

const weddingDate = new Date(
    "November 7, 2026 10:00:00 GMT+0700"
).getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;


    if (distance <= 0) {

        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";

        return;
    }


    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );


    document.getElementById("days").innerText =
        String(days).padStart(2, "0");

    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);

/* ==========================
   RSVP & WISHES
========================== */

/* ==========================
   RSVP & WISHES
========================== */

const rsvpForm = document.getElementById("rsvpForm");
const messageList = document.getElementById("messageList");

const RSVP_URL =
    "https://script.google.com/macros/s/AKfycby0qnHbP2s-T8vUeNQ4wH_in1WelzaVxbdKS6sLR2KCU52dQIzwYkTm7Q438fNpA1JmlA/exec";


rsvpForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const guestName =
        document.getElementById("guestName").value;

    const attendance =
        document.querySelector(
            'input[name="attendance"]:checked'
        ).value;

    const guestCount =
        document.getElementById("guestCount").value;

    const guestMessage =
        document.getElementById("guestMessage").value;


    const data = {

        nama: guestName,

        kehadiran: attendance,

        jumlahTamu: guestCount,

        ucapan: guestMessage

    };


    try {

        await fetch(RSVP_URL, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify(data)

        });


        /* Tampilkan ucapan di halaman */

        const messageItem =
            document.createElement("div");

        messageItem.className =
            "message-item";


        messageItem.innerHTML = `

            <p class="message-name">
                ${guestName}
            </p>

            <p class="message-status">
                ${attendance} · ${guestCount} Orang
            </p>

            <p class="message-text">
                ${guestMessage}
            </p>

        `;


        messageList.prepend(messageItem);


        rsvpForm.reset();


        alert("Konfirmasi kehadiran berhasil dikirim.");


    } catch (error) {

        console.error("RSVP Error:", error);

        alert("Gagal mengirim konfirmasi. Silakan coba lagi.");

    }

});