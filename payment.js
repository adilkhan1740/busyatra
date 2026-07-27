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


const serviceFee =
    Number(
        localStorage.getItem(
            "serviceFee"
        )
    ) || 20;


const gst =
    Number(
        localStorage.getItem(
            "gst"
        )
    ) ||
    Math.round(
        (seatFare + serviceFee)
        * 0.05
    );


let discount = 0;


let totalAmount =
    seatFare
    + serviceFee
    + gst;



/* ================= ELEMENTS ================= */

const paymentMethods =
    document.querySelectorAll(
        ".payment-method"
    );


const paymentForms =
    document.querySelectorAll(
        ".payment-form"
    );


const totalAmountElement =
    document.getElementById(
        "totalAmount"
    );


const payBtn =
    document.getElementById(
        "payBtn"
    );


const couponCode =
    document.getElementById(
        "couponCode"
    );


const applyCoupon =
    document.getElementById(
        "applyCoupon"
    );


const couponMessage =
    document.getElementById(
        "couponMessage"
    );


const discountElement =
    document.getElementById(
        "discount"
    );



/* ================= UPDATE SUMMARY ================= */

document.getElementById(
    "busName"
).textContent =
    selectedBus;


document.getElementById(
    "selectedSeats"
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



/* ================= UPDATE TOTAL ================= */

function updateTotal() {

    totalAmount =
        seatFare
        + serviceFee
        + gst
        - discount;


    if (totalAmount < 0) {

        totalAmount = 0;

    }


    totalAmountElement.textContent =
        "₹" + totalAmount;


    payBtn.querySelector(
        "span"
    ).textContent =
        "Pay ₹" + totalAmount;

}



/* ================= PAYMENT METHOD ================= */

paymentMethods.forEach(
    function(method) {

        method.addEventListener(
            "click",
            function() {


                /* REMOVE ACTIVE */

                paymentMethods.forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                paymentForms.forEach(
                    function(form) {

                        form.classList.remove(
                            "active-form"
                        );

                    }
                );



                /* ADD ACTIVE */

                this.classList.add(
                    "active"
                );


                const selectedMethod =
                    this.dataset.method;


                const selectedForm =
                    document.getElementById(
                        selectedMethod
                        + "Form"
                    );


                if (selectedForm) {

                    selectedForm.classList.add(
                        "active-form"
                    );

                }

            }
        );

    }
);



/* ================= COUPON ================= */

applyCoupon.addEventListener(
    "click",
    function() {


        const code =
            couponCode.value
                .trim()
                .toUpperCase();



        if (code === "BUS50") {


            if (discount > 0) {

                couponMessage.textContent =
                    "Coupon already applied.";

                return;

            }


            discount = 50;


            discountElement.textContent =
                "-₹50";


            couponMessage.textContent =
                "Coupon applied! You saved ₹50.";


            couponMessage.style.color =
                "#16803c";


            updateTotal();


        }


        else if (code === "") {

            couponMessage.textContent =
                "Please enter a coupon code.";


            couponMessage.style.color =
                "#e63946";

        }


        else {

            couponMessage.textContent =
                "Invalid coupon code.";


            couponMessage.style.color =
                "#e63946";

        }

    }
);



/* ================= CARD NUMBER ================= */

const cardNumber =
    document.getElementById(
        "cardNumber"
    );


cardNumber.addEventListener(
    "input",
    function() {

        let value =
            this.value
                .replace(/\D/g, "")
                .substring(0, 16);


        let formatted =
            value.match(/.{1,4}/g);


        this.value =
            formatted
                ? formatted.join(" ")
                : "";

    }
);



/* ================= EXPIRY ================= */

const expiry =
    document.getElementById(
        "expiry"
    );


expiry.addEventListener(
    "input",
    function() {

        let value =
            this.value
                .replace(/\D/g, "")
                .substring(0, 4);


        if (value.length >= 3) {

            this.value =
                value.substring(0, 2)
                + "/"
                + value.substring(2);

        } else {

            this.value =
                value;

        }

    }
);



/* ================= VALIDATE PAYMENT ================= */

function validatePayment() {


    const activeMethod =
        document.querySelector(
            ".payment-method.active"
        );


    const method =
        activeMethod.dataset.method;



    /* UPI */

    if (method === "upi") {

        const upi =
            document.getElementById(
                "upiId"
            ).value.trim();


        if (
            !upi ||
            !upi.includes("@")
        ) {

            alert(
                "Please enter a valid UPI ID."
            );

            return false;

        }

    }



    /* CARD */

    if (method === "card") {

        const number =
            cardNumber.value
                .replace(/\s/g, "");


        const expiryValue =
            expiry.value;


        const cvv =
            document.getElementById(
                "cvv"
            ).value;


        const holder =
            document.getElementById(
                "cardHolder"
            ).value.trim();



        if (
            number.length !== 16
        ) {

            alert(
                "Please enter a valid 16 digit card number."
            );

            return false;

        }


        if (
            !/^\d{2}\/\d{2}$/.test(
                expiryValue
            )
        ) {

            alert(
                "Please enter a valid expiry date."
            );

            return false;

        }


        if (
            cvv.length !== 3
        ) {

            alert(
                "Please enter a valid CVV."
            );

            return false;

        }


        if (!holder) {

            alert(
                "Please enter card holder name."
            );

            return false;

        }

    }



    /* NET BANKING */

    if (method === "netbanking") {

        const bank =
            document.getElementById(
                "bank"
            ).value;


        if (!bank) {

            alert(
                "Please select your bank."
            );

            return false;

        }

    }



    /* WALLET */

    if (method === "wallet") {

        const wallet =
            document.querySelector(
                'input[name="wallet"]:checked'
            );


        if (!wallet) {

            alert(
                "Please select a wallet."
            );

            return false;

        }

    }


    return true;

}



/* ================= PAY NOW ================= */

payBtn.addEventListener(
    "click",
    function() {


        if (
            !validatePayment()
        ) {

            return;

        }



        /* GENERATE DEMO PAYMENT ID */

        const paymentId =
            "PAY"
            + Date.now();



        /* SAVE PAYMENT DATA */

        const paymentData = {

            paymentId:
                paymentId,

            paymentMethod:
                document.querySelector(
                    ".payment-method.active"
                ).dataset.method,

            amount:
                totalAmount,

            discount:
                discount,

            status:
                "Success"

        };



        localStorage.setItem(

            "paymentData",

            JSON.stringify(
                paymentData
            )

        );



        localStorage.setItem(

            "finalTotalFare",

            totalAmount

        );



        /* NEXT PAGE */

        window.location.href =
            "booking-success.html";

    }
);



/* ================= INITIAL TOTAL ================= */

updateTotal();
```
