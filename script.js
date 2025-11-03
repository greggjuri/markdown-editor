// Get DOM elements
const markdownInput = document.getElementById('markdown-input');
const previewOutput = document.getElementById('preview-output');
const wordCountDisplay = document.querySelector('.word-count');
const softBreaksToggle = document.getElementById('soft-breaks-toggle');
const cheatsheetToggle = document.getElementById('cheatsheet-toggle');
const cheatsheetPanel = document.getElementById('cheatsheet-panel');

// Export buttons
const downloadMdBtn = document.getElementById('download-md');
const copyHtmlBtn = document.getElementById('copy-html');
const copyTextBtn = document.getElementById('copy-text');

// Auto-save elements
const autosaveStatus = document.getElementById('autosave-status');
const clearDraftBtn = document.getElementById('clear-draft');

// Auto-save configuration
const AUTOSAVE_KEY = 'markdown-editor-draft';
const AUTOSAVE_DELAY = 1000; // Save after 1 second of inactivity
let autosaveTimeout = null;

// State for soft breaks
let softBreaksEnabled = false;

// Wait for marked.js to load
if (typeof marked === 'undefined') {
    console.error('Marked.js not loaded!');
}

// Configure marked.js for GitHub-flavored markdown
function configureMarked() {
    marked.setOptions({
        gfm: true, // GitHub Flavored Markdown
        breaks: softBreaksEnabled, // Toggle soft breaks
        headerIds: true,
        mangle: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });
}

// Initial configuration
configureMarked();

// Auto-save functions
function updateAutosaveStatus(status) {
    autosaveStatus.classList.remove('saving', 'saved');
    
    if (status === 'saving') {
        autosaveStatus.textContent = '💾 Saving...';
        autosaveStatus.classList.add('saving');
    } else if (status === 'saved') {
        autosaveStatus.textContent = '✓ Saved';
        autosaveStatus.classList.add('saved');
        
        // Reset to ready after 2 seconds
        setTimeout(() => {
            autosaveStatus.textContent = '💾 Auto-save: Ready';
            autosaveStatus.classList.remove('saved');
        }, 2000);
    } else {
        autosaveStatus.textContent = '💾 Auto-save: Ready';
    }
}

function saveToStorage() {
    const markdown = markdownInput.value;
    localStorage.setItem(AUTOSAVE_KEY, markdown);
    updateAutosaveStatus('saved');
}

function loadFromStorage() {
    const saved = localStorage.getItem(AUTOSAVE_KEY);
    if (saved) {
        markdownInput.value = saved;
        updatePreview();
        updateAutosaveStatus('ready');
    }
}

function clearStorage() {
    if (confirm('Are you sure you want to clear the saved draft? This cannot be undone.')) {
        localStorage.removeItem(AUTOSAVE_KEY);
        markdownInput.value = '';
        updatePreview();
        updateAutosaveStatus('ready');
    }
}

function scheduleAutosave() {
    // Clear existing timeout
    if (autosaveTimeout) {
        clearTimeout(autosaveTimeout);
    }
    
    // Show saving status
    updateAutosaveStatus('saving');
    
    // Schedule save after delay
    autosaveTimeout = setTimeout(() => {
        saveToStorage();
    }, AUTOSAVE_DELAY);
}

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
markdownInput.addEventListener('input', () => {
    updatePreview();
    scheduleAutosave();
});

// Toolbar functionality
const toolbarButtons = document.querySelectorAll('.toolbar-btn');

// Helper function to insert text at cursor position
function insertAtCursor(textarea, textBefore, textAfter = '', placeholder = '') {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(end);
    
    textarea.value = beforeText + textBefore + textToInsert + textAfter + afterText;
    
    // Set cursor position
    const newCursorPos = start + textBefore.length + textToInsert.length;
    textarea.setSelectionRange(newCursorPos, newCursorPos);
    
    // Focus back on textarea
    textarea.focus();
    
    // Trigger update
    updatePreview();
}

// Helper function to insert at start of line
function insertAtLineStart(textarea, prefix) {
    const start = textarea.selectionStart;
    const beforeCursor = textarea.value.substring(0, start);
    const lineStart = beforeCursor.lastIndexOf('\n') + 1;
    
    const beforeLine = textarea.value.substring(0, lineStart);
    const afterLine = textarea.value.substring(lineStart);
    
    textarea.value = beforeLine + prefix + afterLine;
    
    // Set cursor position after the prefix
    textarea.setSelectionRange(start + prefix.length, start + prefix.length);
    textarea.focus();
    updatePreview();
}

