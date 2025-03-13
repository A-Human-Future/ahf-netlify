let machineName = 'curious-stranger@www ~ $ ';
let terminalHistoryLog = [];
let cursorLogPosition = terminalHistoryLog.length;

/* Set some core DOM items */
let currentTerminalDiv = document.getElementsByClassName('terminal-container')[0];
let terminalContainer = document.getElementsByClassName('terminal-container')[0];
let siteContainer = document.getElementsByClassName('miniterm-container')[0];
/* These count the number of tables of a certain type present in the DOM */
let skiTableCount = 0;
let manTableCount = 0;

/* A structure of system commands used for the man pages and valid command list */
const commandData = [
  {
    name: 'ls',
    description: 'Lists the valid commands that the terminal will accept. Try some out!'
  },
  {
    name: 'whois',
    description: 'The whois utility lists general information.'
  },
  {
    name: 'skills',
    description: 'The skills utility lists skills information.'
  },
  {
    name: 'github',
    description: 'Provides a link to the source for this terminal project.'
  },
  {
    name: 'history',
    description:
      'The history utility lists all previous commands used within the current terminal session.'
  },
  {
    name: 'man',
    description:
      'The man utility is the command manual and provides a full list of system commands / descriptions.'
  },
  {
    name: 'clear',
    description:
      'The clear utility clears all previous command output and resets the terminal session.'
  },
  {
    name: 'contact',
    description: 'The contact utility provides a contact email address for AHF.'
  },
  {
    name: 'exit',
    description: 'The exit utility leaves the website.'
  }
];

const skillsData = [
  {
    name: '>> Python & Django'
  },
  {
    name: '>> ReactJS & modern UI development'
  },
  {
    name: '>> API design & build'
  },
  {
    name: '>> Full-stack web app design & build'
  },
  {
    name: '>> Software strategy & consultancy'
  },
  {
    name: '>> Requirements definition and technical specification'
  }
];

/* Content for the whois command. Designed to be a string of any length */
const whoisContent =
  '<p>A Human Future is a software design and development ' +
  'consultancy based in London, UK. We specialise in designing ' +
  'and building high-performing, highly usable software platforms and user experiences ' +
  'designed to help humans better relate to the technologies they live and work with. ' +
  'You can find us at the command line all over Europe, often at weird hours.</p>';

const githubContent =
  '<p>Miniterm is a tiny open-source project by AHF. ' +
  'Get your own, today! <a href="https://github.com/thmsrmbld/miniterm"target="_blank">' +
  'miniterm.github</a></p>';

const commandListener = () => {
  /* Main command listener - processes and runs the keyboard input */
  let userInput = document.getElementsByClassName('terminal-input')[0];
  userInput.addEventListener('keyup', function (event) {
    /* First, we handle the ArrowUp event (but only if the cursor isn't
     already at the start of the array). Then, we handle the ArrowDown
     event (only if the cursor isn't already at the end of the array). */
    if (event.key === 'ArrowUp' && cursorLogPosition > 1) {
      cursorLogPosition -= 1;
      userInput.value = terminalHistoryLog.slice(cursorLogPosition - 1)[0];
    }
    if (event.key === 'ArrowDown' && cursorLogPosition < terminalHistoryLog.length) {
      cursorLogPosition += 1;
      userInput.value = terminalHistoryLog.slice(cursorLogPosition - 1)[0];
    } else if (event.key === 'Enter') {
    /* Otherwise, we handle the keyboard Enter event */
      event.preventDefault();
      /* We need to transform the input for processing, but also
       want to store the raw data for later use */
      let rawInput = userInput.value;
      let cleanedInput = userInput.value.toLowerCase();

      /* We only store non-blanks */
      if (rawInput !== '') {
        terminalHistoryLog.push(rawInput);
        cursorLogPosition = terminalHistoryLog.length + 1;
      }
      /* Before processing input, write to the previous line on the screen */
      setPrevLine(rawInput);

      /* This is the main switch statement takes the cleaned input and
       decides which command to fire */
      switch (cleanedInput) {
        case '':
          /* Do nothing */
          break;
        case 'cd':
          cdPrinter();
          break;
        case 'clear':
          clearTerminal();
          break;
        case 'contact':
          contactPrinter();
          break;
        case 'exit':
          window.open('https://www.google.com/search?q=learn+to+code+for+free');
          break;
        case 'miniterm':
        case 'github':
          githubPrinter();
          break;
        case 'history':
          historyPrinter(terminalHistoryLog);
          break;
        case 'ls':
        case 'help':
          commandPrinter(commandData);
          break;
        case 'man':
          manPrinter(commandData);
          break;
        case 'skills':
          skillsPrinter(skillsData);
          break;
        case 'whois':
          whoisPrinter();
          break;
        default:
          /* Otherwise, the command doesn't exist */
          commandNotFoundPrinter(cleanedInput);
      }

      /* Finally, force a reset and re-focus of terminal input field */
      userInput.value = '';
      userInput.focus();
      terminalContainer.scrollIntoView(true);
    }
  });
};

