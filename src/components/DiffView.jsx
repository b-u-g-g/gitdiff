import React from 'react';
import { DiffEditor } from '@monaco-editor/react';
import { calculateDiffStats } from '../utils/diffUtils';

/**
 * DiffView Component
 * Displays side-by-side diff comparison with statistics
 */
const DiffView = ({ 
  leftCode, 
  rightCode, 
  language = 'javascript',
  theme = 'vs' 
}) => {
  const stats = calculateDiffStats(leftCode, rightCode);

  const editorOptions = {
    fontSize: 14,
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    padding: { top: 16 },
    fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
    readOnly: true,
    renderSideBySide: true,
    lineNumbers: 'on',
    renderWhitespace: 'selection',
  };

  return (
    <div className="space-y-3">
      {/* Diff Header with Stats */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-6">
          <h2 className="text-sm font-semibold text-white">📊 Comparison Result</h2>
          <div className="flex gap-4 text-xs font-medium">
            <span className="text-green-400">
              +{stats.added} Additions
            </span>
            <span className="text-red-400">
              -{stats.removed} Deletions
            </span>
            <span className="text-gray-400">
              {stats.totalChanges} Total Changes
            </span>
          </div>
        </div>
        
        {/* Line counts */}
        <div className="flex gap-4 text-xs text-gray-400">
          <span>Original: {stats.originalLines} lines</span>
          <span>Modified: {stats.modifiedLines} lines</span>
        </div>
      </div>

      {/* Diff Editor */}
      <div className="h-[calc(100vh-200px)] rounded-lg overflow-hidden bg-[#d4d4d4] border-2 border-gray-600 shadow-2xl">
        <DiffEditor
          original={leftCode}
          modified={rightCode}
          theme={theme}
          language={language}
          options={editorOptions}
          loading={
            <div className="flex items-center justify-center h-full bg-[#d4d4d4]">
              <span className="text-gray-600 text-sm">Generating diff...</span>
            </div>
          }
        />
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 px-2 text-xs text-gray-400">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-400 rounded"></span>
          Red = Deleted from original
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-400 rounded"></span>
          Green = Added in modified
        </span>
      </div>
    </div>
  );
};

export default DiffView;