import React from 'react';
import { Editor } from '@monaco-editor/react';

/**
 * EditorPanel Component
 * Reusable code editor panel with label
 */
const EditorPanel = ({ 
  title, 
  value, 
  onChange, 
  language = 'javascript',
  theme = 'vs',
  placeholder = '// Paste your code here...'
}) => {
  const editorOptions = {
    fontSize: 14,
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    padding: { top: 16 },
    fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
    lineNumbers: 'on',
    renderWhitespace: 'selection',
    wordWrap: 'off',
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto',
    },
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {value.split('\n').length} lines
          </span>
          <button 
            className="text-xs text-gray-400 hover:text-white transition-colors"
            title="Upload file (coming soon)"
          >
            ↑ Open file
          </button>
        </div>
      </div>

      {/* Editor Box */}
      <div className="h-[calc(100vh-200px)] rounded-lg overflow-hidden bg-[#d4d4d4] border-2 border-gray-600 shadow-2xl">
        <Editor
          height="100%"
          theme={theme}
          defaultLanguage={language}
          language={language}
          value={value}
          onChange={(newValue) => onChange(newValue || '')}
          options={editorOptions}
          loading={
            <div className="flex items-center justify-center h-full bg-[#d4d4d4]">
              <span className="text-gray-600 text-sm">Loading editor...</span>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default EditorPanel;