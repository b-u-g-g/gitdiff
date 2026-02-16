/**
 * Utility functions for diff operations
 */

/**
 * Format diff output as plain text
 * @param {string} original - Original code
 * @param {string} modified - Modified code
 * @returns {string} - Formatted diff string
 */
export const formatDiffAsText = (original, modified) => {
  const originalLines = original.split('\n');
  const modifiedLines = modified.split('\n');
  
  let diffText = '=== GitDiff Comparison ===\n\n';
  diffText += `Original: ${originalLines.length} lines\n`;
  diffText += `Modified: ${modifiedLines.length} lines\n`;
  diffText += `Changes: +${Math.max(0, modifiedLines.length - originalLines.length)} / -${Math.max(0, originalLines.length - modifiedLines.length)}\n\n`;
  diffText += '--- Original\n';
  diffText += '+++ Modified\n\n';
  
  // Simple line-by-line diff (basic implementation)
  const maxLines = Math.max(originalLines.length, modifiedLines.length);
  
  for (let i = 0; i < maxLines; i++) {
    const origLine = originalLines[i] || '';
    const modLine = modifiedLines[i] || '';
    
    if (origLine === modLine) {
      diffText += `  ${i + 1} | ${origLine}\n`;
    } else {
      if (origLine) {
        diffText += `- ${i + 1} | ${origLine}\n`;
      }
      if (modLine) {
        diffText += `+ ${i + 1} | ${modLine}\n`;
      }
    }
  }
  
  return diffText;
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch (fallbackErr) {
      console.error('Failed to copy:', fallbackErr);
      return false;
    }
  }
};

/**
 * Calculate diff statistics
 * @param {string} original - Original code
 * @param {string} modified - Modified code
 * @returns {Object} - Stats object
 */
export const calculateDiffStats = (original, modified) => {
  const originalLines = original.split('\n');
  const modifiedLines = modified.split('\n');
  
  const added = Math.max(0, modifiedLines.length - originalLines.length);
  const removed = Math.max(0, originalLines.length - modifiedLines.length);
  const totalChanges = added + removed;
  
  return {
    originalLines: originalLines.length,
    modifiedLines: modifiedLines.length,
    added,
    removed,
    totalChanges
  };
};