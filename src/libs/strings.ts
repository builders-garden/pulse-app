export function trimFromEndUntilMentionChar(text) {
  return text.replace(/[@\/][^@\/]*$/, '');
}
