(function () {
  if (!'IntersectionObserver' in window) {
    return;
  }
  const elements = document.querySelectorAll('.fade-in');

  let observer = new IntersectionObserver(
    (changes, observer) => {
      let timeout = 0;

      changes.forEach(change => {
        if (change.intersectionRatio > 0) {
          timeout += 100;
          setTimeout(() => {
            change.target.setAttribute('data-state', 'visible');
          }, timeout);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }
  );

  elements.forEach(element => {
    element.setAttribute('data-state', 'hidden');

    observer.observe(element);
  });
})();
