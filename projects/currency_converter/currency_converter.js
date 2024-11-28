const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

document.addEventListener('DOMContentLoaded', () => {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const convertButton = document.getElementById('convertButton');
    const result = document.getElementById('result');

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            populateSelect(data.rates);
            convertButton.addEventListener('click', () => {
                convertCurrency(data.rates);
            });
        })
        .catch((error) => {
            console.error('Error al obtener las tasas de cambio:', error);
            result.textContent = 'Error al obtener datos de la API';
        });
});

function populateSelect(rates) {
    const currencyList = Object.keys(rates);
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');

    currencyList.forEach((currency) => {
        // Crear opciones para ambos selectores
        const optionFrom = document.createElement('option');
        const optionTo = document.createElement('option');

        // Configurar valores y textos
        optionFrom.value = currency;
        optionFrom.textContent = currency;

        optionTo.value = currency;
        optionTo.textContent = currency;

        // Agregar opciones a los selectores
        fromCurrency.appendChild(optionFrom);
        toCurrency.appendChild(optionTo);
    });

    // Establecer valores predeterminados
    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';
}

function convertCurrency(rates) {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const result = document.getElementById('result');

    if (isNaN(amount)) {
        result.textContent = 'Por favor, ingresa un monto numérico';
        return;
    }

    // Realizar la conversión
    const convertedAmount = (amount / rates[fromCurrency]) * rates[toCurrency];
    result.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
}


