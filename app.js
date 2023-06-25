/*//Following the study guide step by step
const qwerty = document.getElementById('qwerty');

const phrase = document.getElementById('phrase');

const resetButton = document.querySelector('.btn__reset');

let missed = 0;

const phrases = [
    "JavaScript is a programming language",
    "HTML is a markup language",
    "CSS is a cascading style sheet",
    "NodeJS is a runtime environment",
    "React is a JS library",
    "React Native is used to develop mobile apps",
    "Sass is a sassy CSS pre processor",
    "Python is a high level programming language",
    "FrontEnd BackEnd and FullStack"
];

const getRandomPhraseAsArray = arr => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex].split('');
}

const addPhraseToDisplay = arr => {
  const ul = phrase.querySelector('ul');
  ul.innerHTML = '';

  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement('li');
    li.textContent = arr[i];
    
    arr[i] !== ' ' ? li.classList.add('letter') : li.classList.add('space');

    ul.appendChild(li);
  }
}

const checkLetter = button => {
  const letters = phrase.querySelectorAll('.letter');
  let match = null;
  
  for (let i = 0; i < letters.length; i++) {
    if (button.textContent.toLowerCase() === letters[i].textContent.toLowerCase()) {
      letters[i].classList.add('show');
      match = button.textContent;
    }
  }
  
  return match;
}

const checkWin = () => {
  const letters = phrase.querySelectorAll('.letter');
  const shownLetters = phrase.querySelectorAll('.show');
  const overlay = document.getElementById('overlay');
  const title = document.querySelector('.title');

    if (letters.length === shownLetters.length) {
        overlay.className = 'win';
        title.textContent = 'Congratulations, you won!';
        overlay.style.display = 'flex';
        resetButton.textContent = 'Play again';
    } else if (missed >= 5) {
        overlay.className = 'lose';
        title.textContent = 'Oops, you lost!';
        overlay.style.display = 'flex';
        resetButton.textContent = 'Try again';
    }
}

qwerty.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('chosen')) {
    const button = e.target;
    button.classList.add('chosen');
    button.disabled = true;
    
    const letterFound = checkLetter(button);
    
    if (letterFound === null) {
      const scoreboard = document.getElementById('scoreboard').querySelector('ol');
      const tries = scoreboard.querySelectorAll('.tries');
      const heartImg = tries[missed].querySelector('img');
      heartImg.src = 'images/lostHeart.png';
      missed++;
    }
    
    checkWin();
  }
});

const gameSwitch = () => {
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
  const buttons = qwerty.querySelectorAll('button');
  
  buttons.forEach(button => {
    button.classList.remove('chosen');
    button.disabled = false;
  });
  
  const scoreboard = document.getElementById('scoreboard').querySelector('ol');
  const tries = scoreboard.querySelectorAll('.tries');
  
  tries.forEach(tryItem => {
    const heartImg = tryItem.querySelector('img');
    heartImg.src = 'images/liveHeart.png';
  });
  
  missed = 0;
}

//Moved the reset button listner down here
resetButton.addEventListener('click', () => {
// Hides the overlay.
  document.getElementById('overlay').style.display = 'none';
  gameSwitch();
});*/

//Refactored code
const myGame = () => {
    const qwerty = document.getElementById('qwerty');
    const phrase = document.getElementById('phrase');
    const resetButton = document.querySelector('.btn__reset');
    let missed = 0;
    const phrases = [
        "JavaScript is a programming language",
        "HTML is a markup language",
        "CSS is a cascading style sheet",
        "NodeJS is a runtime environment",
        "React is a JS library",
        "React Native is used to develop mobile apps",
        "Sass is a sassy CSS pre processor",
        "Python is a high level programming language",
        "FrontEnd BackEnd and FullStack"
    ];

    const getRandomPhraseAsArray = arr => arr[Math.floor(Math.random() * arr.length)].split('');

    const addPhraseToDisplay = arr => {
    const ul = phrase.querySelector('ul');
    ul.innerHTML = '';
        arr.forEach(e => {
            const li = document.createElement('li');
            li.textContent = e;
            li.classList.add(e !== ' ' ? 'letter' : 'space');
            ul.appendChild(li);
        });
    }

    const checkLetter = btn => {
    const letters = phrase.querySelectorAll('.letter');
    let match = null;
        letters.forEach(letter => {
            if (btn.textContent.toLowerCase() === letter.textContent.toLowerCase()) {
            letter.classList.add('show');
            match = btn.textContent;
            }
        });
    return match;
    }

    const checkWin = () => {
    const letters = phrase.querySelectorAll('.letter');
    const shownLetters = phrase.querySelectorAll('.show');
    const overlay = document.getElementById('overlay');
    const title = document.querySelector('.title');
    const win = letters.length === shownLetters.length;

        if (win) {
            overlay.className = 'win';
            title.textContent = '😁 Congratulations, you won!';
            overlay.style.display = 'flex';
            resetButton.textContent = 'Play again';
            resetButton.style.cursor = 'pointer';
        } else if (missed >= 5) {
            overlay.className = 'lose';
            title.textContent = '☹ Oops, you lost!';
            overlay.style.display = 'flex';
            resetButton.textContent = 'Try again';
        }
    }

    qwerty.addEventListener('click', e => {
        if (e.target.matches('button:not(.chosen)') 
        && !phrase.classList.contains('win') 
        && !phrase.classList.contains('lose')) {
            const btn = e.target;
            btn.classList.add('chosen');
            btn.disabled = true;
            const letterFound = checkLetter(btn);
            if (letterFound === null) {
            const heartImg = document.querySelector(`#scoreboard .tries:nth-child(${missed + 1}) img`);
            heartImg.src = 'images/lostHeart.png';
            missed++;
            }
            checkWin();
        }
    });

    const gameSwitch = () => {
        const phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);
        const buttons = qwerty.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.classList.remove('chosen');
            btn.disabled = false;
        });
        document.querySelectorAll('#scoreboard .tries img').forEach(heartImg => {
            heartImg.src = 'images/liveHeart.png';
        });
        missed = 0;
    }

    resetButton.addEventListener('click', () => {    
    document.getElementById('overlay').style.display = 'none';
    gameSwitch();
    });
}
window.addEventListener('load', myGame());