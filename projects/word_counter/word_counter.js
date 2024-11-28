const textArea = document.getElementById('text');
const countButton = document.getElementById('countButton');
const wordCountDisplay = document.getElementById('wordCount');
const charCountDisplay = document.getElementById('charCount');

function countWordsAndCharacters() {

    const text = textArea.value.trim();
    const words = text.length > 0 ? text.split(/\s+/).length : 0;

    const characters = text.length;

    wordCountDisplay.textContent = `Palabras: ${words}`;
    charCountDisplay.textContent = `Caracteres: ${characters}`;
}

countButton.addEventListener('click', countWordsAndCharacters);