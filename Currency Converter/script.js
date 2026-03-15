const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.Convertedamount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency'); 
const resultElement = document.querySelector('.result');
const Convertercontainer = document.querySelector('.Converter-container'); 

// Array to populate the select tags
const countries = [
    { code: "USD", name: "United States Dollar" },
    { code: "NPR", name: "Nepali Rupee" },
    { code: "INR", name: "Indian Rupee" },
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "LKR", name: "Sri Lankan Rupee" },
    { code: "MUR", name: "Mauritian Rupee" },
    { code: "SCR", name: "Seychellois Rupee" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "MVR", name: "Maldivian Rufiyaa" },
];

// Populate select options
countries.forEach(country => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');

    option1.value = option2.value = country.code;
    option1.textContent = option2.textContent = `${country.code} (${country.name})`;

    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);
});

// Set default values
fromCurrencyElement.value = "USD";
toCurrencyElement.value = "INR";

//  FIXED: async fetch function
const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;

    if (isNaN(amount)) {
        resultElement.textContent = "Please enter a valid amount.";
        return;
    }

    resultElement.textContent = "Fetching Exchange Rates...";

    try {
        //  Replace with a valid API URL
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
        const data = await response.json();

        const conversionRate = data.rates[toCurrency];
        const convertedAmount = (amount * conversionRate);

        convertedAmountElement.value = convertedAmount;
        resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error(error);
        Convertercontainer.innerHTML = `<h2>Error while fetching exchange rates!!!</h2>`;
    }
};

// Event listeners
fromAmountElement.addEventListener('input', getExchangeRate);
fromCurrencyElement.addEventListener('change', getExchangeRate);
toCurrencyElement.addEventListener('change', getExchangeRate);
window.addEventListener('load', getExchangeRate);
