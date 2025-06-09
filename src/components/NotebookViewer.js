import { useState, useEffect } from 'react';
import { FaCode, FaDownload, FaExclamationTriangle } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
                if (!response.ok) throw new Error(`Failed to load notebook (${response.status})`);
                return response.json();
            })
            .then(data => {
                setNotebookData(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, [notebookUrl]);

    // --- Loading State ---
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-8 min-h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mb-4"></div>
                <p className="text-lg font-bold">Loading Notebook...</p>
            </div>
        );
    }

    // --- Error State ---
    if (error) {
        return (
            <div className="p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
                <FaExclamationTriangle className="text-4xl text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-black mb-2">Failed to load notebook</h3>
                <p className="text-gray-600">{error}</p>
            </div>
        );
    }

    // --- Invalid Format State ---
    if (!notebookData || !notebookData.cells || !Array.isArray(notebookData.cells)) {
        return (
            <div className="p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
                <FaExclamationTriangle className="text-4xl text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold text-black mb-2">Invalid Notebook Format</h3>
                <p className="text-gray-600">The file does not appear to be a valid Jupyter Notebook.</p>
            </div>
        );
    }

    const codeLanguage = notebookData?.metadata?.language_info?.name?.toLowerCase() || 'python';

    // Helper function to detect if content contains HTML
    const containsHTML = (content) => {
        return /<[^>]*>/g.test(content);
    };

    // --- Cell Rendering Logic ---
    const renderCell = (cell, index) => {
        const separator = index > 0 ? <hr className="my-8 border-t-2 border-dashed border-gray-300" /> : null;
        
        if (cell.cell_type === 'markdown') {
            const markdownSource = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
            
            // If the markdown contains HTML, render it as HTML with full styling support
            if (containsHTML(markdownSource)) {
                return (
                    <div key={index}>
                        {separator}
                        <div className="py-6 bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
                            <div 
                                dangerouslySetInnerHTML={{ __html: markdownSource }}
                                className="html-markdown-content"
                            />
                            <style jsx>{`
                                .html-markdown-content {
                                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                                    line-height: 1.6;
                                    color: #374151;
                                }
                                
                                /* Preserve all inline styles */
                                .html-markdown-content [style] {
                                    all: revert !important;
                                }
                                
                                /* Typography with conditional styling */
                                .html-markdown-content h1 { 
                                    font-size: 2.5rem; 
                                    font-weight: 900; 
                                    margin: 1.5rem 0; 
                                    color: black; 
                                    border-bottom: 4px solid black; 
                                    padding-bottom: 0.75rem; 
                                }
                                .html-markdown-content h2 { 
                                    font-size: 2rem; 
                                    font-weight: 800; 
                                    margin: 1.25rem 0; 
                                    color: black; 
                                    border-bottom: 2px solid #9ca3af; 
                                    padding-bottom: 0.5rem; 
                                }
                                .html-markdown-content h3 { 
                                    font-size: 1.5rem; 
                                    font-weight: 700; 
                                    margin: 1rem 0; 
                                    color: #1f2937; 
                                }
                                .html-markdown-content h4 { 
                                    font-size: 1.25rem; 
                                    font-weight: 600; 
                                    margin: 0.75rem 0; 
                                    color: #1f2937; 
                                }
                                .html-markdown-content p { 
                                    margin: 1rem 0; 
                                    font-size: 1.125rem; 
                                    line-height: 1.7; 
                                    color: #1f2937; 
                                }
                                .html-markdown-content div { 
                                    margin: 0.5rem 0; 
                                }
                                
                                /* Tables */
                                .html-markdown-content table {
                                    border-collapse: collapse;
                                    border: 2px solid #d1d5db;
                                    width: 100%;
                                    background: white;
                                    margin: 1.5rem 0;
                                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                                }
                                .html-markdown-content th {
                                    background: #f3f4f6;
                                    border: 1px solid #d1d5db;
                                    padding: 0.75rem;
                                    font-weight: bold;
                                    text-align: left;
                                    font-size: 0.95rem;
                                }
                                .html-markdown-content td {
                                    border: 1px solid #d1d5db;
                                    padding: 0.75rem;
                                    font-size: 0.9rem;
                                }
                                
                                /* Links and text formatting */
                                .html-markdown-content a { 
                                    color: #2563eb; 
                                    text-decoration: underline; 
                                    font-weight: 600; 
                                }
                                .html-markdown-content a:hover { 
                                    color: #1d4ed8; 
                                }
                                .html-markdown-content strong { 
                                    font-weight: bold; 
                                    color: black; 
                                }
                                .html-markdown-content em { 
                                    font-style: italic; 
                                    color: #4b5563; 
                                }
                                .html-markdown-content code { 
                                    background: #f3f4f6; 
                                    padding: 0.25rem 0.5rem; 
                                    border-radius: 0.25rem; 
                                    font-family: ui-monospace, monospace; 
                                    font-size: 0.875rem; 
                                    color: #dc2626; 
                                }
                                .html-markdown-content pre { 
                                    background: #f9fafb; 
                                    padding: 1rem; 
                                    border-radius: 0.5rem; 
                                    border: 1px solid #e5e7eb; 
                                    overflow-x: auto; 
                                    font-family: ui-monospace, monospace; 
                                    margin: 1rem 0; 
                                }
                                
                                /* Lists */
                                .html-markdown-content ul, .html-markdown-content ol { 
                                    margin: 1rem 0; 
                                    padding-left: 2rem; 
                                }
                                .html-markdown-content li { 
                                    margin: 0.5rem 0; 
                                    font-size: 1.125rem; 
                                    color: #1f2937; 
                                }
                                
                                /* Blockquotes */
                                .html-markdown-content blockquote {
                                    border-left: 4px solid #3b82f6;
                                    background: #eff6ff;
                                    padding: 1rem;
                                    margin: 1.5rem 0;
                                    font-style: italic;
                                    color: #1e40af;
                                }
                            `}</style>
                        </div>
                    </div>
                );
            }
            
            // Regular markdown rendering for non-HTML content
            return (
                <div key={index}>
                    {separator}
                    <div className="py-6 bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="prose prose-xl max-w-none 
                            prose-headings:text-black prose-headings:font-black prose-headings:mb-4 prose-headings:mt-6
                            prose-h1:text-4xl prose-h1:border-b-4 prose-h1:border-black prose-h1:pb-3
                            prose-h2:text-3xl prose-h2:border-b-2 prose-h2:border-gray-400 prose-h2:pb-2
                            prose-h3:text-2xl prose-h3:text-gray-800
                            prose-p:text-gray-900 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-4
                            prose-a:text-blue-600 prose-a:font-semibold prose-a:underline hover:prose-a:text-blue-800
                            prose-strong:text-black prose-strong:font-bold
                            prose-em:text-gray-700 prose-em:italic
                            prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-red-600
                            prose-ul:mb-4 prose-ol:mb-4 prose-li:text-gray-900 prose-li:mb-2
                            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:italic prose-blockquote:text-gray-800
                            prose-table:border-collapse prose-table:border-2 prose-table:border-gray-300
                            prose-th:bg-gray-100 prose-th:border prose-th:border-gray-300 prose-th:p-3 prose-th:font-bold prose-th:text-left
                            prose-td:border prose-td:border-gray-300 prose-td:p-3">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownSource}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            );
        }

        if (cell.cell_type === 'code') {
            const codeString = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
            return (
                <div key={index}>
                    {separator}
                    <div className="py-6">
                        {showCode && (
                            <div className="mb-4">
                                <p className="text-sm font-mono text-gray-600 mb-2 font-bold">In [{cell.execution_count || ' '}]:</p>
                                <div className="border-2 border-black overflow-hidden rounded-lg shadow-sm">
                                    <SyntaxHighlighter 
                                        language={codeLanguage} 
                                        style={oneLight} 
                                        customStyle={{ 
                                            margin: 0, 
                                            padding: '1.5rem', 
                                            backgroundColor: '#fafafa',
                                            fontSize: '14px',
                                            lineHeight: '1.5'
                                        }}>
                                        {codeString}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        )}
                        {cell.outputs && cell.outputs.length > 0 && (
                            <div>
                                <p className="text-sm font-mono text-gray-600 mb-2 font-bold">Out [{cell.execution_count || ' '}]:</p>
                                <div className="bg-white border-2 border-dashed border-gray-400 rounded-lg p-6 shadow-sm">
                                    {cell.outputs.map((output, i) => renderOutput(output, i))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
        return null;
    };

    const renderOutput = (output, index) => {
        if (output.output_type === 'stream' || (output.output_type === 'execute_result' && output.data && output.data['text/plain'])) {
            const text = output.text || output.data['text/plain'];
            return (
                <pre key={index} className="font-mono text-sm text-gray-800 whitespace-pre-wrap bg-gray-50 p-3 rounded border border-gray-200 mb-3 last:mb-0">
                    {Array.isArray(text) ? text.join('') : text}
                </pre>
            );
        }
        if (output.output_type === 'display_data' || output.output_type === 'execute_result') {
            if (output.data && output.data['image/png']) {
                return (
                    <div key={index} className="mb-3 last:mb-0">
                        <img 
                            src={`data:image/png;base64,${output.data['image/png']}`} 
                            alt="Notebook output" 
                            className="max-w-full h-auto mx-auto border border-gray-200 rounded shadow-sm" 
                        />
                    </div>
                );
            }
            if (output.data && output.data['text/html']) {
                const html = Array.isArray(output.data['text/html']) ? output.data['text/html'].join('') : output.data['text/html'];
                return (
                    <div key={index} className="mb-3 last:mb-0">
                        <div 
                            dangerouslySetInnerHTML={{ __html: html }}
                            className="html-output-content bg-white border border-gray-200 rounded p-4"
                        />
                        <style jsx>{`
                            .html-output-content {
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                                line-height: 1.5;
                                color: #374151;
                            }
                            
                            /* Preserve all inline styles */
                            .html-output-content [style] {
                                all: revert !important;
                            }
                            
                            /* Tables (DataFrames) */
                            .html-output-content table {
                                border-collapse: collapse;
                                border: 1px solid #d1d5db;
                                width: 100%;
                                background: white;
                                margin: 1rem 0;
                                font-size: 0.875rem;
                            }
                            .html-output-content th {
                                background: #f3f4f6;
                                border: 1px solid #d1d5db;
                                padding: 0.5rem;
                                font-weight: bold;
                                text-align: left;
                            }
                            .html-output-content td {
                                border: 1px solid #d1d5db;
                                padding: 0.5rem;
                            }
                            
                            /* Typography */
                            .html-output-content h1 { font-size: 2rem; font-weight: bold; margin: 1rem 0; color: black; }
                            .html-output-content h2 { font-size: 1.5rem; font-weight: bold; margin: 0.75rem 0; color: black; }
                            .html-output-content h3 { font-size: 1.25rem; font-weight: bold; margin: 0.5rem 0; color: black; }
                            .html-output-content p { margin: 0.5rem 0; }
                            .html-output-content div { margin: 0.25rem 0; }
                            
                            /* Links and formatting */
                            .html-output-content a { color: #2563eb; text-decoration: underline; }
                            .html-output-content a:hover { color: #1d4ed8; }
                            .html-output-content strong { font-weight: bold; color: black; }
                            .html-output-content em { font-style: italic; }
                            .html-output-content code { 
                                background: #f3f4f6; 
                                padding: 0.125rem 0.25rem; 
                                border-radius: 0.25rem; 
                                font-family: ui-monospace, monospace; 
                                font-size: 0.875rem; 
                            }
                            
                            /* DataFrame specific */
                            .html-output-content .dataframe { 
                                max-width: 100%; 
                                overflow-x: auto; 
                                display: block; 
                                white-space: nowrap; 
                            }
                        `}</style>
                    </div>
                );
            }
            if (output.data && output.data['text/plain']) {
                const text = output.data['text/plain'];
                return (
                    <pre key={index} className="font-mono text-sm text-gray-800 whitespace-pre-wrap bg-gray-50 p-3 rounded border border-gray-200 mb-3 last:mb-0">
                        {Array.isArray(text) ? text.join('') : text}
                    </pre>
                );
            }
        }
        if (output.output_type === 'error') {
            return (
                <pre key={index} className="font-mono text-sm text-red-700 whitespace-pre-wrap bg-red-50 p-3 rounded border border-red-200 mb-3 last:mb-0">
                    {output.traceback.join('\n')}
                </pre>
            );
        }
        return (
            <p key={index} className="text-sm italic text-gray-500 bg-gray-100 p-2 rounded mb-3 last:mb-0">
                [Unsupported output type: {output.output_type}]
            </p>
        );
    };

    const HardShadowButton = ({ children, onClick, className, ...props }) => (
        <a {...props} onClick={onClick} className={`group relative inline-block text-black cursor-pointer ${className}`}>
            <span className="relative z-10 block border-2 border-black bg-white px-4 py-2 text-center font-bold transition-transform duration-150 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 -translate-x-1 -translate-y-1">
                {children}
            </span>
            <span className="absolute inset-0 border-2 border-black bg-black"></span>
        </a>
    );

    return (
        <div className="w-full">
            <div className="controls mb-8 flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-4 p-4 bg-gray-100 border-2 border-black">
                <p className="font-bold text-lg text-center sm:text-left">Notebook Controls</p>
                <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-4">
                    <HardShadowButton onClick={() => setShowCode(!showCode)}>
                        <FaCode className="inline-block sm:mr-2" />
                        <span className="hidden sm:inline">{showCode ? 'Hide Code' : 'Show Code'}</span>
                    </HardShadowButton>
                    <HardShadowButton href={notebookUrl} download>
                        <FaDownload className="inline-block sm:mr-2" />
                        <span className="hidden sm:inline">Download</span>
                    </HardShadowButton>
                </div>
            </div>

            <div className="space-y-2">
                {notebookData.cells.map((cell, index) => renderCell(cell, index))}
            </div>
        </div>
    );
};

export default NotebookViewer;