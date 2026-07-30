function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[character]));
}

function renderFaqs() {
  const list = window.UbichatFaq?.list?.() || [];
  const container = document.querySelector('#faq-list');
  if (!container) return;

  if (!list.length) {
    container.innerHTML = '<p class="faq-empty">FAQ를 준비하고 있습니다.</p>';
    return;
  }

  container.innerHTML = list.map((faq, index) => `
    <details class="faq-item" ${index === 0 ? 'open' : ''}>
      <summary>${escapeHtml(faq.question)}</summary>
      <p>${escapeHtml(faq.answer)}</p>
    </details>
  `).join('');
}

renderFaqs();
