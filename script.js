const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll("select");
const amount = document.querySelector("#input-amount");
const convert = document.querySelector("#convert-btn")

for (let select of dropdowns) {
    for (currCode in countrylist) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.id === "from-currency" && currCode === "USD") {
            newOption.selected = "selected";
        }
        
        else if (select.id === "to-currency" && currCode === "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (select) =>{
    const currency_code = select.value;
    const country_code = countrylist[currency_code];
    const image = select.previousElementSibling
    image.src=`https://flagsapi.com/${country_code}/flat/64.png`;
}

const updateRate = async() =>{
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    console.log(amtVal);
    fromcurr = document.querySelector("#from-currency").value.toLowerCase();
    tocurr = document.querySelector("#to-currency").value.toLowerCase();

    const URL = `${BASE_URL}/${fromcurr}.json`
    const response = await fetch(URL);
    const data = await response.json();
    const rate = amtVal *data[fromcurr][tocurr];

    const date = document.querySelector(".date");
    const date_ = data.date;
    day = date_.split("-")[2];
    month = date_.split("-")[1];
    year = date_.split("-")[0];
    console.log(day,month,year);
    date.innerText = `Last updated on ${day} ${monthlist[month-1]} ${year}`;

    const exchange_rate = document.querySelector("#exchange-rate");
    exchange_rate.innerText = `${amtVal} ${fromcurr.toUpperCase()} = ${rate} ${tocurr.toUpperCase()}`
}

convert.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateRate();
});

window.addEventListener("load", ()=>{
    updateRate();
});

// Add rotation functionality for the swap icon
const swapIcon = document.querySelector("svg");
let isRotated = false;

swapIcon.addEventListener("click", () => {
    if (isRotated) {
        swapIcon.style.transform = "rotate(0deg)";
        isRotated = false;
        fromcurr = document.querySelector("#from-currency").value;
        tocurr = document.querySelector("#to-currency").value;
        document.querySelector("#from-currency").value = tocurr;
        document.querySelector("#to-currency").value = fromcurr;
        updateFlag(document.querySelector("#from-currency"));
        updateFlag(document.querySelector("#to-currency"));
    } else {
        swapIcon.style.transform = "rotate(180deg)";
        isRotated = true;
        fromcurr = document.querySelector("#from-currency").value;
        tocurr = document.querySelector("#to-currency").value;
        document.querySelector("#from-currency").value = tocurr;
        document.querySelector("#to-currency").value = fromcurr;
        updateFlag(document.querySelector("#from-currency"));
        updateFlag(document.querySelector("#to-currency"));
    }
});

