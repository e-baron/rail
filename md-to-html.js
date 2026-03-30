const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Use command line argument or default to 'safetyCat3.md'
const inputFile = process.argv[2] || 'safetyCat3.md';
const outputFile = path.basename(inputFile, '.md') + '.html';

// Read markdown file
try {
    const mdContent = fs.readFileSync(path.join(__dirname, inputFile), 'utf8');

    // Configure marked to handle mermaid blocks
    const renderer = new marked.Renderer();
    const originalCodeRenderer = renderer.code.bind(renderer);

    renderer.code = (code, language) => {
        // Handle both old and new marked versions
        // New: code is { text, lang, escaped }
        // Old: code is string, language is string
        const codeText = typeof code === 'object' ? code.text : code;
        const lang = (typeof code === 'object' ? code.lang : language) || '';

        if (lang === 'mermaid') {
            return `<div class="mermaid">${codeText}</div>`;
        }
        
        // Fallback for other code blocks
        if (originalCodeRenderer) {
           return originalCodeRenderer.call(renderer, code, language);
        }
        return `<pre><code>${codeText}</code></pre>`;
    };

    marked.use({ renderer });

    // Convert markdown to HTML body
    const htmlBody = marked.parse(mdContent);

    // HTML Template with Zoom capabilities
    const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${inputFile}</title>
    <style>
        :root {
            --bg-color: #ffffff;
            --text-color: #333333;
            --link-color: #0366d6;
            --border-color: #eee;
            --code-bg: #f4f4f4;
            --pre-bg: #f8f9fa;
            --table-header-bg: #f2f2f2;
            --table-border: #ddd;
            --mermaid-bg: #ffffff;
        }

        [data-theme="dark"] {
            --bg-color: #0d1117;
            --text-color: #c9d1d9;
            --link-color: #58a6ff;
            --border-color: #30363d;
            --code-bg: #161b22;
            --pre-bg: #161b22;
            --table-header-bg: #161b22;
            --table-border: #30363d;
            --mermaid-bg: #0d1117;
        }

        body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0; 
            padding: 20px;
            max-width: 1200px; 
            margin: 0 auto;
            line-height: 1.6;
            color: var(--text-color);
            background-color: var(--bg-color);
            transition: background-color 0.3s, color 0.3s;
        }
        
        a { color: var(--link-color); }
        
        .mermaid { 
            margin: 2em 0; 
            border: 1px solid var(--border-color);
            border-radius: 4px;
            overflow: hidden; 
            background: var(--mermaid-bg);
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            /* Removed native resize to use custom */
            min-height: 200px;
            position: relative;
            box-sizing: border-box;
        }
        
        /* Custom resize handles */
        .resize-handle { position: absolute; background: transparent; z-index: 5; }
        .resize-handle:hover { background: rgba(0, 0, 0, 0.1); }
        [data-theme="dark"] .resize-handle:hover { background: rgba(255, 255, 255, 0.1); }
        .resize-handle.n { top: 0; left: 0; right: 0; height: 10px; cursor: n-resize; }
        .resize-handle.s { bottom: 0; left: 0; right: 0; height: 10px; cursor: s-resize; }
        .resize-handle.e { top: 0; right: 0; bottom: 0; width: 10px; cursor: e-resize; }
        .resize-handle.w { top: 0; left: 0; bottom: 0; width: 10px; cursor: w-resize; }
        .resize-handle.ne { top: 0; right: 0; width: 10px; height: 10px; cursor: ne-resize; z-index: 6; }
        .resize-handle.nw { top: 0; left: 0; width: 10px; height: 10px; cursor: nw-resize; z-index: 6; }
        .resize-handle.se { bottom: 0; right: 0; width: 10px; height: 10px; cursor: se-resize; z-index: 6; }
        .resize-handle.sw { bottom: 0; left: 0; width: 10px; height: 10px; cursor: sw-resize; z-index: 6; }

        .zoom-toggle-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            z-index: 10;
            padding: 6px 12px;
            background: var(--bg-color);
            color: var(--text-color);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            font-size: 12px;
            font-weight: bold;
            transition: all 0.2s;
        }
        .zoom-toggle-btn:hover { background: var(--pre-bg); }
        .zoom-toggle-btn.active {
            background: #d73a49;
            color: #ffffff;
            border-color: #d73a49;
        }

        .mermaid svg { 
            height: 100%; 
            width: 100%; 
            display: block; 
            min-height: inherit; /* Ensure SVG follows container size */
        }
        
        /* Resize handle visibility */
        .mermaid::-webkit-resizer {
            background-color: var(--border-color);
        }
        
        h1, h2, h3 { color: var(--text-color); margin-top: 1.5em; }
        
        code { 
            background: var(--code-bg); 
            padding: 2px 5px; 
            border-radius: 3px; 
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
        }
        
        pre { 
            background: var(--pre-bg); 
            padding: 15px; 
            border-radius: 5px; 
            overflow-x: auto; 
            border: 1px solid var(--border-color);
        }
        
        table { border-collapse: collapse; width: 100%; margin: 1em 0; }
        th, td { border: 1px solid var(--table-border); padding: 8px; text-align: left; }
        th { background-color: var(--table-header-bg); }

        /* Print specific styles */
        .mermaid-print {
            display: none;
        }

        @media print {
            body { 
                padding: 0; 
                margin: 0; 
                max-width: 100%; 
            }
            .mermaid { 
                display: none !important; /* Hide interactive version completely */
            }
            .mermaid-print {
                display: block !important;
                margin: 1em 0;
                /* Allow diagrams to break across pages if needed, preventing forced blank pages */
                page-break-inside: auto; 
            }
            .mermaid-print svg {
                height: auto !important;
                width: 100% !important;
                max-width: 100% !important;
            }
            
            /* Enhanced Table Printing */
            table {
                page-break-inside: auto;
            }
            tr {
                page-break-inside: avoid; /* Keep rows intact */
                page-break-after: auto;
            }
            thead {
                display: table-header-group; /* Repeat headers on new pages */
            }
            
            /* Hide UI elements */
            #theme-toggle, .svg-pan-zoom-control { 
                display: none !important; 
            }
        }
    </style>
