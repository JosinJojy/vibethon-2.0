const REVEAL_EVENT = 'vibethon-reveal';

export function announceReveal() {
  document.documentElement.dataset.revealed = 'true';
  window.dispatchEvent(new Event(REVEAL_EVENT));
}

export function onReveal(callback: () => void) {
  if (document.documentElement.dataset.revealed === 'true') {
    callback();
    return;
  }
  window.addEventListener(REVEAL_EVENT, callback, { once: true });
  return () => window.removeEventListener(REVEAL_EVENT, callback);
}