const setPrevLine = rawInput => {
  /* Get the relevant DOM objects, and set the content of the previous
   terminal line */
  let previousLineDiv = document.createElement('div');
  previousLineDiv.innerHTML = machineName + rawInput;
  previousLineDiv.setAttribute('class', 'ag output-row green-hl');
  siteContainer.insertBefore(previousLineDiv, currentTerminalDiv);
};

const skillsPrinter = skillsData => {
  /* Prints a list of skills to screen */
  skiTableCount += 1;
  /* Build title */
  let skillsStart = document.createElement('div');
  skillsStart.setAttribute('class', 'ag output-row');
  siteContainer.insertBefore(skillsStart, currentTerminalDiv);
  /* Build table */
  let skillsTable = document.createElement('table');
  skillsTable.setAttribute('class', 'skTb' + skiTableCount + ' ag skTable output-row');
  siteContainer.insertBefore(skillsTable, currentTerminalDiv);
  let skTable = document.getElementsByClassName('skTb' + skiTableCount)[0];
  let tdData = Object.keys(skillsData);
  generateTable(skTable, skillsData);
};

const generateTable = (table, data) => {
  /* Generic table generator for tabular data,
  consumes a data structure and spits out a HTML table.*/
  for (let element of data) {
    let row = table.insertRow();
    for (let key in element) {
      let cell = row.insertCell();
      let textContent = document.createTextNode(element[key]);
      cell.appendChild(textContent);
    }
  }
};

const manPrinter = commandData => {
  /* Prints man-pages to screen */
  manTableCount += 1;
  /* Build title */
  let manStart = document.createElement('div');
  manStart.setAttribute('class', 'ag output-row');
  manStart.innerHTML = ' -- AHF MT Commands Manual -- ';
  siteContainer.insertBefore(manStart, currentTerminalDiv);

  /* Build table */
  let manTable = document.createElement('table');
  manTable.setAttribute('class', 'mnTb' + manTableCount + ' ag mnTable' + ' output-row');
  siteContainer.insertBefore(manTable, currentTerminalDiv);
  let mnTable = document.getElementsByClassName('mnTb' + manTableCount)[0];
  generateTable(mnTable, commandData);
  siteContainer.insertBefore(mnTable, currentTerminalDiv);
};

const whoisPrinter = () => {
  /* Prints 'whois' details to screen */
  let whoisDiv = document.createElement('p');
  whoisDiv.innerHTML = whoisContent;
  whoisDiv.setAttribute('class', 'ag output-row');
  siteContainer.insertBefore(whoisDiv, currentTerminalDiv);
};

const githubPrinter = () => {
  /* Prints 'whois' details to screen */
  let githubDiv = document.createElement('p');
  githubDiv.innerHTML = githubContent;
  githubDiv.setAttribute('class', 'ag output-row');
  siteContainer.insertBefore(githubDiv, currentTerminalDiv);
};

