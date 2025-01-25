const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll("select");
const amount = document.querySelector("#input-amount");
const convert = document.querySelector("#convert-btn")

for (const select of dropdowns) {
    for (const currCode in countrylist) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.id === "from-currency" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.id === "to-currency" && currCode === "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (select) => {
    const currencyCode = select.value;
    const countryCode = countrylist[currencyCode];
    const flagImage = select.previousElementSibling;
    flagImage.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

const updateRate = async () => {
    try {
        let amountValue = amount.value;
        if (amountValue === "" || amountValue < 1 || isNaN(amountValue)) {
            amountValue = 1;
            amount.value = "1";
        }
        const fromCurrency = document.querySelector("#from-currency").value.toLowerCase();
        const toCurrency = document.querySelector("#to-currency").value.toLowerCase();

        const response = await fetch(`${BASE_URL}/${fromCurrency}.json`);
        const data = await response.json();
        const rate = amountValue * data[fromCurrency][toCurrency];

        // Update date display
        const dateDisplay = document.querySelector(".date");
        const [year, month, day] = data.date.split("-");
        dateDisplay.innerText = `Last updated on ${day} ${monthlist[month-1]} ${year}`;

        // Update exchange rate display
        const exchangeRate = document.querySelector("#exchange-rate");
        exchangeRate.innerText = `${amountValue} ${fromCurrency.toUpperCase()} = ${rate} ${toCurrency.toUpperCase()}`;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
    }
};

convert.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateRate();
});

window.addEventListener("load", ()=>{
    updateRate();
});

// Swap functionality
const swapIcon = document.querySelector("svg");
let isRotated = false;

const swapCurrencies = () => {
    // Toggle rotation
    isRotated = !isRotated;
    swapIcon.style.transform = `rotate(${isRotated ? 180 : 0}deg)`;

    // Swap currency values
    const fromCurrencySelect = document.querySelector("#from-currency");
    const toCurrencySelect = document.querySelector("#to-currency");
    const tempValue = fromCurrencySelect.value;
    
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = tempValue;

    // Update flags
    updateFlag(fromCurrencySelect);
    updateFlag(toCurrencySelect);
    updateRate();
};

swapIcon.addEventListener("click", swapCurrencies);

