import React, { useState } from 'react';
import { Editor, DiffEditor } from '@monaco-editor/react';
import { GitCompare, RotateCcw, ArrowLeftRight, Download } from 'lucide-react';
import { downloadDiffAsHTML } from './utils/downloadUtils';

function App() {
  const [leftCode, setLeftCode] = useState('');
  const [rightCode, setRightCode] = useState('');
  const [showDiff, setShowDiff] = useState(false);

  const editorOptions = {
    fontSize: 14,
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    padding: { top: 16 },
    fontFamily: "'Consolas', 'Monaco', monospace",
  };

  const swapCode = () => {
    const temp = leftCode;
    setLeftCode(rightCode);
    setRightCode(temp);
  };

  const resetCode = () => {
    setLeftCode('');
    setRightCode('');
    setShowDiff(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#1a2845]">
      {/* Black Top Bar */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-[1900px] mx-auto px-8 py-4 flex items-center justify-between">
          {/* Left - Title */}
          <div className="flex items-center gap-3">
            <GitCompare size={26} className="text-blue-400" />
            <h1 className="text-2xl font-bold text-white">GitDiff</h1>
          </div>

          {/* Right - Buttons */}
          <div className="flex items-center gap-3">
            {/* Download Button - Only shows in diff view */}
            {showDiff && (
              <button 
                onClick={() => downloadDiffAsHTML(leftCode, rightCode)}
                className="flex items-center gap-2 px-5 py-2.5 text-sm bg-gray-800 hover:bg-gray-700 transition-colors rounded text-white border border-gray-700"
              >
                <Download size={16} />
                Download
              </button>
            )}

            <button 
              onClick={swapCode}
              className="flex items-center gap-2 px-5 py-2.5 text-sm bg-gray-800 hover:bg-gray-700 transition-colors rounded text-white border border-gray-700"
            >
              <ArrowLeftRight size={16} />
              Swap
            </button>
            <button 
              onClick={resetCode}
              className="flex items-center gap-2 px-5 py-2.5 text-sm bg-gray-800 hover:bg-gray-700 transition-colors rounded text-white border border-gray-700"
            >
              <RotateCcw size={16} />
              Reset
            </button>
            <button 
              onClick={() => setShowDiff(!showDiff)}
              className="flex items-center gap-2 px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-500 transition-colors rounded text-white font-semibold shadow-lg"
            >
              <GitCompare size={16} />
              {showDiff ? 'Edit Mode' : 'Compare'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1900px] mx-auto p-8">
        {!showDiff ? (
          /* Side-by-Side Editors */
          <div className="grid grid-cols-2 gap-6">
            {/* Left Box - Original */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-sm font-semibold text-white">Original text</h2>
                <button className="text-xs text-gray-400 hover:text-white transition-colors">
                  ↑ Open file
                </button>
              </div>
              <div className="h-[calc(100vh-200px)] rounded-lg overflow-hidden bg-[#d4d4d4] border-2 border-gray-600 shadow-2xl">
                <Editor
                  height="100%"
                  theme="vs"
                  defaultLanguage="javascript"
                  value={leftCode}
                  onChange={(value) => setLeftCode(value || '')}
                  options={editorOptions}
                />
              </div>
            </div>

            {/* Right Box - Changed */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-sm font-semibold text-white">Changed text</h2>
                <button className="text-xs text-gray-400 hover:text-white transition-colors">
                  ↑ Open file
                </button>
              </div>
              <div className="h-[calc(100vh-200px)] rounded-lg overflow-hidden bg-[#d4d4d4] border-2 border-gray-600 shadow-2xl">
                <Editor
                  height="100%"
                  theme="vs"
                  defaultLanguage="javascript"
                  value={rightCode}
                  onChange={(value) => setRightCode(value || '')}
                  options={editorOptions}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Diff View */
          <div className="space-y-3">
            <div className="flex items-center gap-6 px-2">
              <h2 className="text-sm font-semibold text-white">Comparison Result</h2>
              <div className="flex gap-4 text-xs font-medium">
                <span className="text-green-400">++ Additions</span>
                <span className="text-red-400">-- Deletions</span>
              </div>
            </div>
            <div className="h-[calc(100vh-200px)] rounded-lg overflow-hidden bg-[#d4d4d4] border-2 border-gray-600 shadow-2xl">
              <DiffEditor
                original={leftCode}
                modified={rightCode}
                theme="vs"
                language="javascript"
                options={{
                  ...editorOptions,
                  readOnly: true,
                  renderSideBySide: true,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;