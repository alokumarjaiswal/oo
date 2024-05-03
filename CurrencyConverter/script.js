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
function populateDropdown(id, currencies) {
    let dropdown = document.getElementById(id);
    dropdown.innerHTML = '';

    // Mapping object for currency codes and their full names
    const currencyNames = {
        'AED': 'United Arab Emirates Dirham',
        'AFN': 'Afghan Afghani',
        'ALL': 'Albanian Lek',
        'AMD': 'Armenian Dram',
        'ANG': 'Netherlands Antillean Guilder',
        'AOA': 'Angolan Kwanza',
        'ARS': 'Argentine Peso',
        'AUD': 'Australian Dollar',
        'AWG': 'Aruban Florin',
        'AZN': 'Azerbaijani Manat',
        'BAM': 'Bosnia-Herzegovina Convertible Mark',
        'BBD': 'Barbadian Dollar',
        'BDT': 'Bangladeshi Taka',
        'BGN': 'Bulgarian Lev',
        'BHD': 'Bahraini Dinar',
        'BIF': 'Burundian Franc',
        'BMD': 'Bermudian Dollar',
        'BND': 'Brunei Dollar',
        'BOB': 'Bolivian Boliviano',
        'BRL': 'Brazilian Real',
        'BSD': 'Bahamian Dollar',
        'BTN': 'Bhutanese Ngultrum',
        'BWP': 'Botswana Pula',
        'BYN': 'Belarusian Ruble',
        'BZD': 'Belize Dollar',
        'CAD': 'Canadian Dollar',
        'CDF': 'Congolese Franc',
        'CHF': 'Swiss Franc',
        'CLP': 'Chilean Peso',
        'CNY': 'Chinese Yuan',
        'COP': 'Colombian Peso',
        'CRC': 'Costa Rican Colón',
        'CUP': 'Cuban Peso',
        'CVE': 'Cape Verdean Escudo',
        'CZK': 'Czech Koruna',
        'DJF': 'Djiboutian Franc',
        'DKK': 'Danish Krone',
        'DOP': 'Dominican Peso',
        'DZD': 'Algerian Dinar',
        'EGP': 'Egyptian Pound',
        'ERN': 'Eritrean Nakfa',
        'ETB': 'Ethiopian Birr',
        'EUR': 'Euro',
        'FJD': 'Fijian Dollar',
        'FKP': 'Falkland Islands Pound',
        'FOK': 'Faroe Islands Króna',
        'GBP': 'British Pound Sterling',
        'GEL': 'Georgian Lari',
        'GGP': 'Guernsey Pound',
        'GHS': 'Ghanaian Cedi',
        'GIP': 'Gibraltar Pound',
        'GMD': 'Gambian Dalasi',
        'GNF': 'Guinean Franc',
        'GTQ': 'Guatemalan Quetzal',
        'GYD': 'Guyanaese Dollar',
        'HKD': 'Hong Kong Dollar',
        'HNL': 'Honduran Lempira',
        'HRK': 'Croatian Kuna',
        'HTG': 'Haitian Gourde',
        'HUF': 'Hungarian Forint',
        'IDR': 'Indonesian Rupiah',
        'ILS': 'Israeli New Shekel',
        'IMP': 'Isle of Man Pound',
        'INR': 'Indian Rupee',
        'IQD': 'Iraqi Dinar',
        'IRR': 'Iranian Rial',
        'ISK': 'Icelandic Króna',
        'JEP': 'Jersey Pound',
        'JMD': 'Jamaican Dollar',
        'JOD': 'Jordanian Dinar',
        'JPY': 'Japanese Yen',
        'KES': 'Kenyan Shilling',
        'KGS': 'Kyrgystani Som',
        'KHR': 'Cambodian Riel',
        'KID': 'Kiribati Dollar',
        'KMF': 'Comorian Franc',
        'KPW': 'North Korean Won',
        'KRW': 'South Korean Won',
        'KWD': 'Kuwaiti Dinar',
        'KYD': 'Cayman Islands Dollar',
        'KZT': 'Kazakhstani Tenge',
        'LAK': 'Laotian Kip',
        'LBP': 'Lebanese Pound',
        'LKR': 'Sri Lankan Rupee',
        'LRD': 'Liberian Dollar',
        'LSL': 'Lesotho Loti',
        'LYD': 'Libyan Dinar',
        'MAD': 'Moroccan Dirham',
        'MDL': 'Moldovan Leu',
        'MGA': 'Malagasy Ariary',
        'MKD': 'Macedonian Denar',
        'MMK': 'Myanmar Kyat',
        'MNT': 'Mongolian Tugrik',
        'MOP': 'Macanese Pataca',
        'MRU': 'Mauritanian Ouguiya',
        'MUR': 'Mauritian Rupee',
        'MVR': 'Maldivian Rufiyaa',
        'MWK': 'Malawian Kwacha',
        'MXN': 'Mexican Peso',
        'MYR': 'Malaysian Ringgit',
        'MZN': 'Mozambican Metical',
        'NAD': 'Namibian Dollar',
        'NGN': 'Nigerian Naira',
        'NIO': 'Nicaraguan Córdoba',
        'NOK': 'Norwegian Krone',
        'NPR': 'Nepalese Rupee',
        'NZD': 'New Zealand Dollar',
        'OMR': 'Omani Rial',
        'PAB': 'Panamanian Balboa',
        'PEN': 'Peruvian Nuevo Sol',
        'PGK': 'Papua New Guinean Kina',
        'PHP': 'Philippine Peso',
        'PKR': 'Pakistani Rupee',
        'PLN': 'Polish Zloty',
        'PYG': 'Paraguayan Guarani',
        'QAR': 'Qatari Rial',
        'RON': 'Romanian Leu',
        'RSD': 'Serbian Dinar',
        'RUB': 'Russian Ruble',
        'RWF': 'Rwandan Franc',
        'SAR': 'Saudi Riyal',
        'SBD': 'Solomon Islands Dollar',
        'SCR': 'Seychellois Rupee',
        'SDG': 'Sudanese Pound',
        'SEK': 'Swedish Krona',
        'SGD': 'Singapore Dollar',
        'SHP': 'Saint Helena Pound',
        'SLL': 'Sierra Leonean Leone',
        'SOS': 'Somali Shilling',
        'SRD': 'Surinamese Dollar',
        'SSP': 'South Sudanese Pound',
        'STN': 'São Tomé and Príncipe Dobra',
        'SYP': 'Syrian Pound',
        'SZL': 'Swazi Lilangeni',
        'THB': 'Thai Baht',
        'TJS': 'Tajikistani Somoni',
        'TMT': 'Turkmenistani Manat',
        'TND': 'Tunisian Dinar',
        'TOP': 'Tongan Paʻanga',
        'TRY': 'Turkish Lira',
        'TTD': 'Trinidad and Tobago Dollar',
        'TVD': 'Tuvaluan Dollar',
        'TWD': 'New Taiwan Dollar',
        'TZS': 'Tanzanian Shilling',
        'UAH': 'Ukrainian Hryvnia',
        'UGX': 'Ugandan Shilling',
        'USD': 'United States Dollar',
        'UYU': 'Uruguayan Peso',
        'UZS': 'Uzbekistan Som',
        'VES': 'Venezuelan Bolívar',
        'VND': 'Vietnamese Dong',
        'VUV': 'Vanuatu Vatu',
        'WST': 'Samoan Tala',
        'XAF': 'CFA Franc BEAC',
        'XCD': 'East Caribbean Dollar',
        'XDR': 'Special Drawing Rights',
        'XOF': 'CFA Franc BCEAO',
        'XPF': 'CFP Franc',
        'YER': 'Yemeni Rial',
        'ZAR': 'South African Rand',
        'ZMW': 'Zambian Kwacha',
        'ZWL': 'Zimbabwean Dollar',
    };

    currencies.forEach(currency => {
        let option = document.createElement('option');
        option.value = currency;
        option.text = currencyNames[currency] || currency;
        dropdown.appendChild(option);
    });
}

