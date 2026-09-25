(function () {
  function applyLinks() {
    var cards = document.querySelectorAll('#practice-areas .group');
    var applied = 0;

    cards.forEach(function (card) {
      var h3 = card.querySelector('h3');
      if (!h3) return;
      var text = h3.textContent || '';

      var href = null;
      if (text.indexOf('צוואות') !== -1) {
        href = 'article-wills.html';
      } else if (text.indexOf('נדל') !== -1) {
        href = 'article-property-inspection.html';
      }

      if (href && !card.dataset.linkedPractice) {
        card.style.cursor = 'pointer';
        card.dataset.linkedPractice = '1';
        card.addEventListener('click', function () {
          window.location.href = href;
        });
        applied++;
      }
    });

    return applied;
  }

  if (applyLinks() < 2) {
    var observer = new MutationObserver(function (_, obs) {
      if (applyLinks() >= 2) {
        obs.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { observer.disconnect(); }, 10000);
  }
})();
