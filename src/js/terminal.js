(function () {
  const triggers = document.querySelectorAll('[data-terminal]');

  // Link each trigger to its dialog
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const dialogElement = document.getElementById(
        trigger.getAttribute('data-terminal')
      );

      dialogElement.showModal();

      // showModal focuses the close button, so put the cursor in the prompt instead
      dialogElement.querySelector('.terminal-input')?.focus();

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
