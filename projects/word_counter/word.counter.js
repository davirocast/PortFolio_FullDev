function countWords() {
    const text = document.getElementById('text').ariaValueMax;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const chars = text.replace(/\s+/g, '').length;
    document.getElementById('wordCount').textContent = `Palabras: ${words.length}`;
    document.getElementById('charCount').textContent = `Caracteres: ${chars}`;
}