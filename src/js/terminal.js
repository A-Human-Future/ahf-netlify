(function () {
  const triggers = document.querySelectorAll('[data-terminal]');

  // Link each trigger to its dialog
  triggers.forEach(trigger => {
    const dialogElement = document.getElementById(trigger.getAttribute('data-terminal'));

    if (!dialogElement) {
      return;
    }

    // Wire up the close button once, rather than on every open
    dialogElement.querySelector('button').addEventListener('click', () => {
      dialogElement.close();
    });

    trigger.addEventListener('click', () => {
      dialogElement.showModal();

      // showModal focuses the close button, so put the cursor in the prompt instead
      dialogElement.querySelector('.terminal-input')?.focus();
    });
  });
})();
