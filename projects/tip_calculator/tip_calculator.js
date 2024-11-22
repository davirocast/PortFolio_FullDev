function calculateTip() {
    const amount = parseFloat(document.getElementById('amount').value);
    const tipPercentage = parseFloat(document.getElementById('tip').value);
    const tip = (amount * tipPercentage) / 100;
    document.getElementById('result').textContent = `Propina: $${tip.toFixed(2)}`;
}