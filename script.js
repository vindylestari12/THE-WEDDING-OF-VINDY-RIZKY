/* ==========================
OPEN INVITATION + MUSIC
========================== */

const openInvitation = document.getElementById("openInvitation");
const opening = document.getElementById("opening");
const weddingMusic = document.getElementById("weddingMusic");

openInvitation.addEventListener("click", function () {

    opening.classList.add("hide");

    weddingMusic.play().catch(function (error) {
        console.log("Musik belum dapat diputar:", error);
    });

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
/* ==========================
   GALLERY LIGHTBOX
========================== */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const galleryLightbox =
    document.getElementById("galleryLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");


galleryItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const image =
            item.querySelector("img");

        lightboxImage.src =
            image.src;

        lightboxImage.alt =
            image.alt;

        galleryLightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


lightboxClose.addEventListener("click", function () {

    galleryLightbox.classList.remove("active");

    document.body.style.overflow = "";

});


galleryLightbox.addEventListener("click", function (event) {

    if (event.target === galleryLightbox) {

        galleryLightbox.classList.remove("active");

        document.body.style.overflow = "";

    }

});
/* ==========================
   LOAD WISHES FROM GOOGLE SHEETS
========================== */

async function loadWishes() {

    try {

        const response = await fetch(RSVP_URL);

        const wishes = await response.json();

        messageList.innerHTML = "";


        wishes.reverse().forEach(function (wish) {

            const messageItem =
                document.createElement("div");

            messageItem.className =
                "message-item";


            messageItem.innerHTML = `

                <p class="message-name">
                    ${wish.nama}
                </p>

                <p class="message-status">
                    ${wish.kehadiran} · ${wish.jumlahTamu} Orang
                </p>

                <p class="message-text">
                    ${wish.ucapan}
                </p>

            `;


            messageList.appendChild(messageItem);

        });


    } catch (error) {

        console.error(
            "Gagal mengambil ucapan:",
            error
        );

    }

}


/* ==========================
   LOAD WISHES
========================== */

loadWishes();