// Get DOM elements
const markdownInput = document.getElementById('markdown-input');
const previewOutput = document.getElementById('preview-output');
const wordCountDisplay = document.querySelector('.word-count');

// Wait for marked.js to load
if (typeof marked === 'undefined') {
    console.error('Marked.js not loaded!');
}

// Configure marked.js for GitHub-flavored markdown
marked.setOptions({
    gfm: true, // GitHub Flavored Markdown
    breaks: false, // Don't convert every \n to <br> (breaks code blocks)
    headerIds: true,
    mangle: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

// Parse markdown to HTML
function parseMarkdown(markdown) {
    try {
        const html = marked.parse(markdown);
        return html;
    } catch (error) {
        console.error('Markdown parsing error:', error);
        return '<p>Error parsing markdown</p>';
    }
}

// Update preview with syntax highlighting
function updatePreview() {
    const markdown = markdownInput.value;
    const html = parseMarkdown(markdown);
    previewOutput.innerHTML = html;
    
    // Re-highlight code blocks
    previewOutput.querySelectorAll('pre code').forEach((block) => {
        Prism.highlightElement(block);
    });
    
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
