// Select DOM elements
const btn = document.querySelector(".action-btn");
const table = document.querySelector(".order-table");
const sumBtn = document.querySelector(".sum");
const clearBtn = document.querySelector(".clear");
const forwardBtn = document.querySelector(".forward");
const backwardBtn = document.querySelector(".backward");
const slider = document.querySelector(".slider");
const sumLabel = document.querySelector(".sum-lab");

// State variables
let sliderNum = 0;

// Helper to show alert
function showAlert(message) {
    alert(message);
}

/**
 * Adds order information to the table.
 */
function addInfo() {
    // Get values from the current slider view
    const personFirst = document.querySelector(".person-first").value;
    const personSecond = document.querySelector(".person-second").value;
    const personThird = document.querySelector(".person-third").value;

    const priceFirst = document.querySelector(".prix-first").value;
    const priceSecond = document.querySelector(".prix-second").value;
    const priceThird = document.querySelector(".prix-third").value;

    const optFirst = document.querySelector("#first-opt");
    const textFirst = optFirst.options[optFirst.selectedIndex].text;

    const optSecond = document.querySelector("#second-opt");
    const textSecond = optSecond.options[optSecond.selectedIndex].text;

    const optThird = document.querySelector("#third-opt");
    const textThird = optThird.options[optThird.selectedIndex].text;

    // Validation logic
    // Checks if the inputs for the currently visible slider are empty
    let isValid = true;
    if (sliderNum === 0 && (personFirst === "" || priceFirst === "")) isValid = false;
    if (sliderNum === 1 && (personSecond === "" || priceSecond === "")) isValid = false;
    if (sliderNum === 2 && (personThird === "" || priceThird === "")) isValid = false;

    if (!isValid) {
        showAlert("Error: Please fill in all fields.");
    } else {
        table.style.display = "table"; // Changed to table for better display
        sumBtn.style.display = "inline-block";

        const newRow = table.insertRow();
        const cellNo = newRow.insertCell(0);
        const cellType = newRow.insertCell(1);
        const cellQty = newRow.insertCell(2);
        const cellPrice = newRow.insertCell(3);

        // Set Order No. based on current row count (excluding header)
        cellNo.innerHTML = table.rows.length - 1;

        switch (sliderNum) {
            case 0:
                cellType.innerHTML = textFirst;
                cellQty.innerHTML = personFirst;
                cellPrice.innerHTML = priceFirst;
                break;
            case 1:
                cellType.innerHTML = textSecond;
                cellQty.innerHTML = personSecond;
                cellPrice.innerHTML = priceSecond;
                break;
            case 2:
                cellType.innerHTML = textThird;
                cellQty.innerHTML = personThird;
                cellPrice.innerHTML = priceThird;
                break;
        }
    }
}

/**
 * Calculates and displays the sum of prices in the table.
 */
function calculateSum() {
    let totalSum = 0;
    // Start from 1 to skip header row
    for (let i = 1; i < table.rows.length; i++) {
        const price = parseInt(table.rows[i].cells[3].innerHTML);
        if (!isNaN(price)) {
            totalSum += price;
        }
    }
    sumLabel.innerHTML = "Sum = " + totalSum;
}

/**
 * Clears the table and resets the sum.
 */
function clearTable() {
    // Remove all rows except the header
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    sumLabel.innerHTML = "";
    table.style.display = "none";
    sumBtn.style.display = "none";
}

/**
 * Moves the slider forward.
 */
function goForward() {
    // Hide current
    slider.children[sliderNum].classList.remove("active");

    // Increment or loop
    if (sliderNum === 2) {
        sliderNum = 0;
    } else {
        sliderNum++;
    }

    // Show new
    slider.children[sliderNum].classList.add("active");
}

/**
 * Moves the slider backward.
 */
function goBackward() {
    // Hide current
    slider.children[sliderNum].classList.remove("active");

    // Decrement or loop
    if (sliderNum === 0) {
        sliderNum = 2;
    } else {
        sliderNum--;
    }

    // Show new
    slider.children[sliderNum].classList.add("active");
}

// Event Listeners
btn.addEventListener("click", addInfo);
sumBtn.addEventListener("click", calculateSum);
clearBtn.addEventListener("click", clearTable);
forwardBtn.addEventListener("click", goForward);
backwardBtn.addEventListener("click", goBackward);