</head>
<body>
    <button id="theme-toggle" title="Toggle Dark Mode">
        <span id="theme-icon">◐</span>
        <span id="theme-text">Auto</span>
    </button>

    ${htmlBody}

    <!-- Dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/dist/svg-pan-zoom.min.js"></script>
    
    <script type="module">
        import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
        
        // --- Theme Management ---
        const toggleBtn = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const themeText = document.getElementById('theme-text');
        
        // Store the original source code of diagrams to re-render them
        const mermaidSources = [];

        function getPreferredTheme() {
            const stored = localStorage.getItem('theme');
            if (stored) return stored;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        function setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            themeText.textContent = theme === 'dark' ? 'Dark' : 'Light';
            
            // Re-render diagrams with new theme
            renderDiagrams(theme);
        }

        toggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });

        // Listen for OS changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                 setTheme(e.matches ? 'dark' : 'light');
            }
        });

        function makeResizable(element) {
            const handles = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];
            handles.forEach(h => {
                const handle = document.createElement('div');
                handle.className = 'resize-handle ' + h;
                element.appendChild(handle);
                
                let startX, startY, startWidth, startHeight, startMarginLeft, startMarginTop;
                
                handle.addEventListener('mousedown', function(e) {
                    e.preventDefault();
                    e.stopPropagation(); // Stop pan-zoom from grabbing the resize
                    startX = e.clientX;
                    startY = e.clientY;
                    
                    const style = window.getComputedStyle(element);
                    startWidth = element.offsetWidth;
                    startHeight = element.offsetHeight;
                    startMarginLeft = parseFloat(style.marginLeft) || 0;
                    startMarginTop = parseFloat(style.marginTop) || 0;
                    
                    function doDrag(e) {
                        let newWidth = startWidth;
                        let newHeight = startHeight;
                        let newMarginLeft = startMarginLeft;
                        let newMarginTop = startMarginTop;
                        
                        let deltaX = e.clientX - startX;
                        let deltaY = e.clientY - startY;

                        if (h.includes('e')) {
                            newWidth = startWidth + deltaX;
                        }
                        if (h.includes('w')) {
                            newWidth = startWidth - deltaX;
                            newMarginLeft = startMarginLeft + deltaX;
                        }
                        if (h.includes('s')) {
                            newHeight = startHeight + deltaY;
                        }
                        if (h.includes('n')) {
                            newHeight = startHeight - deltaY;
                            newMarginTop = startMarginTop + deltaY;
                        }
                        
                        // Apply minimum limits
                        const MIN_W = 150;
                        const MIN_H = 150;
                        
                        if (newWidth < MIN_W) {
                            if (h.includes('w')) {
                                newMarginLeft -= (MIN_W - newWidth);
                            }
                            newWidth = MIN_W;
                        }
                        if (newHeight < MIN_H) {
                            if (h.includes('n')) {
                                newMarginTop -= (MIN_H - newHeight);
                            }
                            newHeight = MIN_H;
                        }

                        element.style.maxWidth = 'none';
                        element.style.width = newWidth + 'px';
                        element.style.height = newHeight + 'px';
                        element.style.marginLeft = newMarginLeft + 'px';
                        element.style.marginTop = newMarginTop + 'px';
                    }
                    
                    function stopDrag() {
                        document.documentElement.removeEventListener('mousemove', doDrag);
                        document.documentElement.removeEventListener('mouseup', stopDrag);
                    }
                    
                    document.documentElement.addEventListener('mousemove', doDrag);
                    document.documentElement.addEventListener('mouseup', stopDrag);
                });
            });
        }

        // --- Mermaid & PanZoom ---
        
        // Collect sources once
        document.querySelectorAll('.mermaid').forEach((node, index) => {
             mermaidSources[index] = node.textContent.trim();
        });

        async function renderDiagrams(themeName) {
            // For mermaid, 'dark' is a valid theme. 'default' is good for light.
            const mermaidTheme = themeName === 'dark' ? 'dark' : 'default';
            
            mermaid.initialize({ 
                startOnLoad: false, 
                theme: mermaidTheme,
                securityLevel: 'loose'
            });

            const nodes = document.querySelectorAll('.mermaid');
            
            for (const [index, node] of nodes.entries()) {
                const id = 'mermaid-chart-' + index;
                const txt = mermaidSources[index];
                
                // Clear content
                node.innerHTML = '';
                node.removeAttribute('data-processed'); // reset mermaid check
                
                try {
                    const { svg } = await mermaid.render(id, txt);
                    node.innerHTML = svg;
                    
                    const svgElement = node.querySelector('svg');
                    
                    if (svgElement && window.svgPanZoom) {
                        // Calculate natural height for initial container size
                        // getting BBox from the SVG element directly might be tricky if it's not fully rendered/layouted
                        // But mermaid often sets a viewBox or height/width attributes
                        const bbox = svgElement.getBBox(); 
                        // Use bbox.height if available, otherwise fallback.
                        // We add some padding for controls and border
                        const naturalHeight = bbox.height + 40; 
                        
                        // Set CONTAINER size to match content height strictly
                        // We remove the artificial clamp (was min 400, max 800)
                        // But let's keep a reasonable minimum so it's not invisible if empty
                        node.style.height = Math.max(200, naturalHeight) + 'px';
                        
                        // Ensure SVG is 100% of container
                        svgElement.style.width = '100%';
                        svgElement.style.height = '100%';
                        svgElement.style.overflow = 'hidden'; 

                        // --- Print Handling ---
                        // The most robust solution is to CLONE the SVG for printing.
                        // One version is interactive (screen), one is static/native (print).
                        
                        // Create a print-only copy of the SVG
                        const printClone = svgElement.cloneNode(true);
                        printClone.classList.add('print-only');
                        
                        // Clean up the clone
                        printClone.style.cssText = ''; // Remove updated styles
                        printClone.style.height = 'auto';
                        printClone.style.width = '100%';
                        printClone.style.maxWidth = '100%';
                        
                        // Remove pan-zoom classes/groups from clone if copied
                        // But cloning happening AFTER pan-zoom init means we get the wrapped structure.
                        // So we should clone BEFORE init or use the raw SVG string.
                        
                        // BETTER APPROACH:
                        // Just use the original SVG string we generated!
                        const rawSvgString = node.innerHTML; // node.innerHTML right now IS the SVG (before pan-zoom touches it?)
                        // Wait, we are already inside the loop where we just set innerHTML.
                        // pan-zoom hasn't initialized yet (it's the next lines).
                        // So svgElement IS the raw clean SVG.
                        
                        // Remove any hardcoded max-width from the rendered SVG to allow full expansion
                        svgElement.style.maxWidth = 'none';

                        // Let's create a hidden print container next to the interactive one.
                        const printContainer = document.createElement('div');
                        printContainer.className = 'mermaid-print';
                        printContainer.innerHTML = rawSvgString; // Use the CLEAN SVG content
                        
                        // Insert it after the interactive node
                        node.parentNode.insertBefore(printContainer, node.nextSibling);
                        
                        // Now initialize interactive one as normal...
                        const panZoomInstance = window.svgPanZoom(svgElement, {
                            zoomEnabled: true,
                            panEnabled: true,
                            mouseWheelZoomEnabled: false,
                            controlIconsEnabled: true,
                            fit: true,
                            center: true,
                            minZoom: 0.1,
                            maxZoom: 30, // Increased max-zoom limit
                            // Prevent pan-zoom form interfering with resize drag
                            preventMouseEventsDefault: false 
                        });
                        
                        // Create Toggle Button for Wheel Zoom
                        let isWheelZoomEnabled = false;
                        const zoomBtn = document.createElement('button');
                        zoomBtn.className = 'zoom-toggle-btn';
                        zoomBtn.textContent = 'Allow wheel zoom';
                        node.appendChild(zoomBtn);
                        
                        zoomBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            isWheelZoomEnabled = !isWheelZoomEnabled;
                            if (isWheelZoomEnabled) {
                                panZoomInstance.enableMouseWheelZoom();
                                zoomBtn.textContent = 'Disable wheel zoom';
                                zoomBtn.classList.add('active');
                            } else {
                                panZoomInstance.disableMouseWheelZoom();
                                zoomBtn.textContent = 'Allow wheel zoom';
                                zoomBtn.classList.remove('active');
                            }
                        });

                        // Add resizers 
                        makeResizable(node);
                        
                        // Use ResizeObserver to update pan-zoom when container is resized
                        const observer = new ResizeObserver(() => {
                            panZoomInstance.resize();
                            panZoomInstance.fit();
                            panZoomInstance.center();
                        });
                        observer.observe(node);

                        // --- Print Handling ---
                        // We are now using a separate element (.mermaid-print) for printing.
                        // So no special listener logic is required to destroy/enable pan-zoom.
                        // The CSS @media print handles switching between .mermaid and .mermaid-print.
                        
                    }
                } catch (error) {
                    console.error("Mermaid error for chart " + index, error);
                    node.innerHTML = '<p style="color:red">Error rendering diagram</p>';
                }
            }
        }

        // Initial Load
        document.addEventListener("DOMContentLoaded", async function() {
            setTheme(getPreferredTheme());
        });
    </script>
</body>
</html>`;

    fs.writeFileSync(path.join(__dirname, outputFile), htmlTemplate);
    console.log(`Successfully generated: ${outputFile}`);

} catch (err) {
    if (err.code === 'ENOENT') {
        console.error(`Error: The file '${inputFile}' was not found.`);
    } else {
        console.error('An error occurred:', err);
    }
}
