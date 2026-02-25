/**
 * AI utilities using Pollinations.ai GET API — free, no API key required.
 * Uses GET endpoint which works correctly for anonymous users (POST /openai was returning
 * only a deprecation notice with no actual explanation).
 */

const POLLINATIONS_BASE = 'https://text.pollinations.ai/';

const SYSTEM_PROMPT = `You are an expert code reviewer explaining git diffs. When given code blocks from a diff, explain:
1. What exactly this line/block is doing in the new version (or was doing if removed)
2. How it differs from the other version — what approach changed, what was added/removed
3. Why this change matters (different technique, optimization, refactor, bug fix, etc.)

Be concise — 3-5 sentences. Plain English, avoid unnecessary jargon.`;

// Truncate long code snippets to keep the GET request URL within browser limits (~8000 chars).
const truncate = (code) =>
  code && code.length > 500 ? code.slice(0, 500) + '\n... (truncated)' : (code || '');

/**
 * Build the user prompt depending on which panel was selected.
 * @param {string} selectedCode - The code the user highlighted
 * @param {string} counterpartCode - The corresponding code from the other panel
 * @param {number} startLine
 * @param {number} endLine
 * @param {'modified'|'original'} selectionSource - 'modified' = green/added, 'original' = red/removed
 */
export function buildUserPrompt(selectedCode, counterpartCode, startLine, endLine, selectionSource) {
  if (selectionSource === 'modified') {
    return (
      `The user selected this block from the MODIFIED (new) code at lines ${startLine}–${endLine}:\n` +
      `\`\`\`\n${truncate(selectedCode)}\n\`\`\`\n\n` +
      `The ORIGINAL code at these lines (before the change) was:\n` +
      `\`\`\`\n${truncate(counterpartCode) || '(empty — these lines did not exist in the original)'}\n\`\`\`\n\n` +
      `Explain: what is this new code doing, and how does it differ from what was there before?`
    );
  } else {
    return (
      `The user selected this block from the ORIGINAL (old) code at lines ${startLine}–${endLine}:\n` +
      `\`\`\`\n${truncate(selectedCode)}\n\`\`\`\n\n` +
      `The REPLACEMENT code (what replaced it in the new version) is:\n` +
      `\`\`\`\n${truncate(counterpartCode) || '(empty — these lines were deleted with no replacement)'}\n\`\`\`\n\n` +
      `Explain: what was this removed code doing, and how does the replacement differ?`
    );
  }
}

/**
 * Call Pollinations.ai GET API to explain a code change.
 * Returns plain text directly — no JSON parsing needed.
 * @param {string} selectedCode
 * @param {string} counterpartCode
 * @param {number} startLine
 * @param {number} endLine
 * @param {'modified'|'original'} selectionSource
 * @returns {Promise<string>} explanation
 */
export async function explainCodeChange(selectedCode, counterpartCode, startLine, endLine, selectionSource = 'modified') {
  const userPrompt = buildUserPrompt(selectedCode, counterpartCode, startLine, endLine, selectionSource);

  const url =
    POLLINATIONS_BASE +
    encodeURIComponent(userPrompt) +
    '?model=openai&temperature=0.3&system=' +
    encodeURIComponent(SYSTEM_PROMPT);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`AI service error: ${response.status} ${response.statusText}`);
  }

  const text = await response.text();

  // Safety net: strip deprecation notice if ever injected into plain-text responses.
  const noticeEnd = text.indexOf('will continue to work normally.');
  if (noticeEnd !== -1) {
    const stripped = text.slice(noticeEnd + 'will continue to work normally.'.length).trim();
    if (!stripped) throw new Error('AI service is busy. Please try again in a moment.');
    return stripped;
  }

  if (!text.trim()) throw new Error('AI service returned no content. Please try again.');

  return text.trim();
}
