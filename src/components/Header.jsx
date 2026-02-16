import React from 'react';
import CopyButton from './CopyButton';

/**
 * Header Component
 * Top navigation bar with title and action buttons
 */
const Header = ({ 
  leftCode, 
  rightCode, 
  showDiff, 
  onSwap, 
  onReset, 
  onToggleDiff 
}) => {
  const hasCode = leftCode.trim() !== '' || rightCode.trim() !== '';
  const canCompare = leftCode.trim() !== '' && rightCode.trim() !== '';

  return (
    <div className="bg-black border-b border-gray-800">
      <div className="max-w-[1900px] mx-auto px-8 py-4 flex items-center justify-between">
        {/* Left - Title */}
        <div className="flex items-center gap-3">
          <span className="text-2xl text-blue-400">⚡</span>
          <h1 className="text-2xl font-bold text-white">GitDiff</h1>
          <span className="text-xs text-gray-500 px-2 py-1 bg-gray-800 rounded">
            Production v1.0
          </span>
        </div>

        {/* Right - Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Copy Diff Button - Only visible in diff view */}
          {showDiff && (
            <CopyButton 
              leftCode={leftCode} 
              rightCode={rightCode} 
              disabled={!canCompare}
            />
          )}

          {/* Swap Button */}
          <button 
            onClick={onSwap}
            disabled={!hasCode}
            className={`
              flex items-center gap-2 px-5 py-2.5 text-sm rounded border transition-colors
              ${hasCode 
                ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' 
                : 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed'
              }
            `}
            title={hasCode ? 'Swap left and right panels' : 'No code to swap'}
          >
            ⇄ Swap
          </button>

          {/* Reset Button */}
          <button 
            onClick={onReset}
            disabled={!hasCode}
            className={`
              flex items-center gap-2 px-5 py-2.5 text-sm rounded border transition-colors
              ${hasCode 
                ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' 
                : 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed'
              }
            `}
            title={hasCode ? 'Clear all code' : 'Nothing to reset'}
          >
            ↻ Reset
          </button>

          {/* Compare / Edit Mode Toggle Button */}
          <button 
            onClick={onToggleDiff}
            disabled={!canCompare}
            className={`
              flex items-center gap-2 px-6 py-2.5 text-sm rounded font-semibold transition-all
              ${canCompare
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'
                : 'bg-blue-800 text-blue-300 cursor-not-allowed'
              }
            `}
            title={canCompare ? (showDiff ? 'Back to edit mode' : 'Compare code') : 'Paste code in both panels'}
          >
            {showDiff ? '✏️ Edit Mode' : '🔍 Compare'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;