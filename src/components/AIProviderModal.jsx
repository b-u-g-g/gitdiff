import React, { useState } from 'react';
import { Sparkles, Eye, EyeOff, X, Zap } from 'lucide-react';

/**
 * AIProviderModal — shown when AI Mode is activated for the first time.
 * Lets the user choose between the free Groq model or their own Gemini API key.
 */
const AIProviderModal = ({ onSelect, onClose }) => {
  const [geminiKey, setGeminiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0d1b2e] border border-gray-700/60 rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={16} className="text-purple-400" />
          <h2 className="text-base font-semibold text-white">Choose AI Provider</h2>
        </div>
        <p className="text-xs text-gray-500 mb-6">
          Select how you want to power the AI Explain feature.
        </p>

        {/* Cards */}
        <div className="flex flex-col gap-3">

          {/* Card 1 — Free / Groq */}
          <button
            onClick={() => onSelect('groq', null)}
            className="w-full text-left rounded-lg border border-gray-700/60 bg-[#111f33] hover:border-purple-500/60 hover:bg-[#151f35] transition-all p-4 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap size={13} className="text-purple-400" />
                  <span className="text-sm font-semibold text-white">Free Model</span>
                  <span className="text-[10px] bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded-full">
                    No key needed
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  qwen-2.5-coder-32b · Powered by Groq
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Fast, code-specialized, completely free for you to use.
                </p>
              </div>
              <span className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5">
                Select →
              </span>
            </div>
          </button>

          {/* Card 2 — Gemini */}
          <div className="rounded-lg border border-gray-700/60 bg-[#111f33] p-4">
            <div className="flex items-center gap-2 mb-1">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                <path d="M12 2L9.5 9.5L2 12L9.5 14.5L12 22L14.5 14.5L22 12L14.5 9.5L12 2Z" fill="#4285F4"/>
              </svg>
              <span className="text-sm font-semibold text-white">My Gemini Key</span>
              <span className="text-[10px] bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded-full">
                Your key
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Gemini 2.0 Flash · Google AI · Free tier available
            </p>

            {/* Key input */}
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="Paste your Gemini API key..."
                className="w-full bg-black/40 border border-gray-700/60 rounded px-3 py-2 pr-9 text-xs text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/60 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey(v => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showKey ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>

            <div className="flex items-center justify-between mt-3">
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 underline"
              >
                Get a free key at aistudio.google.com
              </a>
              <button
                onClick={() => geminiKey.trim() && onSelect('gemini', geminiKey.trim())}
                disabled={!geminiKey.trim()}
                className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded text-white font-semibold"
              >
                Use Gemini
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AIProviderModal;