const cdPrinter = () => {
  /* Prints 'cd' easter egg to screen */
  let cdDiv = document.createElement('p');
  cdDiv.innerHTML = "...cd? Where ya gonna change to, kid? This ain't a REAL machine...";
  cdDiv.setAttribute('class', 'ag output-row');
  siteContainer.insertBefore(cdDiv, currentTerminalDiv);
};

const commandPrinter = commandData => {
  /* Builds a string of available commands and outputs to terminal */
  let commandArray = [];

  commandData.forEach(command => {
    commandArray.push(command.name);
  });

  let commandString = commandArray.join(', ');
  let lsDiv = document.createElement('div');
  lsDiv.innerHTML = commandString;
  lsDiv.setAttribute('class', 'ag output-row');
  siteContainer.insertBefore(lsDiv, currentTerminalDiv);
};

const commandNotFoundPrinter = (userInput, rawInput) => {
  /* We need to create two line outputs to emulate bash (the error is an extra line */
  let commandNotFoundDiv = document.createElement('div');
  commandNotFoundDiv.innerHTML = '-bash: ' + rawInput + ': sorry, command not found.';
  commandNotFoundDiv.setAttribute('class', 'ag output-row');
  siteContainer.insertBefore(commandNotFoundDiv, currentTerminalDiv);
};

const contactPrinter = () => {
  /* Prints contact details to screen */
  let contactDiv = document.createElement('div');
  let email = 'letsbuild@ahumanfuture.co';
  contactDiv.innerHTML =
    '<a href="mailto: ' +
    email +
    '?subject=Let us build..." target="_blank">' +
    email +
    '</a>';
  contactDiv.setAttribute('class', 'ag output-row');
  siteContainer.insertBefore(contactDiv, currentTerminalDiv);
};

const historyPrinter = terminalHistoryLog => {
  /* Prints terminal history to screen */
  terminalHistoryLog.forEach((entryItem, index) => {
    let historyOutputRow = document.createElement('div');
    historyOutputRow.innerHTML = index + 1 + ' ' + entryItem;
    historyOutputRow.setAttribute('class', 'ag output-row');
    siteContainer.insertBefore(historyOutputRow, currentTerminalDiv);
  });
};

const clearTerminal = () => {
  /* All autogenerated output has the class "ag", so we just delete those */
  let agLines = document.getElementsByClassName('ag');
  while (agLines[0]) {
    agLines[0].parentNode.removeChild(agLines[0]);
  }
  /* Null the count of active tables now in the DOM, cause they're all gone */
  skiTableCount = manTableCount = 0;
};

const mockLogin = () => {
  /* Micro function for mocking the 'login' process, called on first page load timer */
  let loginTimeDiv = document.getElementsByClassName('login-time')[0];
  loginTimeDiv.innerHTML =
    '>> curious stranger, on ttys001 @ ' + new Date().toLocaleString();
};

const mockCommands = () => {
  /* Micro function for showing which commands are available, called on first page load timer */
  document.getElementsByClassName('command-list')[0].innerHTML =
    "> 'ls' lists cmds. ⬆ & ⬇ arrows cycle cmd history. Let's play.";
};

const loadUserInput = () => {
  /* Colors the terminal input element and creates the input on load */
  terminalContainer = document.getElementsByClassName('terminal-container')[0];
  terminalContainer.style.backgroundColor = 'rgba(0, 255, 0, 0.09)';
  let userInput = document.createElement('input');
  userInput.setAttribute('type', 'text');
  userInput.setAttribute('class', 'terminal-input');
  userInput.setAttribute('autofocus', 'autofocus');
  document.getElementsByClassName('machine-name')[0].innerHTML = machineName;
  terminalContainer.appendChild(userInput);
};

const initialisePage = () => {
  /* Initialises the page. We just sequentially load in the initial page
   elements. We could do this with CSS, but ...here we are) */
  mockLogin();
  mockCommands();
  loadUserInput();
  commandListener();
};

/* Just calls and runs the whole system :) */
initialisePage();
