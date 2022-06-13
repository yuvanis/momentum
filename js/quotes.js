const quotes = [
  {
    "text": "In the End, we will remember not the words of our enemies, but the silence of our friends.",
    "author": "Martin Luther King"
  },
  {
    "text": "When you do something noble and beautiful and nobody noticed, do not be sad. For the sun every morning is a beautiful spectacle and yet most of the audience still sleeps.",
    "author": "John Lennon"
  },
  {
    "text": "The weak can never forgive. Forgiveness is the attribute of the strong.",
    "author": "Mahatma Gandhi"
  },
  {
    "text": "Wise men speak because they have something to say; fools because they have to say something.",
    "author": "Platon"
  },
  {
    "text": "Chop your own wood and it will warm you twice.",
    "author": "Henry Ford"
  },
  {
    "text": "I don’t care what you think about me. I don’t think about you at al.",
    "author": "Coco Chanel"
  },
  {
    "text": "Work hard to get what you like, otherwise you'll be forced to just like what you get.",
    "author": "Bernard Show"
  },
  {
    "text": "Success is the ability to go from failure to failure without losing your enthusiasm.",
    "author": "Winston Churchill"
  },
  {
    "text": "There is no such thing as an accident. What we call by that name is the effect of some cause which we do not see.",
    "author": "Voltaire"
  },
  {
    "text": "The biggest risk is not taking any risk. In a world that's changing really quickly, the only strategy that is guaranteed to fail is not taking risks.",
    "author": "Mark Zuckerberg"
  },
];

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {
  let random = quotes[Math.floor(Math.random() * quotes.length)];
  quote.innerText = `“${random.text}”`;
  author.innerText = random.author;
}

getQuotes();

changeQuote.addEventListener('click', getQuotes);