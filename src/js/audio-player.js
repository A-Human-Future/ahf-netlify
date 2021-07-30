(function () {
  const player = document.querySelector('[data-audio-player="player"]');
  const trigger = document.querySelector('[data-audio-player="trigger"]');
  const label = document.querySelector('[data-audio-player="label"]');
  const parent = document.querySelector('[data-audio-player="parent"]');

  // It's hidden by default so it's not confusing when JS fails to load
  parent.removeAttribute('hidden');

  const state = {
    audio: 'paused'
  };

  // A shared handler for setting play and paused state
  const setState = value => {
    switch (value) {
      case 'playing':
        label.innerText = 'Audio on';
        state.audio = 'playing';
        parent.setAttribute('data-audio-state', 'playing');
        break;
      case 'paused':
        label.innerText = 'Audio off';
        state.audio = 'paused';
        parent.setAttribute('data-audio-state', 'paused');
        break;
    }
  };

  // Change state on button click
  trigger.addEventListener('click', () => {
    switch (state.audio) {
      case 'paused':
        player.play();
        setState('playing');
        break;
      case 'playing':
        player.pause();
        setState('paused');
        break;
    }

    localStorage.setItem('audio-player-state', state.audio);
  });

  // Attempt to load state out of local storage
  const savedState = localStorage.getItem('audio-player-state');

  if (savedState) {
    // Set the saved state if there is some to work with
    setState(savedState);

    // If the saved state is playing, set the autoplay attribute because
    // you can't run .play() before a user interacts with the DOM
    if (state.audio === 'playing') {
      player.setAttribute('autoplay', 'true');
    }
  }
})();
