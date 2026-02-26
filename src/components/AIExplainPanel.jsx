import React from 'react';
import { Sparkles, X, Loader2, AlertCircle } from 'lucide-react';

/**
 * AIExplainPanel — fixed bottom drawer for AI code change explanations.
 */
const AIExplainPanel = ({
  isOpen,
  selectedCode,
  onExplain,
  explanation,
  isGenerating,
  error,
  onClose,
}) => {
  if (!isOpen) return null;

  const hasSelection = selectedCode && selectedCode.trim().length > 0;
  const canExplain = hasSelection && !isGenerating;

  const codeLines = selectedCode ? selectedCode.split('\n') : [];
  const truncatedCode = codeLines.slice(0, 12).join('\n');
  const isTruncated = codeLines.length > 12;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d1b2e] border-t-2 border-purple-500/60 shadow-2xl"
      style={{ height: '320px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-700/60">
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-purple-400" />
          <span className="text-sm font-semibold text-white">AI Explain</span>
          <span className="text-xs text-gray-500 ml-1">
            {hasSelection ? 'Lines selected' : 'Select code above'}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-gray-700"
          title="Close AI panel"
        >
          <X size={15} />
        </button>
      </div>

      {/* Body — two columns */}
      <div className="flex" style={{ height: 'calc(320px - 49px - 32px)' }}>

        {/* Left: selected code preview */}
        <div className="w-1/2 border-r border-gray-700/50 p-4 flex flex-col gap-2 min-w-0">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex-shrink-0">
            Selected Code
          </span>
          {hasSelection ? (
            <div className="flex-1 overflow-auto">
              <pre className="text-xs text-gray-300 font-mono leading-relaxed bg-black/40 rounded p-3 overflow-auto h-full whitespace-pre-wrap break-words">
                {truncatedCode}
                {isTruncated && (
                  <span className="text-gray-500 italic block mt-1">
                    … ({codeLines.length} lines total)
                  </span>
                )}
              </pre>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xs text-gray-500 text-center leading-relaxed max-w-[200px]">
                Click and drag to select lines in the diff editor above, then click Explain.
              </p>
            </div>
          )}
        </div>

        {/* Right: explanation area */}
        <div className="w-1/2 p-4 flex flex-col gap-3 min-w-0">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Explanation
          </span>

          {/* No selection */}
          {!hasSelection && !isGenerating && !explanation && !error && (
            <p className="text-xs text-gray-500 leading-relaxed">
              Select a block of code in the diff editor, then click "Explain this change" to understand what changed and why.
            </p>
          )}

          {/* Explain button */}
          {canExplain && !explanation && !error && (
            <button
              onClick={onExplain}
              className="flex items-center gap-2 px-4 py-2.5 text-sm bg-purple-700 hover:bg-purple-600 transition-colors rounded text-white font-semibold w-fit"
            >
              <Sparkles size={14} />
              Explain this change
            </button>
          )}

          {/* Generating */}
          {isGenerating && (
            <div className="flex items-center gap-2 text-sm text-purple-300">
              <Loader2 size={16} className="animate-spin flex-shrink-0" />
              Analyzing code changes...
            </div>
          )}

          {/* Explanation */}
          {explanation && !isGenerating && (
            <div className="flex-1 overflow-auto flex flex-col gap-3">
              <p className="text-sm text-gray-200 leading-relaxed">{explanation}</p>
              {hasSelection && (
                <button
                  onClick={onExplain}
                  className="text-xs text-purple-400 hover:text-purple-300 underline w-fit"
                >
                  Re-explain
                </button>
              )}
            </div>
          )}

          {/* Error */}
          {error && !isGenerating && (
            <div className="flex items-start gap-2 text-sm text-red-300">
              <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-xs">Failed to get explanation</p>
                <p className="text-xs text-red-400 mt-0.5">{error}</p>
                {hasSelection && (
                  <button
                    onClick={onExplain}
                    className="mt-2 text-xs text-purple-400 hover:text-purple-300 underline"
                  >
                    Try again
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-2 border-t border-gray-800/60">
        <p className="text-xs text-gray-600">
          Powered by DeepSeek-R1 · Groq · Free
        </p>
      </div>
    </div>
  );
};

export default AIExplainPanel;
