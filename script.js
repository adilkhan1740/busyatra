
/* ================= BUS SEARCH ================= */

const searchForm = document.getElementById("busSearchForm");

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const from = document.getElementById("fromCity").value;
    const to = document.getElementById("toCity").value;
    const date = document.getElementById("journeyDate").value;
    const passengers = document.getElementById("passengers").value;

    if (from.toLowerCase() === to.toLowerCase()) {

        window.location.href =
    `bus-search.html?from=${from}&to=${to}&date=${date}&passengers=${passengers}`;

        return;

    }

    alert(
        `Searching buses...\n\n` +
        `From: ${from}\n` +
        `To: ${to}\n` +
        `Date: ${date}\n` +
        `Passengers: ${passengers}`
    );

    /*
    Next step:

    window.location.href =
    `bus-search.html?from=${from}&to=${to}&date=${date}&passengers=${passengers}`;
    */

});


/* ================= SWAP CITIES ================= */

function swapCities() {

    const fromInput = document.getElementById("fromCity");
    const toInput = document.getElementById("toCity");

    const temporaryValue = fromInput.value;

    fromInput.value = toInput.value;

    toInput.value = temporaryValue;

}


/* ================= POPULAR ROUTE ================= */

function selectRoute(from, to) {

    document.getElementById("fromCity").value = from;

    document.getElementById("toCity").value = to;

    document.getElementById("search").scrollIntoView({
        behavior: "smooth"
    });

}


/* ================= COUPON COPY ================= */

function copyCoupon(coupon) {

    navigator.clipboard.writeText(coupon);

    alert(
        `Coupon "${coupon}" copied successfully!`
    );

}


/* ================= LOGIN MODAL ================= */

function openLogin() {

    const modal = document.getElementById("loginModal");

    modal.style.display = "flex";

}


function closeLogin() {

    const modal = document.getElementById("loginModal");

    modal.style.display = "none";

}


/* Close Login Modal Outside Box */

window.addEventListener("click", function(event) {

    const modal = document.getElementById("loginModal");

    if (event.target === modal) {

        modal.style.display = "none";

    }

});


/* ================= MOBILE MENU ================= */

function toggleMenu() {

    const menu = document.querySelector(".nav-menu");

    if (menu.style.display === "flex") {

        menu.style.display = "none";

    } else {

        menu.style.display = "flex";

        menu.style.flexDirection = "column";

        menu.style.position = "absolute";

        menu.style.top = "75px";

        menu.style.left = "0";

        menu.style.width = "100%";

        menu.style.padding = "20px";

        menu.style.background = "white";

        menu.style.boxShadow =
            "0 10px 20px rgba(0,0,0,0.1)";

    }

}


/* ================= SET MINIMUM DATE ================= */

const dateInput = document.getElementById("journeyDate");

const today = new Date();

const year = today.getFullYear();

const month = String(
    today.getMonth() + 1
).padStart(2, "0");

const day = String(
    today.getDate()
).padStart(2, "0");

dateInput.min = `${year}-${month}-${day}`;


/* ================= BOOK BUTTON ================= */

const bookButtons =
    document.querySelectorAll(".book-btn");

bookButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        alert(
            "Great! Seat selection and booking page will open here."
        );

    });

});

