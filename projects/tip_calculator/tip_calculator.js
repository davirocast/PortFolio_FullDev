// Selección de elementos del DOM
const calculateButton = document.getElementById('calculate-btn');
const resultBox = document.getElementById('result-box');
const resultText = document.getElementById('result');

// Función para calcular la propina
function calculateTip() {
    const amount = parseFloat(document.getElementById('amount').value);
    const tipPercentage = parseFloat(document.getElementById('tip').value);

    // Validar que los valores sean válidos
    if (isNaN(amount) || isNaN(tipPercentage) || amount <= 0 || tipPercentage <= 0) {
        resultText.textContent = 'Por favor, ingresa valores válidos';
        resultBox.style.background = "rgba(255, 0, 0, 0.2)"; // Fondo rojo claro para errores
        resultBox.style.boxShadow = "inset 0px 0px 10px rgba(255, 0, 0, 0.4)";
        return;
    }

    // Calcular la propina y el total
    const tipAmount = (amount * tipPercentage) / 100;
    const total = amount + tipAmount;

    // Mostrar el resultado
    resultText.textContent = `Propina: $${tipAmount.toFixed(2)} | Total: $${total.toFixed(2)}`;
    resultBox.style.background = "rgba(255, 255, 255, 0.2)"; // Fondo normal (estilo cristal)
    resultBox.style.boxShadow = "inset 0px 0px 10px rgba(0, 0, 0, 0.2)";
}

// Evento de clic
calculateButton.addEventListener('click', calculateTip);




