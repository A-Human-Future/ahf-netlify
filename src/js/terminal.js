(function () {
  const triggers = document.querySelectorAll('[data-terminal]');
  const hasSupport = typeof HTMLDialogElement !== 'undefined';

  // Get rid of everything if there's no dialog support
  if (!hasSupport) {
    triggers.forEach(trigger => {
      const dialogElement = document.getElementById(
        trigger.getAttribute('data-terminal')
      );

      dialogElement.parentNode.remove(dialogElement);
      trigger.parentNode.remove(trigger);
    });

    return;
  }

  // Link each trigger to a dialog if all good
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const dialogElement = document.getElementById(
        trigger.getAttribute('data-terminal')
      );

      dialogElement.showModal();

      dialogElement.querySelector('button').addEventListener(
        'click',
        () => {
          dialogElement.close();
        },
        {once: true}
      );
    });
  });
})();
