```javascript
/* ================= GET BOOKING DATA ================= */

const selectedBus =
    localStorage.getItem(
        "selectedBusName"
    ) || "BusYatra Express";


const selectedSeats =
    JSON.parse(
        localStorage.getItem(
            "selectedSeats"
        )
    ) || ["A1"];


const farePerSeat =
    Number(
        localStorage.getItem(
            "selectedBusPrice"
        )
    ) || 550;



/* ================= CALCULATE FARE ================= */

const seatFare =
    selectedSeats.length
    * farePerSeat;


// Demo service fee
const serviceFee = 20;


// Demo GST
const gst =
    Math.round(
        (seatFare + serviceFee)
        * 0.05
    );


const totalFare =
    seatFare
    + serviceFee
    + gst;



/* ================= UPDATE UI ================= */

document.getElementById(
    "summaryBus"
).textContent =
    selectedBus;


document.getElementById(
    "seatNumber"
).textContent =
    selectedSeats[0];


document.getElementById(
    "summarySeats"
).textContent =
    selectedSeats.join(", ");


document.getElementById(
    "seatFare"
).textContent =
    "₹" + seatFare;


document.getElementById(
    "serviceFee"
).textContent =
    "₹" + serviceFee;


document.getElementById(
    "gst"
).textContent =
    "₹" + gst;


document.getElementById(
    "totalFare"
).textContent =
    "₹" + totalFare;



/* ================= FORM ================= */

const passengerForm =
    document.getElementById(
        "passengerForm"
    );


passengerForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();



        /* GET FORM DATA */

        const fullName =
            document.getElementById(
                "fullName"
            ).value.trim();


        const age =
            document.getElementById(
                "age"
            ).value;


        const gender =
            document.getElementById(
                "gender"
            ).value;


        const mobile =
            document.getElementById(
                "mobile"
            ).value.trim();


        const email =
            document.getElementById(
                "email"
            ).value.trim();


        const idType =
            document.getElementById(
                "idType"
            ).value;


        const idNumber =
            document.getElementById(
                "idNumber"
            ).value.trim();



        /* MOBILE VALIDATION */

        if (
            !/^[0-9]{10}$/.test(
                mobile
            )
        ) {

            alert(
                "Please enter a valid 10 digit mobile number."
            );

            return;

        }



        /* AGE VALIDATION */

        if (
            age < 1 ||
            age > 120
        ) {

            alert(
                "Please enter a valid age."
            );

            return;

        }



        /* SAVE PASSENGER DATA */

        const passengerData = {

            fullName:
                fullName,

            age:
                age,

            gender:
                gender,

            mobile:
                mobile,

            email:
                email,

            idType:
                idType,

            idNumber:
                idNumber

        };



        localStorage.setItem(

            "passengerData",

            JSON.stringify(
                passengerData
            )

        );



        /* SAVE FINAL FARE */

        localStorage.setItem(

            "serviceFee",

            serviceFee

        );


        localStorage.setItem(

            "gst",

            gst

        );


        localStorage.setItem(

            "finalTotalFare",

            totalFare

        );



        /* NEXT PAGE */

        window.location.href =
            "payment.html";

    }
);
```
