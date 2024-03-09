window.onload = function() {
    // Retrieve input values from storage and set them to the input fields
    let amountFrom = localStorage.getItem('amountFrom');
    let amountTo = localStorage.getItem('amountTo');
    let fromCurrency = localStorage.getItem('fromCurrency');
    let toCurrency = localStorage.getItem('toCurrency');

    if (amountFrom) {
        document.getElementById('amountFrom').value = amountFrom;
    }
    if (amountTo) {
        document.getElementById('amountTo').value = amountTo;
    }
    if (fromCurrency) {
        document.getElementById('fromCurrency').value = fromCurrency;
    }
    if (toCurrency) {
        document.getElementById('toCurrency').value = toCurrency;
    }

    convert('from');
    convert('to');

    document.getElementById('amountFrom').addEventListener('input',validateInput, function() {
        let input = this.value;
        localStorage.setItem('amountFrom', input);
    });
    document.getElementById('amountTo').addEventListener('input',validateInput, function() {
        let input = this.value;
        localStorage.setItem('amountTo', input);
    });
    document.getElementById('fromCurrency').addEventListener('change', function() {
        let input = this.value;
        localStorage.setItem('fromCurrency', input);
        convert('from');
    });
    document.getElementById('toCurrency').addEventListener('change', function() {
        let input = this.value;
        localStorage.setItem('toCurrency', input);
        convert('to');
    });

    fetch('https://api.exchangerate-api.com/v4/latest/INR')
        .then(response => response.json())
        .then(data => {
            let currencies = Object.keys(data.rates);
            populateDropdown('fromCurrency', currencies);
            populateDropdown('toCurrency', currencies);
            convert('from'); // Trigger initial conversion
            fetchLastUpdateTime(); // Fetch last update time
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function validateInput(event) {
    const input = event.target.value;
    if (!isNumber(input)) {
        event.target.value = input.slice(0, -1);
    }
}

function isNumber(value) {
    return /^\d*\.?\d*$/.test(value);
}

function populateDropdown(id, currencies) {
    let dropdown = document.getElementById(id);
    dropdown.innerHTML = '';
    currencies.forEach(currency => {
        let option = document.createElement('option');
        option.value = currency;
        option.text = currency;
        dropdown.appendChild(option);
    });
}

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
                } else {
                    document.getElementById('amountTo').value = '';
                }
            } else if (direction === 'to') {
                if (!isNaN(amountTo)) {
                    convertedAmount = amountTo / exchangeRate;
                    document.getElementById('amountFrom').value = convertedAmount.toFixed(3);
                } else {
                    document.getElementById('amountFrom').value = '';
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