const question = document.querySelector('#question');
const choices  = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const ScoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'what is 2 + 2 ?',
        choice1: '2',
        choice2: '4',
        choice3: '23',
        choice4: '25',
        answer: 2,
    },
    {
        question: 'what is 1 + 1 ?',
        choice1: '2',
        choice2: '4',
        choice3: '23',
        choice4: '25',
        answer: 1,
    },
    {
        question: 'what is 20 + 5 ?',
        choice1: '2',
        choice2: '4',
        choice3: '23',
        choice4: '25',
        answer: 4,
    },
    {
        question: 'what is 20 + 3 ?',
        choice1: '2',
        choice2: '4',
        choice3: '23',
        choice4: '25',
        answer: 3,
    },
    {
        question: 'what is 30 - 5 ?',
        choice1: '2',
        choice2: '4',
        choice3: '23',
        choice4: '25',
        answer: 4,
    },
]

const SCORE_POINT = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestions()
}

getNewQuestions = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
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
        choice.innerText =  currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToAplly = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToAplly === 'correct') {
            incrementScore(SCORE_POINT)
        }

        selectedChoice.parentElement.classList.add(classToAplly)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToAplly)
            getNewQuestions()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    ScoreText.innerText = score
}

startGame()