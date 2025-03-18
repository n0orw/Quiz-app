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
      question: 'Which keyword is used to declare a variable in JavaScript?',
      choice1: 'var',
      choice2: 'define',
      choice3: 'letvar',
      choice4: 'constvar',
      answer: 1,
    },
    {
      question: 'Which of these is NOT a valid data type in JavaScript?',
      choice1: 'String',
      choice2: 'Boolean',
      choice3: 'Character',
      choice4: 'Undefined',
      answer: 3,
    },
    {
      question: 'How do you write a comment in JavaScript?',
      choice1: '# This is a comment',
      choice2: '// This is a comment',
      choice3: '<!-- This is a comment -->',
      choice4: '/* This is a comment */',
      answer: 2,
    },
    {
      question: 'Which method is used to output something in the console?',
      choice1: 'console.print()',
      choice2: 'log.console()',
      choice3: 'console.log()',
      choice4: 'print.console()',
      answer: 3,
    },
    {
      question: 'Which symbol is used for strict equality comparison in JavaScript?',
      choice1: '==',
      choice2: '===',
      choice3: '=',
      choice4: '!=',
      answer: 2,
    },
    {
      question: 'Which function converts a string into an integer in JavaScript?',
      choice1: 'parseInt()',
      choice2: 'int()',
      choice3: 'toInteger()',
      choice4: 'Number.parseInt()',
      answer: 1,
    },
    {
      question: 'What will `typeof null` return?',
      choice1: '"null"',
      choice2: '"object"',
      choice3: '"undefined"',
      choice4: '"string"',
      answer: 2,
    },
    {
      question: 'Which loop is best when you know the number of iterations beforehand?',
      choice1: 'while',
      choice2: 'do...while',
      choice3: 'for',
      choice4: 'foreach',
      answer: 3,
    },
    {
      question: 'Which statement is used to exit a loop prematurely?',
      choice1: 'stop',
      choice2: 'exit',
      choice3: 'break',
      choice4: 'return',
      answer: 3,
    },
    {
      question: 'Which of these is NOT a falsy value in JavaScript?',
      choice1: '0',
      choice2: 'false',
      choice3: '""',
      choice4: '"false"',
      answer: 4,
    },
    {
      question: 'What does the `map()` function do in JavaScript?',
      choice1: 'Modifies an array in place',
      choice2: 'Creates a new array by applying a function',
      choice3: 'Filters an array based on a condition',
      choice4: 'Sorts the array elements',
      answer: 2,
    },
    {
      question: 'How do you declare an arrow function?',
      choice1: 'function => () {}',
      choice2: 'const func = () => {}',
      choice3: '=> function() {}',
      choice4: 'arrow function() {}',
      answer: 2,
    },
    {
      question: 'Which method is used to remove the last element from an array?',
      choice1: 'pop()',
      choice2: 'push()',
      choice3: 'shift()',
      choice4: 'unshift()',
      answer: 1,
    },
    {
      question: 'What is the purpose of the `JSON.stringify()` method?',
      choice1: 'Parse a JSON string into an object',
      choice2: 'Convert a JavaScript object to a JSON string',
      choice3: 'Send JSON data to the console',
      choice4: 'Validate a JSON structure',
      answer: 2,
    },
    {
      question: 'What does `setTimeout()` do in JavaScript?',
      choice1: 'Runs a function after a delay',
      choice2: 'Executes a function immediately',
      choice3: 'Repeats a function at intervals',
      choice4: 'Stops the execution of code',
      answer: 1,
    },
    {
      question: 'Which keyword is used to handle exceptions in JavaScript?',
      choice1: 'catch',
      choice2: 'try',
      choice3: 'throw',
      choice4: 'finally',
      answer: 2,
    },
    {
      question: 'What will `console.log(5 + "5")` output?',
      choice1: '10',
      choice2: '55',
      choice3: 'Error',
      choice4: '"10"',
      answer: 2,
    },
    {
      question: 'What will `Boolean("false")` return?',
      choice1: 'true',
      choice2: 'false',
      choice3: 'undefined',
      choice4: 'null',
      answer: 1,
    },
    {
      question: 'Which function can be used to join all elements of an array into a string?',
      choice1: 'concat()',
      choice2: 'join()',
      choice3: 'merge()',
      choice4: 'glue()',
      answer: 2,
    },
    {
      question: 'Which built-in object is used to handle dates in JavaScript?',
      choice1: 'Calendar',
      choice2: 'Date',
      choice3: 'Time',
      choice4: 'Moment',
      answer: 2,
    },
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