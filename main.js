const deck = [];
const ranks = ['Jack', 'Queen', 'King', 'Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10];
const symbols = ['♣', '♠', '♥', '♦'];
const suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];
const main = document.querySelector('main');

const createCards = () => {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      deck.push(`${ranks[j]}` + ' of ' + `${suits[i]}`);
    }
  }
};

const shuffleCards = () => {
  let m = deck.length,
    t,
    i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = deck[m];
    deck[m] = deck[i];
    deck[i] = t;
  }

  deck.map(card => {
    renderCard(card);
  });
};

const renderCard = card => {
  let cardDiv = document.createElement('div');
  let symbolDiv = document.createElement('div');

  cardDiv.className = 'card';
  cardDiv.style.display = 'none';
  cardDiv.textContent = card[0];

  symbolDiv.className = 'symbol';

  let suitsIndex = card.indexOf(' of ') + 4;

  if (card[suitsIndex] === 'H') {
    symbolDiv.textContent = symbols[2];
    cardDiv.style.color = 'red';
    symbolDiv.style.color = 'red';
  } else if (card[suitsIndex] === 'C') {
    symbolDiv.textContent = symbols[0];
  } else if (card[suitsIndex] === 'S') {
    symbolDiv.textContent = symbols[1];
  } else if (card[suitsIndex] === 'D') {
    symbolDiv.textContent = symbols[3];
    cardDiv.style.color = 'red';
  }

  main.appendChild(cardDiv);
  cardDiv.appendChild(symbolDiv);
};

const animateCards = () => {
  let tl = gsap.timeline();
  let cardDiv = document.querySelectorAll('div.card'),
    cardCount = 0;

  const increment = () => {
    position = getMainCenter();
    if (cardCount <= 52) {
      cardDiv[cardCount].style.display = 'flex';
      cardCount++;

      gsap.set(cardDiv[cardCount], {
        y: -main.offsetHeight,
        x: main.offsetWidth / 2,
        zIndex: cardCount,
      });
      let offsetX = main.offsetWidth * 0.5,
        offsetY = main.offsetHeight * 0.5;
      tl.addLabel('start')
        .to(
          cardDiv[cardCount],
          {
            duration: 0.6,
            ease: Power2.easeOut,
            x: position.x + getRandom(-offsetX, offsetX),
            y: position.y + getRandom(-offsetY, offsetY),
            rotation: getRandom(720),
          },
          'start'
        )
        .to(
          cardDiv[cardCount],
          {
            duration: 0.2,
            ease: Power2.easeOut,
            onComplete: increment,
          },
          'start'
        );
    }
  };

  increment();
};

const getRandom = (min, max = null) => {
  let realMax = max === null ? min * 2 : max;
  return min + Math.random() * (realMax - min);
};

const getMainCenter = () => {
  return {
    x: (main.offsetLeft + main.offsetWidth / 2 - 100 / 2) / 2.55,
    y: (main.offsetTop + main.offsetHeight / 2 - 150 / 2) / 2,
  };
};

setTimeout(animateCards, 2000);
document.addEventListener(`DOMContentLoaded`, createCards(), shuffleCards());
