window.onload = function() {
    // Retrieve input values from storage and set them to the input fields
    let amountFrom = localStorage.getItem('amountFrom');
    let amountTo = localStorage.getItem('amountTo');
    let fromCurrency = localStorage.getItem('fromCurrency');
    let toCurrency = localStorage.getItem('toCurrency');

    // Set input values if found in storage
    if (amountFrom) {
        document.getElementById('amountFrom').value = amountFrom;
    }
    if (amountTo) {
        document.getElementById('amountTo').value = amountTo;
    }

    // Load currencies from storage or default to INR if not found
    fromCurrency = fromCurrency || 'INR';
    toCurrency = toCurrency || 'USD';

    // Set selected currencies in dropdowns
    document.getElementById('fromCurrency').value = fromCurrency;
    document.getElementById('toCurrency').value = toCurrency;
    document.getElementById('amountFrom').addEventListener('input', validateInput);
    document.getElementById('amountTo').addEventListener('input', validateInput);

    // Add event listeners to input fields and dropdowns to trigger conversion
    document.getElementById('amountFrom').addEventListener('input', function() {
        let input = this.value;
        localStorage.setItem('amountFrom', input);
        convert('from');
    });

    document.getElementById('amountTo').addEventListener('input', function() {
        let input = this.value;
        localStorage.setItem('amountTo', input);
        convert('to');
    });

    document.getElementById('fromCurrency').addEventListener('change', function() {
        let selectedCurrency = this.value;
        localStorage.setItem('fromCurrency', selectedCurrency);
        convert('from');
    });

    document.getElementById('toCurrency').addEventListener('change', function() {
        let selectedCurrency = this.value;
        localStorage.setItem('toCurrency', selectedCurrency);
        convert('to');
    });

    // Fetch currencies and populate dropdowns
    fetch('https://api.exchangerate-api.com/v4/latest/INR')
        .then(response => response.json())
        .then(data => {
            let currencies = Object.keys(data.rates);
            populateDropdown('fromCurrency', currencies);
            populateDropdown('toCurrency', currencies);

            // Set selected currencies after options are populated
            document.getElementById('fromCurrency').value = fromCurrency;
            document.getElementById('toCurrency').value = toCurrency;

            convert('from'); // Trigger initial conversion
            fetchLastUpdateTime(); // Fetch last update time
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

// Function to validate input and allow only numbers
function validateInput(event) {
    const input = event.target.value;
    if (!isNumber(input)) {
        event.target.value = input.slice(0, -1);
    }
}

// Function to check if input is a number
function isNumber(value) {
    return /^\d*\.?\d*$/.test(value);
}

// Function to populate dropdown with currencies
function populateDropdown(id, currencies, selectedCurrency) {
    let dropdown = document.getElementById(id);
    dropdown.innerHTML = '';
    currencies.forEach(currency => {
        let option = document.createElement('option');
        option.value = currency;
        option.text = currency;
        if (currency === selectedCurrency) {
            option.selected = true;
        }
        dropdown.appendChild(option);
    });
}

// Function to convert currency based on direction (from or to)
function convert(direction) {
    let amountFrom = parseFloat(document.getElementById('amountFrom').value);
    let fromCurrency = document.getElementById('fromCurrency').value;
    let amountTo = parseFloat(document.getElementById('amountTo').value);
    let toCurrency = document.getElementById('toCurrency').value;


    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            let exchangeRate = data.rates[toCurrency];
            let convertedAmount;

            if (direction === 'from') {
                if (!isNaN(amountFrom)) {
                    convertedAmount = amountFrom * exchangeRate;
                    document.getElementById('amountTo').value = convertedAmount.toFixed(3);
                    localStorage.setItem('amountTo', convertedAmount.toFixed(3)); // Store converted amount
                } else {
                    document.getElementById('amountTo').value = '';
                    localStorage.removeItem('amountTo'); // Clear storage if input is invalid
                }
            } else if (direction === 'to') {
                if (!isNaN(amountTo)) {
                    convertedAmount = amountTo / exchangeRate;
                    document.getElementById('amountFrom').value = convertedAmount.toFixed(3);
                    localStorage.setItem('amountFrom', convertedAmount.toFixed(3)); // Store converted amount
                } else {
                    document.getElementById('amountFrom').value = '';
                    localStorage.removeItem('amountFrom'); // Clear storage if input is invalid
                }
            }

            // Update conversion text
            let conversionTextFrom;
            let conversionTextTo;
            if (direction === 'from') {
                conversionTextFrom = `1 ${fromCurrency} equals`;
                conversionTextTo = ` ${exchangeRate.toFixed(3)} ${toCurrency}`;
            } else if (direction === 'to') {
                conversionTextFrom = `1 ${toCurrency} equals`;
                conversionTextTo = ` ${(1/exchangeRate).toFixed(3)} ${fromCurrency}`;
            }
            document.getElementById('conversionTextFrom').innerText = conversionTextFrom;
            document.getElementById('conversionTextTo').innerText = conversionTextTo;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to fetch last update time and display it
function fetchLastUpdateTime() {
    fetch('https://api.exchangerate-api.com/v4/latest/INR') // Assuming the same API is used for metadata
        .then(response => response.json())
        .then(data => {
            let lastUpdated = new Date(data.time_last_updated * 1000).toLocaleString();
            document.getElementById('lastUpdated').innerText = `${lastUpdated}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}