# Markdown Editor

A powerful, feature-rich markdown editor with live preview, built in one night! Perfect for creating GitHub README files, Joplin notes, documentation, and any markdown content.

## ✨ Features

### Core Functionality
- ✅ **Live Preview** - See your rendered markdown in real-time
- ✅ **Split-pane Layout** - Editor and preview side-by-side
- ✅ **GitHub-flavored Markdown** - Full GFM support including tables, task lists, and strikethrough
- ✅ **Syntax Highlighting** - Beautiful code blocks with Prism.js supporting JavaScript, Python, Bash, JSON, CSS, HTML and more
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### Editing Tools
- ✅ **Formatting Toolbar** - Quick buttons for all common markdown syntax
  - Text formatting: Bold, Italic, Strikethrough
  - Headers: H1, H2, H3
  - Links and Images
  - Code: Inline and code blocks
  - Lists: Bullet, numbered, and task lists
  - Blockquotes, tables, and horizontal rules
- ✅ **Hover Tooltips** - Learn markdown syntax by hovering over toolbar buttons
- ✅ **Keyboard Shortcuts**:
  - `Ctrl+B` / `Cmd+B` - Bold
  - `Ctrl+I` / `Cmd+I` - Italic
  - `Ctrl+K` / `Cmd+K` - Link
  - `Ctrl+S` / `Cmd+S` - Download as .md
  - `Ctrl+/` / `Cmd+/` - Toggle theme
  - `Tab` - Insert 2 spaces

### Learning & Reference
- ✅ **Markdown Cheat Sheet** - Toggleable reference panel with all syntax examples
- ✅ **Interactive Tooltips** - Hover over buttons to see syntax and preview

### Export & Save
- ✅ **Download as .md** - Save your work as a markdown file
- ✅ **Copy as HTML** - Copy rendered HTML to clipboard
- ✅ **Copy as Text** - Copy raw markdown to clipboard
- ✅ **Auto-save** - Automatically saves to browser storage every second after typing
- ✅ **Persistent Storage** - Never lose your work, even if you close the browser

### Advanced Features
- ✅ **Dark/Light Mode** - Beautiful themes for any time of day
- ✅ **Soft Line Breaks Toggle** - Choose between standard markdown or single-line-break behavior
- ✅ **Table of Contents Generator** - Automatically create TOC from headers
- ✅ **Word & Character Count** - Real-time statistics
- ✅ **Performance Optimized** - Debounced rendering for smooth typing experience

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/greggjuri/markdown-editor.git
cd markdown-editor
```

2. Open `index.html` in your browser, or serve with a local server:
```bash
# Python
python -m http.server 8000

# Node.js
npx serve
```

3. Start editing!

## 🌐 Deployment

### Hostinger (or any web host)

1. Upload all files to your hosting directory
2. Place in your desired subdirectory (e.g., `/md`)
3. Access at `https://yourdomain.com/md`

### GitHub Pages

1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Access at `https://username.github.io/markdown-editor`

## 📖 Usage

### Basic Editing
1. Type your markdown in the left pane
2. See the live preview in the right pane
3. Use the toolbar for quick formatting

### Keyboard Shortcuts
- **Bold**: `Ctrl+B` - Wrap text in `**bold**`
- **Italic**: `Ctrl+I` - Wrap text in `*italic*`
- **Link**: `Ctrl+K` - Insert link syntax
- **Save**: `Ctrl+S` - Download as .md file
- **Theme**: `Ctrl+/` - Toggle dark/light mode
- **Tab**: Insert 2 spaces (doesn't lose focus)

### Auto-save
Your work is automatically saved to browser storage as you type. When you return to the editor, your last draft will be loaded automatically.

### Export Options
- **⬇️ .md** - Download as markdown file
- **📋 HTML** - Copy rendered HTML to clipboard
- **📋 Text** - Copy raw markdown to clipboard

### Table of Contents
Click **📑 TOC** to generate a table of contents from all headers in your document. The TOC will be inserted at the top with clickable links.

### Dark Mode
Click the **🌙/☀️** button to toggle between light and dark themes. Your preference is saved automatically.

## 🛠️ Technology Stack

- **Pure HTML, CSS, and JavaScript** - No build process required
- **marked.js** - Markdown parsing with GitHub-flavored markdown support
- **Prism.js** - Syntax highlighting for code blocks
- **LocalStorage API** - Auto-save functionality
- **CSS Variables** - Theme switching

## 📝 Development

Built incrementally with proper version control:

1. ✅ Basic structure with split-pane layout
2. ✅ Enhanced markdown rendering with marked.js
3. ✅ Formatting toolbar with quick buttons
4. ✅ Markdown cheat sheet panel
5. ✅ Export features (download, copy)
6. ✅ Auto-save to browser storage
7. ✅ Dark/light mode toggle
8. ✅ Advanced polish (TOC, shortcuts, optimization)
9. ✅ Interactive hover tooltips

## 🤝 Contributing

This is a personal project for learning and productivity. Feel free to fork and adapt for your own use!

## 📄 License

MIT License - feel free to use and modify as needed.

## 👤 Author

**Juri Gregg**
- Website: [jurigregg.com](https://jurigregg.com)
- GitHub: [@greggjuri](https://github.com/greggjuri)
- Editor: [jurigregg.com/md](https://jurigregg.com/md)

## 🙏 Acknowledgments

- Built with help from Claude (Anthropic)
- Inspired by the need for a simple, powerful markdown editor
- Created in one night as a fun web app project

---

**Happy Markdown Writing! ✍️**