// Toolbar actions
const actions = {
    bold: () => insertAtCursor(markdownInput, '**', '**', 'bold text'),
    italic: () => insertAtCursor(markdownInput, '*', '*', 'italic text'),
    strikethrough: () => insertAtCursor(markdownInput, '~~', '~~', 'strikethrough'),
    h1: () => insertAtLineStart(markdownInput, '# '),
    h2: () => insertAtLineStart(markdownInput, '## '),
    h3: () => insertAtLineStart(markdownInput, '### '),
    link: () => insertAtCursor(markdownInput, '[', '](https://example.com)', 'link text'),
    image: () => insertAtCursor(markdownInput, '![', '](https://example.com/image.png)', 'alt text'),
    code: () => insertAtCursor(markdownInput, '`', '`', 'code'),
    codeblock: () => insertAtCursor(markdownInput, '```javascript\n', '\n```', 'code here'),
    ul: () => insertAtLineStart(markdownInput, '- '),
    ol: () => insertAtLineStart(markdownInput, '1. '),
    task: () => insertAtLineStart(markdownInput, '- [ ] '),
    quote: () => insertAtLineStart(markdownInput, '> '),
    table: () => {
        const tableTemplate = '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n';
        insertAtCursor(markdownInput, tableTemplate, '', '');
    },
    hr: () => insertAtCursor(markdownInput, '\n---\n', '', '')
};

// Add click handlers to toolbar buttons
toolbarButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const action = button.getAttribute('data-action');
        if (actions[action]) {
            actions[action]();
        }
    });
});

// Keyboard shortcuts
markdownInput.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + B for bold
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        actions.bold();
    }
    
    // Ctrl/Cmd + I for italic
    if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        actions.italic();
    }
    
    // Ctrl/Cmd + K for link
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        actions.link();
    }
});

// Soft breaks toggle
softBreaksToggle.addEventListener('click', (e) => {
    e.preventDefault();
    softBreaksEnabled = !softBreaksEnabled;
    
    // Update button state
    if (softBreaksEnabled) {
        softBreaksToggle.classList.add('active');
    } else {
        softBreaksToggle.classList.remove('active');
    }
    
    // Reconfigure marked.js and update preview
    configureMarked();
    updatePreview();
});

// Cheat sheet toggle
cheatsheetToggle.addEventListener('click', (e) => {
    e.preventDefault();
    cheatsheetPanel.classList.toggle('hidden');
    
    // Update button state
    if (!cheatsheetPanel.classList.contains('hidden')) {
        cheatsheetToggle.classList.add('active');
    } else {
        cheatsheetToggle.classList.remove('active');
    }
});

// Export functionality

// Helper function to show success feedback
function showSuccess(button, originalText) {
    const original = button.textContent;
    button.textContent = '✓ ' + originalText;
    button.classList.add('success');
    
    setTimeout(() => {
        button.textContent = original;
        button.classList.remove('success');
    }, 2000);
}

// Download as .md file
downloadMdBtn.addEventListener('click', () => {
    const markdown = markdownInput.value;
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showSuccess(downloadMdBtn, 'Downloaded');
});

// Copy as HTML
copyHtmlBtn.addEventListener('click', async () => {
    const html = parseMarkdown(markdownInput.value);
    
    try {
        await navigator.clipboard.writeText(html);
        showSuccess(copyHtmlBtn, 'Copied');
    } catch (err) {
        console.error('Failed to copy HTML:', err);
        alert('Failed to copy to clipboard');
    }
});

// Copy as plain text
copyTextBtn.addEventListener('click', async () => {
    const text = markdownInput.value;
    
    try {
        await navigator.clipboard.writeText(text);
        showSuccess(copyTextBtn, 'Copied');
    } catch (err) {
        console.error('Failed to copy text:', err);
        alert('Failed to copy to clipboard');
    }
});

// Clear draft button
clearDraftBtn.addEventListener('click', (e) => {
    e.preventDefault();
    clearStorage();
});

// Load saved draft on page load
loadFromStorage();

// Initialize with empty state
updatePreview();
