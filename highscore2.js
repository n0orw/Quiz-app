const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion ={}
let acceptingAnswers =true;
let score = 0
let questionCounter  = 0
let availableQuestions = []
let questions = [
    {
        question: 'What will `console.log([] + {})` output?',
        choice1: '"[object Object]"',
        choice2: '""',
        choice3: 'undefined',
        choice4: 'Error',
        answer: 1,
      },
      {
        question: 'Which of these statements about JavaScript closures is TRUE?',
        choice1: 'A closure is created when a function is executed.',
        choice2: 'A closure gives a function access to variables from its outer scope even after the outer function has finished executing.',
        choice3: 'Closures are only created with arrow functions.',
        choice4: 'Closures cannot be used inside loops.',
        answer: 2,
      },
      {
        question: 'What will `console.log(0.1 + 0.2 === 0.3)` output?',
        choice1: 'true',
        choice2: 'false',
        choice3: 'undefined',
        choice4: 'Error',
        answer: 2,
      },
      {
        question: 'What will `typeof NaN` return?',
        choice1: '"undefined"',
        choice2: '"NaN"',
        choice3: '"number"',
        choice4: '"object"',
        answer: 3,
      },
      {
        question: 'Which of the following is a way to deep clone an object in JavaScript?',
        choice1: 'Using Object.assign({}, obj)',
        choice2: 'Using JSON.parse(JSON.stringify(obj))',
        choice3: 'Using obj.clone()',
        choice4: 'Using obj.deepCopy()',
        answer: 2,
      },
      {
        question: 'What will `console.log([] == ![])` output?',
        choice1: 'true',
        choice2: 'false',
        choice3: 'undefined',
        choice4: 'Error',
        answer: 1,
      },
      {
        question: 'Which of the following is NOT a valid way to create an object in JavaScript?',
        choice1: 'let obj = {};',
        choice2: 'let obj = new Object();',
        choice3: 'let obj = Object.create(null);',
        choice4: 'let obj = Object.prototype.create();',
        answer: 4,
      },
      {
        question: 'What will `console.log(!!"false" == !!"true")` return?',
        choice1: 'true',
        choice2: 'false',
        choice3: 'Error',
        choice4: 'undefined',
        answer: 1,
      },
      {
        question: 'Which of the following statements about `this` in JavaScript is FALSE?',
        choice1: '`this` inside an arrow function refers to the surrounding lexical scope.',
        choice2: '`this` inside a regular function depends on how the function is called.',
        choice3: 'In strict mode, `this` inside a standalone function call is `undefined`.',
        choice4: '`this` always refers to the global object in all cases.',
        answer: 4,
      },
      {
        question: 'Which of these statements about event delegation is TRUE?',
        choice1: 'Event delegation is achieved by adding event listeners to child elements individually.',
        choice2: 'Event delegation leverages event bubbling by attaching a single listener to a parent element.',
        choice3: 'Event delegation only works for `click` events.',
        choice4: 'Event delegation is not recommended for large applications due to performance concerns.',
        answer: 2,
      }
  ];
 const SCORE_POINTS = 100
 const MAX_QUESTIONS = 20
 startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestions()
 }

 getNewQuestions = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS ){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]

})
availableQuestions.splice(questionsIndex,1)
acceptingAnswers = true
 }

 choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()
        },1000)
    })
 })
 incrementScore = num =>{
    score += num
    scoreText.innerText = score
 }
 startGame()