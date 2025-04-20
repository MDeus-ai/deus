import React, { useState, useEffect } from 'react';
import { FaCode, FaDownload, FaExclamationTriangle } from 'react-icons/fa';
// Import the syntax highlighter and a style
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Choose a style (e.g., vscDarkPlus, okaidia, atomDark, materialDark, etc.)
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Using ESM import

const NotebookViewer = ({ notebookUrl }) => {
    const [notebookData, setNotebookData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCode, setShowCode] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        fetch(notebookUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load notebook (${response.status})`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Loaded notebook data:", {
                    hasMetadata: !!data.metadata,
                    cellsCount: data.cells?.length || 0,
                    nbformat: data.nbformat,
                    language: data.metadata?.language_info?.name // Log language if available
                });
                setNotebookData(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to load notebook:", err);
                setError(err.message);
                setIsLoading(false);
            });
    }, [notebookUrl]);

    // --- Loading State ---
    if (isLoading) {
        return (
            <div className="bg-[#1a1a2e]/60 backdrop-blur-md rounded-xl p-8 border border-purple-500/10 flex flex-col items-center justify-center h-96">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-purple-500/30 mb-4 flex items-center justify-center">
                        <FaCode className="text-2xl text-purple-300 animate-spin" />
                    </div>
                    <div className="h-5 w-64 bg-purple-500/30 rounded-full mb-4"></div>
                    <div className="h-3 w-48 bg-purple-500/20 rounded-full"></div>
                </div>
            </div>
        );
    }

    // --- Error State ---
    if (error) {
        return (
            <div className="bg-[#1a1a2e]/60 backdrop-blur-md rounded-xl p-8 border border-red-500/20 flex flex-col items-center justify-center h-96">
                <FaExclamationTriangle className="text-4xl text-red-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Failed to load notebook</h3>
                <p className="text-gray-400 text-center">{error}</p>
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Try Again
                    </button>
                    <a
                        href={notebookUrl}
                        download
                        className="px-4 py-2 bg-purple-600/50 hover:bg-purple-600 text-white rounded-lg flex items-center transition-colors"
                    >
                        <FaDownload className="mr-1" /> Download Raw
                    </a>
                </div>
            </div>
        );
    }

    // --- Invalid Format State ---
    if (!notebookData || !notebookData.cells || !Array.isArray(notebookData.cells)) {
        return (
            <div className="bg-[#1a1a2e]/60 backdrop-blur-md rounded-xl p-8 border border-yellow-500/20 flex flex-col items-center justify-center h-96">
                <FaExclamationTriangle className="text-4xl text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Invalid Notebook Format</h3>
                <p className="text-gray-400 text-center">The notebook doesn't have the expected structure.</p>
                <a
                    href={notebookUrl}
                    download
                    className="mt-6 px-4 py-2 bg-purple-600/50 hover:bg-purple-600 text-white rounded-lg flex items-center transition-colors"
                >
                    <FaDownload className="mr-1" /> Download Raw
                </a>
            </div>
        );
    }

    // Determine the language for syntax highlighting
    // Default to 'python' if not specified or unknown
    const codeLanguage = notebookData?.metadata?.language_info?.name?.toLowerCase() || 'python';
    console.log("Using language for highlighting:", codeLanguage);

    // Enhanced markdown to HTML conversion (no changes needed here)
    const convertMarkdown = (markdown) => {
        // ... (keep the existing markdown conversion logic) ...
         // Handle array of markdown lines
         if (Array.isArray(markdown)) {
             markdown = markdown.join('');
         }

         // Process code blocks first to avoid conflicts with other formatting
         markdown = markdown.replace(/```([^`]*?)```/gs, (match, code) => {
             // Simple pre block for markdown code blocks (no syntax highlighting here)
             return `<pre class="bg-gray-800 p-2 rounded-lg my-3 overflow-x-auto font-mono text-sm">${code.trim()}</pre>`;
         });

         // Process headers
         markdown = markdown.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-purple-300 my-3">$1</h3>');
         markdown = markdown.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-purple-200 my-4">$1</h2>');
         markdown = markdown.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-purple-100 my-5">$1</h1>');

         // Process bold and italic text
         markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
         markdown = markdown.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
         markdown = markdown.replace(/__(.*?)__/g, '<strong class="font-bold">$1</strong>');
         markdown = markdown.replace(/_(.*?)_/g, '<em class="italic">$1</em>');

         // Process inline code
         markdown = markdown.replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-1 rounded text-purple-300 font-mono text-sm">$1</code>');

         // Process links
         markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-purple-400 hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">$1</a>');

         // Process images
         markdown = markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto my-4 rounded-lg" loading="lazy" />');

         // Process horizontal rules
         markdown = markdown.replace(/^---$/gm, '<hr class="my-4 border-t border-purple-500/20" />');

         // Process unordered lists
         let inList = false;
         const processLists = (text) => {
             const lines = text.split('\n');
             let result = [];
             let listType = null; // 'ul' or 'ol'

             for (let i = 0; i < lines.length; i++) {
                 const line = lines[i];

                 // Check for unordered list items
                 if (line.match(/^\s*[-*+]\s/)) {
                     if (!inList || listType !== 'ul') {
                         if (inList) result.push(listType === 'ol' ? '</ol>' : '</ul>');
                         inList = true;
                         listType = 'ul';
                         result.push('<ul class="list-disc pl-5 my-3 space-y-1">');
                     }
                     const listContent = line.replace(/^\s*[-*+]\s/, '');
                     result.push(`<li>${listContent}</li>`);
                 }
                 // Check for ordered list items
                 else if (line.match(/^\s*\d+\.\s/)) {
                     if (!inList || listType !== 'ol') {
                         if (inList) result.push(listType === 'ol' ? '</ol>' : '</ul>');
                         inList = true;
                         listType = 'ol';
                         result.push('<ol class="list-decimal pl-5 my-3 space-y-1">');
                     }
                     const listContent = line.replace(/^\s*\d+\.\s/, '');
                     result.push(`<li>${listContent}</li>`);
                 }
                 // Not a list item
                 else {
                     if (inList) {
                         inList = false;
                         result.push(listType === 'ol' ? '</ol>' : '</ul>');
                         listType = null;
                     }
                     result.push(line);
                 }
             }

             if (inList) {
                 result.push(listType === 'ol' ? '</ol>' : '</ul>');
             }

             return result.join('\n');
         };

         markdown = processLists(markdown);

         // Process blockquotes
         markdown = markdown.replace(/^>\s*(.*$)/gm, '<blockquote class="border-l-4 border-purple-500 pl-4 py-1 italic text-gray-300 my-3">$1</blockquote>');

         // Process tables
         const processTables = (text) => {
             const tableRegex = /^\|(.+)\|\s*\n\|(\s*[-:]+[-:|\s]*)\|\s*\n((?:\|.+\|\s*\n?)+)/gm;

             return text.replace(tableRegex, (match, headerContent, separators, bodyContent) => {
                 const headers = headerContent.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
                 const headerRow = headers.map(header => `<th class="border border-purple-500/20 px-4 py-2 bg-purple-900/20">${header}</th>`).join('');

                 const rows = bodyContent.trim().split('\n');
                 const bodyRows = rows.map(row => {
                     const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
                     return `<tr>${cells.map(cell => `<td class="border border-purple-500/20 px-4 py-2">${cell}</td>`).join('')}</tr>`;
                 }).join('');

                 return `<div class="overflow-x-auto my-4">
             <table class="min-w-full border-collapse">
               <thead>
                 <tr>${headerRow}</tr>
               </thead>
               <tbody>${bodyRows}</tbody>
             </table>
           </div>`;
             });
         };

         markdown = processTables(markdown);

         // Process paragraphs
         const paragraphs = markdown.split(/\n\n+/);
         markdown = paragraphs.map(p => {
             p = p.trim();
             if (p.startsWith('<h') ||
                 p.startsWith('<pre') ||
                 p.startsWith('<ul') ||
                 p.startsWith('<ol') ||
                 p.startsWith('<table') ||
                 p.startsWith('<blockquote') ||
                 p.startsWith('<div') ||
                 !p) { // Skip empty paragraphs too
                 return p;
             }
             // Convert remaining line breaks within a paragraph to <br>
             p = p.replace(/\n/g, '<br />');
             return `<p class="my-2 text-gray-300">${p}</p>`;
         }).join('\n\n'); // Keep separation for structure, though browser collapses whitespace


         // Support for subscript and superscript
         markdown = markdown.replace(/~([^~]+)~/g, '<sub>$1</sub>');
         markdown = markdown.replace(/\^([^^]+)\^/g, '<sup>$1</sup>');

         // Handle checkboxes
         markdown = markdown.replace(/\[ \]/g, '<input type="checkbox" disabled class="mr-1" />');
         markdown = markdown.replace(/\[x\]/gi, '<input type="checkbox" checked disabled class="mr-1" />');

         // Handle math expressions (basic rendering)
         markdown = markdown.replace(/\$\$(.*?)\$\$/gs, '<div class="my-2 p-2 bg-gray-800/50 rounded text-center font-mono text-sm">$$ $1 $$</div>'); // Display math
         markdown = markdown.replace(/\$(.*?)\$/g, '<span class="bg-gray-800/50 px-1 rounded font-mono text-sm">$ $1 $</span>'); // Inline math

         return markdown;
    };

    // Helper function to render cell content based on cell type
    const renderCell = (cell, index) => {
        // Markdown cell
        if (cell.cell_type === 'markdown') {
            return (
                <div key={index} className="notebook-cell markdown-cell py-3 px-4 border-b border-purple-500/10">
                    {/* Apply Tailwind prose styles for better markdown rendering */}
                    <div className="markdown-content prose prose-sm sm:prose-base prose-invert max-w-none text-gray-300"
                         dangerouslySetInnerHTML={{ __html: convertMarkdown(cell.source) }}>
                    </div>
                </div>
            );
        }

        // Code cell
        else if (cell.cell_type === 'code') {
            const codeString = Array.isArray(cell.source) ? cell.source.join('') : cell.source;

            return (
                <div key={index} className="notebook-cell code-cell py-3 border-b border-purple-500/10">
                    {/* Input */}
                    {showCode && (
                        <div className="flex">
                            {/* Execution count prompt */}
                            <div className="hidden md:block cell-prompt py-1 text-purple-400 font-mono text-xs w-16 flex-shrink-0 select-none text-center">
                                {cell.execution_count ? `[${cell.execution_count}]` : '[ ]'}
                            </div>
                             {/* Code Input with Syntax Highlighting */}
                            <div className="cell-input flex-1 my-1 overflow-hidden rounded-lg"> {/* Remove bg, padding, let highlighter handle it */}
                                <SyntaxHighlighter
                                    language={codeLanguage} // Use detected language
                                    style={vscDarkPlus} // Apply the chosen theme
                                    customStyle={{ // Override default styles if needed
                                        margin: 0, // Remove default margin from highlighter
                                        padding: '0.5rem', // Add padding inside
                                        fontSize: '0.8rem', // Adjust font size if needed (sm:text-sm equivalent)
                                        borderRadius: '0.5rem', // Match rounding
                                        backgroundColor: '#111827' // Match original bg
                                    }}
                                    codeTagProps={{ // Style the inner code tag if needed
                                        style: { fontFamily: 'inherit' } // Ensure mono font is inherited or set explicitly
                                    }}
                                    showLineNumbers={false} // Optional: set to true to show line numbers
                                    wrapLines={true}      // Optional: wrap long lines
                                    wrapLongLines={true}  // Optional: helps with wrapping very long lines without spaces
                                >
                                    {codeString}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    )}

                    {/* Output */}
                    {cell.outputs && cell.outputs.length > 0 && (
                        <div className="flex mt-1">
                            {/* Output prompt area (aligned with input prompt) */}
                            <div className="hidden md:block cell-prompt py-2 text-purple-400 font-mono text-sm w-16 flex-shrink-0 select-none text-center">
                                {/* No output number here usually, keep for alignment */}
                            </div>
                            {/* Output Area */}
                            <div className="cell-output bg-[#111827]/50 flex-1 p-2 rounded-lg my-1 overflow-x-auto">
                                {cell.outputs.map((output, i) => renderOutput(output, i))}
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        // Unknown cell type
        return (
            <div key={index} className="notebook-cell unknown-cell py-2 px-4 border-b border-purple-500/10 text-gray-400 italic">
                Unsupported cell type: {cell.cell_type}
            </div>
        );
    };

    // Helper function to render cell outputs (no changes needed here)
    const renderOutput = (output, index) => {
        // Text/plain output
        if (output.output_type === 'stream' || (output.output_type === 'execute_result' && output.data && output.data['text/plain'])) {
            const text = output.text || output.data['text/plain'];
            return (
                <pre key={index} className="font-mono text-xs sm:text-sm text-gray-300 whitespace-pre-wrap">
                    {Array.isArray(text) ? text.join('') : text}
                </pre>
            );
        }

        // Display data (images, HTML, etc.)
        else if (output.output_type === 'display_data' || output.output_type === 'execute_result') {
            // Handle HTML (ensure it's properly sanitized if coming from untrusted sources)
            if (output.data && output.data['text/html']) {
                const html = Array.isArray(output.data['text/html'])
                    ? output.data['text/html'].join('')
                    : output.data['text/html'];
                // WARNING: Rendering raw HTML can be risky if the notebook source is not trusted.
                // Consider using a sanitization library like DOMPurify if necessary.
                return (
                    <div key={index} className="output-html text-gray-300" dangerouslySetInnerHTML={{ __html: html }}></div>
                );
            }

            // Handle images (PNG, JPEG, GIF)
            else if (output.data) {
               const imgType = Object.keys(output.data).find(key => key.startsWith('image/'));
               if (imgType) {
                   const imgData = output.data[imgType];
                   return (
                       <div key={index} className="flex justify-start py-2"> {/* Align left */}
                           <img
                               src={`data:${imgType};base64,${imgData}`}
                               alt="Output visualization"
                               className="max-w-full h-auto rounded-lg"
                               loading="lazy"
                           />
                       </div>
                   );
               }
            }

            // Handle LaTeX/Math (basic display, might need MathJax/KaTeX for proper rendering)
             else if (output.data && output.data['text/latex']) {
                 const latex = Array.isArray(output.data['text/latex'])
                     ? output.data['text/latex'].join('')
                     : output.data['text/latex'];
                 // Basic rendering, consider a library like react-latex-next for full support
                 return (
                    <div key={index} className="my-2 p-2 bg-gray-800/50 rounded text-center font-mono text-sm text-purple-300">
                        {latex}
                    </div>
                 );
             }
        }

        // Error output
        else if (output.output_type === 'error') {
            return (
                <div key={index} className="error-output text-red-400 font-mono text-xs sm:text-sm">
                    <div className="font-bold">{output.ename}: {output.evalue}</div>
                    {output.traceback && (
                        <pre className="mt-1 whitespace-pre-wrap text-xs">{output.traceback.join('\n')}</pre>
                    )}
                </div>
            );
        }

        // Fallback for unknown output types
        return (
            <div key={index} className="text-gray-400 italic text-xs sm:text-sm">
                [Unsupported output type: {output.output_type}]
            </div>
        );
    };

// --- Main Render ---
return (
  <div className="notebook-viewer w-full">
      {/* Controls Section - No changes needed here */}
      <div className="controls mb-4 flex flex-wrap justify-between items-center bg-[#1a1a2e] p-3 rounded-t-xl border border-purple-500/10">
          <div className="flex items-center">
              <button
                  onClick={() => setShowCode(!showCode)}
                  className={`px-3 py-1 text-sm rounded-md flex items-center mr-2 transition-colors ${
                      showCode
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-purple-600/30 text-purple-300 hover:bg-purple-600/50'
                  }`}
              >
                  <FaCode className="mr-1.5" />
                  {showCode ? 'Hide Code' : 'Show Code'}
              </button>
          </div>
           <a
               href={notebookUrl}
               download
               title="Download Raw Notebook (.ipynb)"
               className="px-3 py-1 bg-purple-600/50 hover:bg-purple-600 text-white rounded-md flex items-center transition-colors text-sm"
           >
               <FaDownload className="mr-1.5" /> Download
           </a>
      </div>

      {/* Main Notebook Content Area */}
      <div
          // REMOVED: overflow-hidden from this div
          className="bg-[#1a1a2e]/80 backdrop-blur-md rounded-b-xl border border-purple-500/10 w-full"
      >
           {/* Content container - REMOVED max-h, overflow-y, and style */}
           <div className="notebook-contents p-2 sm:p-4">

              {/* Notebook metadata */}
              {notebookData.metadata && notebookData.metadata.kernelspec && (
                  <div className="text-xs sm:text-sm text-gray-400 mb-4 px-4"> {/* Keep padding */}
                      <span className="font-bold">Kernel:</span> {notebookData.metadata.kernelspec.display_name || notebookData.metadata.kernelspec.name}
                      {notebookData.metadata.language_info && (
                          <span className="ml-2">({notebookData.metadata.language_info.name}, v{notebookData.metadata.language_info.version})</span>
                      )}
                  </div>
              )}

              {/* Render all cells */}
              {notebookData.cells.map((cell, index) => renderCell(cell, index))}
          </div> {/* End notebook-contents */}
      </div> {/* End main content wrapper */}
  </div> // End notebook-viewer
);
};

export default NotebookViewer;