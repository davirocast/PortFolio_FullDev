document.addEventListener('DOMContentLoaded', () => {
    const qrForm = document.getElementById('qrForm');
    const qrOutput = document.getElementById('qrOutput');
    const urlInput = document.getElementById('urlInput');

    qrForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const url = urlInput.value.trim();
        if (!url) return;

        // Clear Previous QR Code //

        qrOutput.innerHTML = '';

        // Generate QR Code //

        const qrCode = document.createElement('img');
        qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
        qrCode.alt = 'Generated QR Code';
        qrCode.classList.add('qr-code__image');

        qrOutput.appendChild(qrCode);
    });
});