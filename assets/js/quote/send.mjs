import {compose, recipient} from './compose.mjs';

export async function openDraft(subject, body, panel) {
  const draft = compose(subject, body);
  const message = panel.querySelector('[role=status]');
  const retry = panel.querySelector('[data-retry]');
  const manual = panel.querySelector('textarea');
  manual.value = draft.fullText;
  panel.hidden = false;
  manual.hidden = true;
  let url = draft.url;
  if (draft.compact) {
    try {
      await navigator.clipboard.writeText(draft.fullText);
      url = draft.copiedUrl;
      message.textContent = 'Full enquiry copied. Paste it into the short email draft before sending.';
    } catch {
      manual.hidden = false;
      message.textContent = 'This enquiry is too long for an email link. Copy the full text below and paste it into the draft.';
      manual.select();
    }
  } else {
    message.textContent = 'If your email app did not open, copy your enquiry and email it to ' + recipient + '.';
  }
  retry.onclick = () => location.assign(url);
  panel.querySelector('[data-copy]').onclick = async () => {
    try {
      await navigator.clipboard.writeText(draft.fullText);
      message.textContent = 'Full enquiry copied.';
    } catch {
      manual.hidden = false;
      manual.select();
      message.textContent = 'Select and copy the full enquiry below.';
    }
  };
  location.assign(url);
}