// Function to convert currency based on direction (from or to)
function convert(direction) {
    let amountFrom = parseFloat(document.getElementById('amountFrom').value);
    let fromCurrency = document.getElementById('fromCurrency').value;
    let amountTo = parseFloat(document.getElementById('amountTo').value);
    let toCurrency = document.getElementById('toCurrency').value;

    // Mapping object for currency codes and their full names
    const currencyNames = {
        'AED': 'United Arab Emirates Dirham',
        'AFN': 'Afghan Afghani',
        'ALL': 'Albanian Lek',
        'AMD': 'Armenian Dram',
        'ANG': 'Netherlands Antillean Guilder',
        'AOA': 'Angolan Kwanza',
        'ARS': 'Argentine Peso',
        'AUD': 'Australian Dollar',
        'AWG': 'Aruban Florin',
        'AZN': 'Azerbaijani Manat',
        'BAM': 'Bosnia-Herzegovina Convertible Mark',
        'BBD': 'Barbadian Dollar',
        'BDT': 'Bangladeshi Taka',
        'BGN': 'Bulgarian Lev',
        'BHD': 'Bahraini Dinar',
        'BIF': 'Burundian Franc',
        'BMD': 'Bermudian Dollar',
        'BND': 'Brunei Dollar',
        'BOB': 'Bolivian Boliviano',
        'BRL': 'Brazilian Real',
        'BSD': 'Bahamian Dollar',
        'BTN': 'Bhutanese Ngultrum',
        'BWP': 'Botswana Pula',
        'BYN': 'Belarusian Ruble',
        'BZD': 'Belize Dollar',
        'CAD': 'Canadian Dollar',
        'CDF': 'Congolese Franc',
        'CHF': 'Swiss Franc',
        'CLP': 'Chilean Peso',
        'CNY': 'Chinese Yuan',
        'COP': 'Colombian Peso',
        'CRC': 'Costa Rican Colón',
        'CUP': 'Cuban Peso',
        'CVE': 'Cape Verdean Escudo',
        'CZK': 'Czech Koruna',
        'DJF': 'Djiboutian Franc',
        'DKK': 'Danish Krone',
        'DOP': 'Dominican Peso',
        'DZD': 'Algerian Dinar',
        'EGP': 'Egyptian Pound',
        'ERN': 'Eritrean Nakfa',
        'ETB': 'Ethiopian Birr',
        'EUR': 'Euro',
        'FJD': 'Fijian Dollar',
        'FKP': 'Falkland Islands Pound',
        'FOK': 'Faroe Islands Króna',
        'GBP': 'British Pound Sterling',
        'GEL': 'Georgian Lari',
        'GGP': 'Guernsey Pound',
        'GHS': 'Ghanaian Cedi',
        'GIP': 'Gibraltar Pound',
        'GMD': 'Gambian Dalasi',
        'GNF': 'Guinean Franc',
        'GTQ': 'Guatemalan Quetzal',
        'GYD': 'Guyanaese Dollar',
        'HKD': 'Hong Kong Dollar',
        'HNL': 'Honduran Lempira',
        'HRK': 'Croatian Kuna',
        'HTG': 'Haitian Gourde',
        'HUF': 'Hungarian Forint',
        'IDR': 'Indonesian Rupiah',
        'ILS': 'Israeli New Shekel',
        'IMP': 'Isle of Man Pound',
        'INR': 'Indian Rupee',
        'IQD': 'Iraqi Dinar',
        'IRR': 'Iranian Rial',
        'ISK': 'Icelandic Króna',
        'JEP': 'Jersey Pound',
        'JMD': 'Jamaican Dollar',
        'JOD': 'Jordanian Dinar',
        'JPY': 'Japanese Yen',
        'KES': 'Kenyan Shilling',
        'KGS': 'Kyrgystani Som',
        'KHR': 'Cambodian Riel',
        'KID': 'Kiribati Dollar',
        'KMF': 'Comorian Franc',
        'KPW': 'North Korean Won',
        'KRW': 'South Korean Won',
        'KWD': 'Kuwaiti Dinar',
        'KYD': 'Cayman Islands Dollar',
        'KZT': 'Kazakhstani Tenge',
        'LAK': 'Laotian Kip',
        'LBP': 'Lebanese Pound',
        'LKR': 'Sri Lankan Rupee',
        'LRD': 'Liberian Dollar',
        'LSL': 'Lesotho Loti',
        'LYD': 'Libyan Dinar',
        'MAD': 'Moroccan Dirham',
        'MDL': 'Moldovan Leu',
        'MGA': 'Malagasy Ariary',
        'MKD': 'Macedonian Denar',
        'MMK': 'Myanmar Kyat',
        'MNT': 'Mongolian Tugrik',
        'MOP': 'Macanese Pataca',
        'MRU': 'Mauritanian Ouguiya',
        'MUR': 'Mauritian Rupee',
        'MVR': 'Maldivian Rufiyaa',
        'MWK': 'Malawian Kwacha',
        'MXN': 'Mexican Peso',
        'MYR': 'Malaysian Ringgit',
        'MZN': 'Mozambican Metical',
        'NAD': 'Namibian Dollar',
        'NGN': 'Nigerian Naira',
        'NIO': 'Nicaraguan Córdoba',
        'NOK': 'Norwegian Krone',
        'NPR': 'Nepalese Rupee',
        'NZD': 'New Zealand Dollar',
        'OMR': 'Omani Rial',
        'PAB': 'Panamanian Balboa',
        'PEN': 'Peruvian Nuevo Sol',
        'PGK': 'Papua New Guinean Kina',
        'PHP': 'Philippine Peso',
        'PKR': 'Pakistani Rupee',
        'PLN': 'Polish Zloty',
        'PYG': 'Paraguayan Guarani',
        'QAR': 'Qatari Rial',
        'RON': 'Romanian Leu',
        'RSD': 'Serbian Dinar',
        'RUB': 'Russian Ruble',
        'RWF': 'Rwandan Franc',
        'SAR': 'Saudi Riyal',
        'SBD': 'Solomon Islands Dollar',
        'SCR': 'Seychellois Rupee',
        'SDG': 'Sudanese Pound',
        'SEK': 'Swedish Krona',
        'SGD': 'Singapore Dollar',
        'SHP': 'Saint Helena Pound',
        'SLL': 'Sierra Leonean Leone',
        'SOS': 'Somali Shilling',
        'SRD': 'Surinamese Dollar',
        'SSP': 'South Sudanese Pound',
        'STN': 'São Tomé and Príncipe Dobra',
        'SYP': 'Syrian Pound',
        'SZL': 'Swazi Lilangeni',
        'THB': 'Thai Baht',
        'TJS': 'Tajikistani Somoni',
        'TMT': 'Turkmenistani Manat',
        'TND': 'Tunisian Dinar',
        'TOP': 'Tongan Paʻanga',
        'TRY': 'Turkish Lira',
        'TTD': 'Trinidad and Tobago Dollar',
        'TVD': 'Tuvaluan Dollar',
        'TWD': 'New Taiwan Dollar',
        'TZS': 'Tanzanian Shilling',
        'UAH': 'Ukrainian Hryvnia',
        'UGX': 'Ugandan Shilling',
        'USD': 'United States Dollar',
        'UYU': 'Uruguayan Peso',
        'UZS': 'Uzbekistan Som',
        'VES': 'Venezuelan Bolívar',
        'VND': 'Vietnamese Dong',
        'VUV': 'Vanuatu Vatu',
        'WST': 'Samoan Tala',
        'XAF': 'CFA Franc BEAC',
        'XCD': 'East Caribbean Dollar',
        'XDR': 'Special Drawing Rights',
        'XOF': 'CFA Franc BCEAO',
        'XPF': 'CFP Franc',
        'YER': 'Yemeni Rial',
        'ZAR': 'South African Rand',
        'ZMW': 'Zambian Kwacha',
        'ZWL': 'Zimbabwean Dollar',
    };


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

            // Get full currency names
            let fromCurrencyName = currencyNames[fromCurrency];
            let toCurrencyName = currencyNames[toCurrency];

            // Update conversion text
            let conversionTextFrom;
            let conversionTextTo;
            if (direction === 'from') {
                conversionTextFrom = `1 ${fromCurrencyName} equals`;
                conversionTextTo = ` ${exchangeRate.toFixed(3)} ${toCurrencyName}`;
            } else if (direction === 'to') {
                conversionTextFrom = `1 ${toCurrencyName} equals`;
                conversionTextTo = ` ${(1/exchangeRate).toFixed(3)} ${fromCurrencyName}`;
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