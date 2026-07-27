
/* ================= DATA ================= */

const selectedSeats = [];


// Demo fare
// Next step mein bus-search se dynamic fare aayega

const farePerSeat = Number(
    localStorage.getItem("selectedBusPrice")
) || 550;


const selectedBus =
    localStorage.getItem("selectedBusName")
    || "BusYatra Express";



/* ================= ELEMENTS ================= */

const seats =
    document.querySelectorAll(".available-seat");

const selectedSeatsText =
    document.getElementById(
        "selectedSeatsText"
    );

const seatCount =
    document.getElementById(
        "seatCount"
    );

const totalFare =
    document.getElementById(
        "totalFare"
    );

const fareElement =
    document.getElementById(
        "farePerSeat"
    );

const continueBtn =
    document.getElementById(
        "continueBtn"
    );

const busName =
    document.getElementById(
        "busName"
    );

const summaryBus =
    document.getElementById(
        "summaryBus"
    );



/* ================= MAX SEATS ================= */

// Demo ke liye 1 passenger
// Baad mein URL se passenger count lenge

const maxSeats = 1;



/* ================= BUS DATA ================= */

busName.textContent =
    selectedBus;

summaryBus.textContent =
    selectedBus;

fareElement.textContent =
    "₹" + farePerSeat;



/* ================= SEAT CLICK ================= */

seats.forEach(function(seat) {

    seat.addEventListener(
        "click",
        function() {

            const seatNumber =
                this.dataset.seat;



            /* REMOVE SELECTED SEAT */

            if (
                selectedSeats.includes(
                    seatNumber
                )
            ) {

                const index =
                    selectedSeats.indexOf(
                        seatNumber
                    );

                selectedSeats.splice(
                    index,
                    1
                );

                this.classList.remove(
                    "selected-seat"
                );

            }


            /* ADD SELECTED SEAT */

            else {

                if (
                    selectedSeats.length
                    >= maxSeats
                ) {

                    alert(
                        `You can select maximum ${maxSeats} seat(s).`
                    );

                    return;

                }


                selectedSeats.push(
                    seatNumber
                );

                this.classList.add(
                    "selected-seat"
                );

            }


            updateSummary();

        }
    );

});



/* ================= UPDATE SUMMARY ================= */

function updateSummary() {

    seatCount.textContent =
        selectedSeats.length;



    /* SELECTED SEATS */

    if (
        selectedSeats.length === 0
    ) {

        selectedSeatsText.textContent =
            "Not Selected";

    } else {

        selectedSeatsText.textContent =
            selectedSeats.join(", ");

    }



    /* TOTAL FARE */

    const total =
        selectedSeats.length
        * farePerSeat;


    totalFare.textContent =
        "₹" + total;



    /* BUTTON */

    if (
        selectedSeats.length > 0
    ) {

        continueBtn.disabled =
            false;

    } else {

        continueBtn.disabled =
            true;

    }

}



/* ================= CONTINUE ================= */

continueBtn.addEventListener(
    "click",
    function() {

        if (
            selectedSeats.length === 0
        ) {

            alert(
                "Please select at least one seat."
            );

            return;

        }



        /* SAVE BOOKING DATA */

        localStorage.setItem(
            "selectedSeats",
            JSON.stringify(
                selectedSeats
            )
        );


        localStorage.setItem(
            "totalFare",
            selectedSeats.length
            * farePerSeat
        );



        /* NEXT PAGE */

        window.location.href =
            "passenger-details.html";

    }
);
