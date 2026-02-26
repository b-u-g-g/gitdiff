/**
 * AI utilities — calls Groq directly from the browser.
 *
 * Setup: create a .env.local file in the project root with:
 *   VITE_GROQ_API_KEY=your_groq_key_here
 *
 * Get a free key at: console.groq.com (no credit card required)
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'deepseek-r1-distill-llama-70b';

const truncate = (code) =>
  code && code.length > 2000 ? code.slice(0, 2000) + '\n... (truncated)' : (code || '');

function buildPrompt(code, changeType) {
  if (changeType === 'added') {
    return `You are analyzing a Git diff. The following code was added.

Explain briefly:
1. What this code does
2. What new behavior or capability it adds to the system

Added code:
${code}`;
  }

  return `You are analyzing a Git diff. The following code was removed.

Explain briefly:
1. What this code was doing
2. What behavior or functionality may change after its removal

Removed code:
${code}`;
}

function stripThinkTags(text) {
  return text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
}

/**
 * Explain a code change via Groq (called directly from the browser).
 *
 * @param {string} selectedCode
 * @param {string} _counterpartCode - unused
 * @param {number} _startLine - unused
 * @param {number} _endLine - unused
 * @param {'modified'|'original'} selectionSource
 *   'modified' = green lines (added), 'original' = red lines (removed)
 * @returns {Promise<{ explanation: string }>}
 */
export async function explainCodeChange(
  selectedCode,
  _counterpartCode,
  _startLine,
  _endLine,
  selectionSource = 'modified'
) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      'VITE_GROQ_API_KEY is not set. Create a .env.local file with VITE_GROQ_API_KEY=your_key.'
    );
  }

  const changeType = selectionSource === 'modified' ? 'added' : 'removed';
  const prompt = buildPrompt(truncate(selectedCode), changeType);

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 512,
      temperature: 0.3,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error?.message || `Groq error: ${response.status}`);
  }

  const raw = data?.choices?.[0]?.message?.content;
  if (!raw) {
    throw new Error('Groq returned no content. Please try again.');
  }

  const explanation = stripThinkTags(raw);
  if (!explanation) {
    throw new Error('Model returned only reasoning with no final answer. Please try again.');
  }

  return { explanation };
}
