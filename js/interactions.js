// ============================================================
// Quality score tooltip
// ============================================================
const qsInfoBtn = document.getElementById('qs-info-btn');
const qsTooltip = document.getElementById('qs-tooltip');

if (qsInfoBtn && qsTooltip) {
  qsInfoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = !qsTooltip.classList.contains('hidden');
    qsTooltip.classList.toggle('hidden', isOpen);
    qsInfoBtn.setAttribute('aria-expanded', String(!isOpen));
  });
  document.addEventListener('click', () => {
    qsTooltip.classList.add('hidden');
    qsInfoBtn.setAttribute('aria-expanded', 'false');
  });
}

// ============================================================
// Defect detail toggles
// ============================================================
document.querySelectorAll('.defect-detail-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const detail = document.getElementById(targetId);
    if (!detail) return;
    const isOpen = !detail.classList.contains('hidden');
    detail.classList.toggle('hidden', isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
    btn.classList.toggle('open', !isOpen);
  });
});

// ============================================================
// RA card dismiss
// ============================================================
document.querySelectorAll('.btn-dismiss[data-dismiss]').forEach(btn => {
  btn.addEventListener('click', () => {
    const cardId = btn.getAttribute('data-dismiss');
    const card = document.getElementById(cardId);
    if (card) {
      card.style.transition = 'opacity 0.2s, max-height 0.3s';
      card.style.opacity = '0';
      card.style.maxHeight = card.offsetHeight + 'px';
      requestAnimationFrame(() => {
        card.style.maxHeight = '0';
        card.style.overflow = 'hidden';
        card.style.marginBottom = '0';
        card.style.paddingTop = '0';
        card.style.paddingBottom = '0';
      });
      setTimeout(() => card.remove(), 350);
    }
  });
});

// ============================================================
// Same time last year toggle
// ============================================================
const toggleSwitch = document.getElementById('toggle-switch');
if (toggleSwitch) {
  toggleSwitch.addEventListener('click', () => {
    toggleSwitch.classList.toggle('on');
  });
}

// ============================================================
// Chart tabs (static — same chart for all tabs in prototype)
// ============================================================
document.querySelectorAll('.chart-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('chart-tab--active'));
    tab.classList.add('chart-tab--active');
    const chartTitle = document.querySelector('.chart-card__title');
    if (chartTitle) chartTitle.textContent = tab.textContent;
  });
});
