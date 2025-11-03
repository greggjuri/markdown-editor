// Get DOM elements
const markdownInput = document.getElementById('markdown-input');
const previewOutput = document.getElementById('preview-output');
const wordCountDisplay = document.querySelector('.word-count');

// Simple markdown parser (we'll enhance this with a library later)
function parseMarkdown(markdown) {
    // This is a basic parser - we'll replace it with a proper library in the next step
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/gim, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    html = html.replace(/_(.*?)_/gim, '<em>$1</em>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');

    // Line breaks
    html = html.replace(/\n/gim, '<br>');

    return html;
}

// Update preview
function updatePreview() {
    const markdown = markdownInput.value;
    const html = parseMarkdown(markdown);
    previewOutput.innerHTML = html;
    updateWordCount(markdown);
}

// Update word and character count
function updateWordCount(text) {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const characters = text.length;
    wordCountDisplay.textContent = `Words: ${words} | Characters: ${characters}`;
}

// Event listener for input
markdownInput.addEventListener('input', updatePreview);

// Initialize with empty state
updatePreview();
