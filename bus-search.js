
const busCards =
    document.querySelectorAll(".bus-card");

const busCount =
    document.getElementById("busCount");

const noResults =
    document.getElementById("noResults");

const priceRange =
    document.getElementById("priceRange");

const priceValue =
    document.getElementById("priceValue");

const sortSelect =
    document.getElementById("sortSelect");



/* ================= PRICE FILTER ================= */

priceRange.addEventListener("input", function() {

    priceValue.textContent =
        "₹" + this.value;

    applyFilters();

});



/* ================= BUS TYPE FILTER ================= */

const typeFilters =
    document.querySelectorAll(".bus-type-filter");


typeFilters.forEach(function(filter) {

    filter.addEventListener(
        "change",
        applyFilters
    );

});



/* ================= DEPARTURE FILTER ================= */

const departureFilters =
    document.querySelectorAll(
        'input[name="departure"]'
    );


departureFilters.forEach(function(filter) {

    filter.addEventListener(
        "change",
        applyFilters
    );

});



/* ================= APPLY FILTER ================= */

function applyFilters() {

    const selectedTypes = [];

    typeFilters.forEach(function(filter) {

        if (filter.checked) {

            selectedTypes.push(filter.value);

        }

    });


    const selectedDeparture =
        document.querySelector(
            'input[name="departure"]:checked'
        );


    const maxPrice =
        Number(priceRange.value);


    let visibleCount = 0;


    busCards.forEach(function(card) {

        const busType =
            card.dataset.type;

        const price =
            Number(card.dataset.price);

        const departure =
            card.dataset.departure;


        let typeMatch = true;

        let departureMatch = true;

        let priceMatch = true;



        /* BUS TYPE */

        if (selectedTypes.length > 0) {

            typeMatch =
                selectedTypes.some(function(type) {

                    return busType.includes(type);

                });

        }



        /* DEPARTURE */

        if (selectedDeparture) {

            departureMatch =
                departure ===
                selectedDeparture.value;

        }



        /* PRICE */

        priceMatch =
            price <= maxPrice;



        /* FINAL RESULT */

        if (
            typeMatch &&
            departureMatch &&
            priceMatch
        ) {

            card.style.display = "block";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    busCount.textContent =
        visibleCount;


    if (visibleCount === 0) {

        noResults.style.display =
            "block";

    } else {

        noResults.style.display =
            "none";

    }

}



/* ================= CLEAR FILTERS ================= */

function clearFilters() {

    typeFilters.forEach(function(filter) {

        filter.checked = false;

    });


    departureFilters.forEach(function(filter) {

        filter.checked = false;

    });


    priceRange.value = 2000;

    priceValue.textContent = "₹2000";


    applyFilters();

}



/* ================= SORT ================= */

sortSelect.addEventListener(
    "change",
    function() {

        const value =
            this.value;

        const busList =
            document.getElementById(
                "busList"
            );


        const cards =
            Array.from(busCards);


        if (value === "price-low") {

            cards.sort(function(a, b) {

                return Number(
                    a.dataset.price
                ) -
                Number(
                    b.dataset.price
                );

            });

        }


        if (value === "price-high") {

            cards.sort(function(a, b) {

                return Number(
                    b.dataset.price
                ) -
                Number(
                    a.dataset.price
                );

            });

        }


        if (value === "departure") {

            cards.sort(function(a, b) {

                return a.dataset.departure
                    .localeCompare(
                        b.dataset.departure
                    );

            });

        }


        cards.forEach(function(card) {

            busList.appendChild(card);

        });

    }
);



/* ================= SELECT BUS ================= */

function selectBus(
    busName,
    price
) {

    localStorage.setItem(
        "selectedBusName",
        busName
    );


    localStorage.setItem(
        "selectedBusPrice",
        price
    );


    alert(
        `${busName} selected!\n\n` +
        `Starting Fare: ₹${price}\n\n` +
        `Next Step: Select Your Seats`
    );


    /*
    Next Step:

    window.location.href =
        "seat-selection.html";

    */

}



/* ================= MODIFY SEARCH ================= */

function modifySearch() {

    window.location.href =
        "index.html#search";

}
