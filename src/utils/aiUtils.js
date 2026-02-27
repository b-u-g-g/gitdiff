

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const GEMINI_MODEL = 'gemini-2.0-flash';

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

async function callGroq(prompt) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      'VITE_GROQ_API_KEY is not set. Create a .env.local file with VITE_GROQ_API_KEY=your_key.'
    );
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
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
  if (!raw) throw new Error('Groq returned no content. Please try again.');

  return stripThinkTags(raw);
}

async function callGemini(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 512, temperature: 0.3 },
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const msg = data?.error?.message || `Gemini error: ${response.status}`;
    throw new Error(msg);
  }

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini returned no content. Please try again.');

  return text.trim();
}

/**
 * Explain a code change using the selected AI provider.
 *
 * @param {string} selectedCode
 * @param {string} _counterpartCode - unused
 * @param {number} _startLine - unused
 * @param {number} _endLine - unused
 * @param {'modified'|'original'} selectionSource
 * @param {'groq'|'gemini'} provider
 * @param {string|null} geminiKey - required when provider is 'gemini'
 * @returns {Promise<{ explanation: string }>}
 */
export async function explainCodeChange(
  selectedCode,
  _counterpartCode,
  _startLine,
  _endLine,
  selectionSource = 'modified',
  provider = 'groq',
  geminiKey = null
) {
  const changeType = selectionSource === 'modified' ? 'added' : 'removed';
  const prompt = buildPrompt(truncate(selectedCode), changeType);

  let explanation;
  if (provider === 'gemini') {
    if (!geminiKey) throw new Error('No Gemini API key provided.');
    explanation = await callGemini(prompt, geminiKey);
  } else {
    explanation = await callGroq(prompt);
  }

  if (!explanation) throw new Error('No explanation returned. Please try again.');
  return { explanation };
}
