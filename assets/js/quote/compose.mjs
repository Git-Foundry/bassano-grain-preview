export const recipient = 'sales@bassanograin.com';
const limit = 1800;

export function compose(subject, body) {
  const cleanSubject = subject.replace(/[\r\n]+/g, ' ').toWellFormed();
  const cleanBody = body.replace(/\r\n|\r|\n/g, '\r\n').toWellFormed();
  const link = (title, content) => 'mailto:' + recipient + '?subject=' +
    encodeURIComponent(title) + '&body=' + encodeURIComponent(content);
  const full = link(cleanSubject, cleanBody);
  if (full.length <= limit) return { url: full, fullText: cleanBody, compact: false };
  const title = Array.from(cleanSubject).slice(0, 50).join('');
  return {
    fullText: cleanBody,
    compact: true,
    copiedUrl: link(title, '[truncated — full text copied to clipboard]\r\nPaste the complete enquiry here before sending.'),
    url: link(title, '[truncated — copy full text below]\r\nPaste the complete enquiry from the website before sending.')
  };
}
