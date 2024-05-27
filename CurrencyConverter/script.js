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

    // Validate input fields to allow only numbers
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

    // Mapping object for currency codes and their full names and symbols
    const currencyNames = {
        'AED': { name: 'United Arab Emirates Dirham', symbol: 'د.إ' },
        'AFN': { name: 'Afghan Afghani', symbol: '؋' },
        'ALL': { name: 'Albanian Lek', symbol: 'L' },
        'AMD': { name: 'Armenian Dram', symbol: '֏' },
        'ANG': { name: 'Netherlands Antillean Guilder', symbol: 'ƒ' },
        'AOA': { name: 'Angolan Kwanza', symbol: 'Kz' },
        'ARS': { name: 'Argentine Peso', symbol: '$' },
        'AUD': { name: 'Australian Dollar', symbol: '$' },
        'AWG': { name: 'Aruban Florin', symbol: 'ƒ' },
        'AZN': { name: 'Azerbaijani Manat', symbol: '₼' },
        'BAM': { name: 'Bosnia-Herzegovina Convertible Mark', symbol: 'KM' },
        'BBD': { name: 'Barbadian Dollar', symbol: '$' },
        'BDT': { name: 'Bangladeshi Taka', symbol: '৳' },
        'BGN': { name: 'Bulgarian Lev', symbol: 'лв' },
        'BHD': { name: 'Bahraini Dinar', symbol: 'ب.د' },
        'BIF': { name: 'Burundian Franc', symbol: 'FBu' },
        'BMD': { name: 'Bermudian Dollar', symbol: '$' },
        'BND': { name: 'Brunei Dollar', symbol: '$' },
        'BOB': { name: 'Bolivian Boliviano', symbol: 'Bs.' },
        'BRL': { name: 'Brazilian Real', symbol: 'R$' },
        'BSD': { name: 'Bahamian Dollar', symbol: '$' },
        'BTN': { name: 'Bhutanese Ngultrum', symbol: 'Nu.' },
        'BWP': { name: 'Botswana Pula', symbol: 'P' },
        'BYN': { name: 'Belarusian Ruble', symbol: 'Br' },
        'BZD': { name: 'Belize Dollar', symbol: 'BZ$' },
        'CAD': { name: 'Canadian Dollar', symbol: '$' },
        'CDF': { name: 'Congolese Franc', symbol: 'FC' },
        'CHF': { name: 'Swiss Franc', symbol: 'CHF' },
        'CLP': { name: 'Chilean Peso', symbol: '$' },
        'CNY': { name: 'Chinese Yuan', symbol: '¥' },
        'COP': { name: 'Colombian Peso', symbol: '$' },
        'CRC': { name: 'Costa Rican Colón', symbol: '₡' },
        'CUP': { name: 'Cuban Peso', symbol: '₱' },
        'CVE': { name: 'Cape Verdean Escudo', symbol: 'Esc' },
        'CZK': { name: 'Czech Koruna', symbol: 'Kč' },
        'DJF': { name: 'Djiboutian Franc', symbol: 'Fdj' },
        'DKK': { name: 'Danish Krone', symbol: 'kr' },
        'DOP': { name: 'Dominican Peso', symbol: 'RD$' },
        'DZD': { name: 'Algerian Dinar', symbol: 'د.ج' },
        'EGP': { name: 'Egyptian Pound', symbol: '£' },
        'ERN': { name: 'Eritrean Nakfa', symbol: 'Nfk' },
        'ETB': { name: 'Ethiopian Birr', symbol: 'Br' },
        'EUR': { name: 'Euro', symbol: '€' },
        'FJD': { name: 'Fijian Dollar', symbol: 'FJ$' },
        'FKP': { name: 'Falkland Islands Pound', symbol: '£' },
        'FOK': { name: 'Faroe Islands Króna', symbol: 'kr' },
        'GBP': { name: 'British Pound Sterling', symbol: '£' },
        'GEL': { name: 'Georgian Lari', symbol: '₾' },
        'GGP': { name: 'Guernsey Pound', symbol: '£' },
        'GHS': { name: 'Ghanaian Cedi', symbol: '₵' },
        'GIP': { name: 'Gibraltar Pound', symbol: '£' },
        'GMD': { name: 'Gambian Dalasi', symbol: 'D' },
        'GNF': { name: 'Guinean Franc', symbol: 'FG' },
        'GTQ': { name: 'Guatemalan Quetzal', symbol: 'Q' },
        'GYD': { name: 'Guyanaese Dollar', symbol: '$' },
        'HKD': { name: 'Hong Kong Dollar', symbol: '$' },
        'HNL': { name: 'Honduran Lempira', symbol: 'L' },
        'HRK': { name: 'Croatian Kuna', symbol: 'kn' },
        'HTG': { name: 'Haitian Gourde', symbol: 'G' },
        'HUF': { name: 'Hungarian Forint', symbol: 'Ft' },
        'IDR': { name: 'Indonesian Rupiah', symbol: 'Rp' },
        'ILS': { name: 'Israeli New Shekel', symbol: '₪' },
        'IMP': { name: 'Isle of Man Pound', symbol: '£' },
        'INR': { name: 'Indian Rupee', symbol: '₹' },
        'IQD': { name: 'Iraqi Dinar', symbol: 'ع.د' },
        'IRR': { name: 'Iranian Rial', symbol: '﷼' },
        'ISK': { name: 'Icelandic Króna', symbol: 'kr' },
        'JEP': { name: 'Jersey Pound', symbol: '£' },
        'JMD': { name: 'Jamaican Dollar', symbol: 'J$' },
        'JOD': { name: 'Jordanian Dinar', symbol: 'د.ا' },
        'JPY': { name: 'Japanese Yen', symbol: '¥' },
        'KES': { name: 'Kenyan Shilling', symbol: 'KSh' },
        'KGS': { name: 'Kyrgystani Som', symbol: 'с' },
        'KHR': { name: 'Cambodian Riel', symbol: '៛' },
        'KID': { name: 'Kiribati Dollar', symbol: '$' },
        'KMF': { name: 'Comorian Franc', symbol: 'CF' },
        'KPW': { name: 'North Korean Won', symbol: '₩' },
        'KRW': { name: 'South Korean Won', symbol: '₩' },
        'KWD': { name: 'Kuwaiti Dinar', symbol: 'د.ك' },
        'KYD': { name: 'Cayman Islands Dollar', symbol: '$' },
        'KZT': { name: 'Kazakhstani Tenge', symbol: '₸' },
        'LAK': { name: 'Laotian Kip', symbol: '₭' },
        'LBP': { name: 'Lebanese Pound', symbol: 'ل.ل' },
        'LKR': { name: 'Sri Lankan Rupee', symbol: '₨' },
        'LRD': { name: 'Liberian Dollar', symbol: '$' },
        'LSL': { name: 'Lesotho Loti', symbol: 'L' },
        'LYD': { name: 'Libyan Dinar', symbol: 'ل.د' },
        'MAD': { name: 'Moroccan Dirham', symbol: 'د.م.' },
        'MDL': { name: 'Moldovan Leu', symbol: 'L' },
        'MGA': { name: 'Malagasy Ariary', symbol: 'Ar' },
        'MKD': { name: 'Macedonian Denar', symbol: 'ден' },
        'MMK': { name: 'Myanmar Kyat', symbol: 'Ks' },
        'MNT': { name: 'Mongolian Tugrik', symbol: '₮' },
        'MOP': { name: 'Macanese Pataca', symbol: 'MOP$' },
        'MRU': { name: 'Mauritanian Ouguiya', symbol: 'UM' },
        'MUR': { name: 'Mauritian Rupee', symbol: '₨' },
        'MVR': { name: 'Maldivian Rufiyaa', symbol: 'Rf' },
        'MWK': { name: 'Malawian Kwacha', symbol: 'MK' },
        'MXN': { name: 'Mexican Peso', symbol: '$' },
        'MYR': { name: 'Malaysian Ringgit', symbol: 'RM' },
        'MZN': { name: 'Mozambican Metical', symbol: 'MT' },
        'NAD': { name: 'Namibian Dollar', symbol: '$' },
        'NGN': { name: 'Nigerian Naira', symbol: '₦' },
        'NIO': { name: 'Nicaraguan Córdoba', symbol: 'C$' },
        'NOK': { name: 'Norwegian Krone', symbol: 'kr' },
        'NPR': { name: 'Nepalese Rupee', symbol: '₨' },
        'NZD': { name: 'New Zealand Dollar', symbol: '$' },
        'OMR': { name: 'Omani Rial', symbol: 'ر.ع.' },
        'PAB': { name: 'Panamanian Balboa', symbol: 'B/.' },
        'PEN': { name: 'Peruvian Nuevo Sol', symbol: 'S/.' },
        'PGK': { name: 'Papua New Guinean Kina', symbol: 'K' },
        'PHP': { name: 'Philippine Peso', symbol: '₱' },
        'PKR': { name: 'Pakistani Rupee', symbol: '₨' },
        'PLN': { name: 'Polish Zloty', symbol: 'zł' },
        'PYG': { name: 'Paraguayan Guarani', symbol: '₲' },
        'QAR': { name: 'Qatari Rial', symbol: 'ر.ق' },
        'RON': { name: 'Romanian Leu', symbol: 'lei' },
        'RSD': { name: 'Serbian Dinar', symbol: 'дин.' },
        'RUB': { name: 'Russian Ruble', symbol: '₽' },
        'RWF': { name: 'Rwandan Franc', symbol: 'FRw' },
        'SAR': { name: 'Saudi Riyal', symbol: 'ر.س' },
        'SBD': { name: 'Solomon Islands Dollar', symbol: '$' },
        'SCR': { name: 'Seychellois Rupee', symbol: '₨' },
        'SDG': { name: 'Sudanese Pound', symbol: '£' },
        'SEK': { name: 'Swedish Krona', symbol: 'kr' },
        'SGD': { name: 'Singapore Dollar', symbol: '$' },
        'SHP': { name: 'Saint Helena Pound', symbol: '£' },
        'SLL': { name: 'Sierra Leonean Leone', symbol: 'Le' },
        'SOS': { name: 'Somali Shilling', symbol: 'S' },
        'SRD': { name: 'Surinamese Dollar', symbol: '$' },
        'SSP': { name: 'South Sudanese Pound', symbol: '£' },
        'STN': { name: 'São Tomé and Príncipe Dobra', symbol: 'Db' },
        'SYP': { name: 'Syrian Pound', symbol: '£' },
        'SZL': { name: 'Swazi Lilangeni', symbol: 'E' },
        'THB': { name: 'Thai Baht', symbol: '฿' },
        'TJS': { name: 'Tajikistani Somoni', symbol: 'ЅМ' },
        'TMT': { name: 'Turkmenistani Manat', symbol: 'm' },
        'TND': { name: 'Tunisian Dinar', symbol: 'د.ت' },
        'TOP': { name: 'Tongan Paʻanga', symbol: 'T$' },
        'TRY': { name: 'Turkish Lira', symbol: '₺' },
        'TTD': { name: 'Trinidad and Tobago Dollar', symbol: 'TT$' },
        'TVD': { name: 'Tuvaluan Dollar', symbol: '$' },
        'TWD': { name: 'New Taiwan Dollar', symbol: 'NT$' },
        'TZS': { name: 'Tanzanian Shilling', symbol: 'TSh' },
        'UAH': { name: 'Ukrainian Hryvnia', symbol: '₴' },
        'UGX': { name: 'Ugandan Shilling', symbol: 'USh' },
        'USD': { name: 'United States Dollar', symbol: '$' },
        'UYU': { name: 'Uruguayan Peso', symbol: '$U' },
        'UZS': { name: 'Uzbekistan Som', symbol: 'soʻm' },
        'VES': { name: 'Venezuelan Bolívar', symbol: 'Bs.S.' },
        'VND': { name: 'Vietnamese Dong', symbol: '₫' },
        'VUV': { name: 'Vanuatu Vatu', symbol: 'VT' },
        'WST': { name: 'Samoan Tala', symbol: 'WS$' },
        'XAF': { name: 'CFA Franc BEAC', symbol: 'FCFA' },
        'XCD': { name: 'East Caribbean Dollar', symbol: '$' },
        'XDR': { name: 'Special Drawing Rights', symbol: 'SDR' },
        'XOF': { name: 'CFA Franc BCEAO', symbol: 'CFA' },
        'XPF': { name: 'CFP Franc', symbol: '₣' },
        'YER': { name: 'Yemeni Rial', symbol: '﷼' },
        'ZAR': { name: 'South African Rand', symbol: 'R' },
        'ZMW': { name: 'Zambian Kwacha', symbol: 'ZK' },
        'ZWL': { name: 'Zimbabwean Dollar', symbol: '$' },
    };

    currencies.forEach(currency => {
        let option = document.createElement('option');
        option.value = currency;
        option.text = `${currency} - ${currencyNames[currency].name} (${currencyNames[currency].symbol})`;
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
        'AED': { name: 'United Arab Emirates Dirham', symbol: 'د.إ' },
        'AFN': { name: 'Afghan Afghani', symbol: '؋' },
        'ALL': { name: 'Albanian Lek', symbol: 'L' },
        'AMD': { name: 'Armenian Dram', symbol: '֏' },
        'ANG': { name: 'Netherlands Antillean Guilder', symbol: 'ƒ' },
        'AOA': { name: 'Angolan Kwanza', symbol: 'Kz' },
        'ARS': { name: 'Argentine Peso', symbol: '$' },
        'AUD': { name: 'Australian Dollar', symbol: '$' },
        'AWG': { name: 'Aruban Florin', symbol: 'ƒ' },
        'AZN': { name: 'Azerbaijani Manat', symbol: '₼' },
        'BAM': { name: 'Bosnia-Herzegovina Convertible Mark', symbol: 'KM' },
        'BBD': { name: 'Barbadian Dollar', symbol: '$' },
        'BDT': { name: 'Bangladeshi Taka', symbol: '৳' },
        'BGN': { name: 'Bulgarian Lev', symbol: 'лв' },
        'BHD': { name: 'Bahraini Dinar', symbol: 'ب.د' },
        'BIF': { name: 'Burundian Franc', symbol: 'FBu' },
        'BMD': { name: 'Bermudian Dollar', symbol: '$' },
        'BND': { name: 'Brunei Dollar', symbol: '$' },
        'BOB': { name: 'Bolivian Boliviano', symbol: 'Bs.' },
        'BRL': { name: 'Brazilian Real', symbol: 'R$' },
        'BSD': { name: 'Bahamian Dollar', symbol: '$' },
        'BTN': { name: 'Bhutanese Ngultrum', symbol: 'Nu.' },
        'BWP': { name: 'Botswana Pula', symbol: 'P' },
        'BYN': { name: 'Belarusian Ruble', symbol: 'Br' },
        'BZD': { name: 'Belize Dollar', symbol: 'BZ$' },
        'CAD': { name: 'Canadian Dollar', symbol: '$' },
        'CDF': { name: 'Congolese Franc', symbol: 'FC' },
        'CHF': { name: 'Swiss Franc', symbol: 'CHF' },
        'CLP': { name: 'Chilean Peso', symbol: '$' },
        'CNY': { name: 'Chinese Yuan', symbol: '¥' },
        'COP': { name: 'Colombian Peso', symbol: '$' },
        'CRC': { name: 'Costa Rican Colón', symbol: '₡' },
        'CUP': { name: 'Cuban Peso', symbol: '₱' },
        'CVE': { name: 'Cape Verdean Escudo', symbol: 'Esc' },
        'CZK': { name: 'Czech Koruna', symbol: 'Kč' },
        'DJF': { name: 'Djiboutian Franc', symbol: 'Fdj' },
        'DKK': { name: 'Danish Krone', symbol: 'kr' },
        'DOP': { name: 'Dominican Peso', symbol: 'RD$' },
        'DZD': { name: 'Algerian Dinar', symbol: 'د.ج' },
        'EGP': { name: 'Egyptian Pound', symbol: '£' },
        'ERN': { name: 'Eritrean Nakfa', symbol: 'Nfk' },
        'ETB': { name: 'Ethiopian Birr', symbol: 'Br' },
        'EUR': { name: 'Euro', symbol: '€' },
        'FJD': { name: 'Fijian Dollar', symbol: 'FJ$' },
        'FKP': { name: 'Falkland Islands Pound', symbol: '£' },
        'FOK': { name: 'Faroe Islands Króna', symbol: 'kr' },
        'GBP': { name: 'British Pound Sterling', symbol: '£' },
        'GEL': { name: 'Georgian Lari', symbol: '₾' },
        'GGP': { name: 'Guernsey Pound', symbol: '£' },
        'GHS': { name: 'Ghanaian Cedi', symbol: '₵' },
        'GIP': { name: 'Gibraltar Pound', symbol: '£' },
        'GMD': { name: 'Gambian Dalasi', symbol: 'D' },
        'GNF': { name: 'Guinean Franc', symbol: 'FG' },
        'GTQ': { name: 'Guatemalan Quetzal', symbol: 'Q' },
        'GYD': { name: 'Guyanaese Dollar', symbol: '$' },
        'HKD': { name: 'Hong Kong Dollar', symbol: '$' },
        'HNL': { name: 'Honduran Lempira', symbol: 'L' },
        'HRK': { name: 'Croatian Kuna', symbol: 'kn' },
        'HTG': { name: 'Haitian Gourde', symbol: 'G' },
        'HUF': { name: 'Hungarian Forint', symbol: 'Ft' },
        'IDR': { name: 'Indonesian Rupiah', symbol: 'Rp' },
        'ILS': { name: 'Israeli New Shekel', symbol: '₪' },
        'IMP': { name: 'Isle of Man Pound', symbol: '£' },
        'INR': { name: 'Indian Rupee', symbol: '₹' },
        'IQD': { name: 'Iraqi Dinar', symbol: 'ع.د' },
        'IRR': { name: 'Iranian Rial', symbol: '﷼' },
        'ISK': { name: 'Icelandic Króna', symbol: 'kr' },
        'JEP': { name: 'Jersey Pound', symbol: '£' },
        'JMD': { name: 'Jamaican Dollar', symbol: 'J$' },
        'JOD': { name: 'Jordanian Dinar', symbol: 'د.ا' },
        'JPY': { name: 'Japanese Yen', symbol: '¥' },
        'KES': { name: 'Kenyan Shilling', symbol: 'KSh' },
        'KGS': { name: 'Kyrgystani Som', symbol: 'с' },
        'KHR': { name: 'Cambodian Riel', symbol: '៛' },
        'KID': { name: 'Kiribati Dollar', symbol: '$' },
        'KMF': { name: 'Comorian Franc', symbol: 'CF' },
        'KPW': { name: 'North Korean Won', symbol: '₩' },
        'KRW': { name: 'South Korean Won', symbol: '₩' },
        'KWD': { name: 'Kuwaiti Dinar', symbol: 'د.ك' },
        'KYD': { name: 'Cayman Islands Dollar', symbol: '$' },
        'KZT': { name: 'Kazakhstani Tenge', symbol: '₸' },
        'LAK': { name: 'Laotian Kip', symbol: '₭' },
        'LBP': { name: 'Lebanese Pound', symbol: 'ل.ل' },
        'LKR': { name: 'Sri Lankan Rupee', symbol: '₨' },
        'LRD': { name: 'Liberian Dollar', symbol: '$' },
        'LSL': { name: 'Lesotho Loti', symbol: 'L' },
        'LYD': { name: 'Libyan Dinar', symbol: 'ل.د' },
        'MAD': { name: 'Moroccan Dirham', symbol: 'د.م.' },
        'MDL': { name: 'Moldovan Leu', symbol: 'L' },
        'MGA': { name: 'Malagasy Ariary', symbol: 'Ar' },
        'MKD': { name: 'Macedonian Denar', symbol: 'ден' },
        'MMK': { name: 'Myanmar Kyat', symbol: 'Ks' },
        'MNT': { name: 'Mongolian Tugrik', symbol: '₮' },
        'MOP': { name: 'Macanese Pataca', symbol: 'MOP$' },
        'MRU': { name: 'Mauritanian Ouguiya', symbol: 'UM' },
        'MUR': { name: 'Mauritian Rupee', symbol: '₨' },
        'MVR': { name: 'Maldivian Rufiyaa', symbol: 'Rf' },
        'MWK': { name: 'Malawian Kwacha', symbol: 'MK' },
        'MXN': { name: 'Mexican Peso', symbol: '$' },
        'MYR': { name: 'Malaysian Ringgit', symbol: 'RM' },
        'MZN': { name: 'Mozambican Metical', symbol: 'MT' },
        'NAD': { name: 'Namibian Dollar', symbol: '$' },
        'NGN': { name: 'Nigerian Naira', symbol: '₦' },
        'NIO': { name: 'Nicaraguan Córdoba', symbol: 'C$' },
        'NOK': { name: 'Norwegian Krone', symbol: 'kr' },
        'NPR': { name: 'Nepalese Rupee', symbol: '₨' },
        'NZD': { name: 'New Zealand Dollar', symbol: '$' },
        'OMR': { name: 'Omani Rial', symbol: 'ر.ع.' },
        'PAB': { name: 'Panamanian Balboa', symbol: 'B/.' },
        'PEN': { name: 'Peruvian Nuevo Sol', symbol: 'S/.' },
        'PGK': { name: 'Papua New Guinean Kina', symbol: 'K' },
        'PHP': { name: 'Philippine Peso', symbol: '₱' },
        'PKR': { name: 'Pakistani Rupee', symbol: '₨' },
        'PLN': { name: 'Polish Zloty', symbol: 'zł' },
        'PYG': { name: 'Paraguayan Guarani', symbol: '₲' },
        'QAR': { name: 'Qatari Rial', symbol: 'ر.ق' },
        'RON': { name: 'Romanian Leu', symbol: 'lei' },
        'RSD': { name: 'Serbian Dinar', symbol: 'дин.' },
        'RUB': { name: 'Russian Ruble', symbol: '₽' },
        'RWF': { name: 'Rwandan Franc', symbol: 'FRw' },
        'SAR': { name: 'Saudi Riyal', symbol: 'ر.س' },
        'SBD': { name: 'Solomon Islands Dollar', symbol: '$' },
        'SCR': { name: 'Seychellois Rupee', symbol: '₨' },
        'SDG': { name: 'Sudanese Pound', symbol: '£' },
        'SEK': { name: 'Swedish Krona', symbol: 'kr' },
        'SGD': { name: 'Singapore Dollar', symbol: '$' },
        'SHP': { name: 'Saint Helena Pound', symbol: '£' },
        'SLL': { name: 'Sierra Leonean Leone', symbol: 'Le' },
        'SOS': { name: 'Somali Shilling', symbol: 'S' },
        'SRD': { name: 'Surinamese Dollar', symbol: '$' },
        'SSP': { name: 'South Sudanese Pound', symbol: '£' },
        'STN': { name: 'São Tomé and Príncipe Dobra', symbol: 'Db' },
        'SYP': { name: 'Syrian Pound', symbol: '£' },
        'SZL': { name: 'Swazi Lilangeni', symbol: 'E' },
        'THB': { name: 'Thai Baht', symbol: '฿' },
        'TJS': { name: 'Tajikistani Somoni', symbol: 'ЅМ' },
        'TMT': { name: 'Turkmenistani Manat', symbol: 'm' },
        'TND': { name: 'Tunisian Dinar', symbol: 'د.ت' },
        'TOP': { name: 'Tongan Paʻanga', symbol: 'T$' },
        'TRY': { name: 'Turkish Lira', symbol: '₺' },
        'TTD': { name: 'Trinidad and Tobago Dollar', symbol: 'TT$' },
        'TVD': { name: 'Tuvaluan Dollar', symbol: '$' },
        'TWD': { name: 'New Taiwan Dollar', symbol: 'NT$' },
        'TZS': { name: 'Tanzanian Shilling', symbol: 'TSh' },
        'UAH': { name: 'Ukrainian Hryvnia', symbol: '₴' },
        'UGX': { name: 'Ugandan Shilling', symbol: 'USh' },
        'USD': { name: 'United States Dollar', symbol: '$' },
        'UYU': { name: 'Uruguayan Peso', symbol: '$U' },
        'UZS': { name: 'Uzbekistan Som', symbol: 'soʻm' },
        'VES': { name: 'Venezuelan Bolívar', symbol: 'Bs.S.' },
        'VND': { name: 'Vietnamese Dong', symbol: '₫' },
        'VUV': { name: 'Vanuatu Vatu', symbol: 'VT' },
        'WST': { name: 'Samoan Tala', symbol: 'WS$' },
        'XAF': { name: 'CFA Franc BEAC', symbol: 'FCFA' },
        'XCD': { name: 'East Caribbean Dollar', symbol: '$' },
        'XDR': { name: 'Special Drawing Rights', symbol: 'SDR' },
        'XOF': { name: 'CFA Franc BCEAO', symbol: 'CFA' },
        'XPF': { name: 'CFP Franc', symbol: '₣' },
        'YER': { name: 'Yemeni Rial', symbol: '﷼' },
        'ZAR': { name: 'South African Rand', symbol: 'R' },
        'ZMW': { name: 'Zambian Kwacha', symbol: 'ZK' },
        'ZWL': { name: 'Zimbabwean Dollar', symbol: '$' },
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
            let fromCurrencyName = currencyNames[fromCurrency].name;
            let toCurrencyName = currencyNames[toCurrency].name;

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