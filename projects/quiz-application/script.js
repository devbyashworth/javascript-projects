const nextBtn = document.getElementById("next-btn");
const questionElement = document.getElementById("question");
const startBtn = document.getElementById("start-btn");
const answerButtons = document.getElementById("answer-buttons");
const questionContainer = document.querySelector(".question-container");

let shuffledQuestions, currentQuestionIndex;

const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlinking Text Marking Language", correct: false },
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Creative Style Sheets", correct: false },
            { text: "Computer Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Colorful Style Sheets", correct: false },
        ]
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        answers: [
            { text: "<css>", correct: false },
            { text: "<style>", correct: true },
            { text: "<script>", correct: false },
            { text: "<link>", correct: false },
        ]
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        answers: [
            { text: "class", correct: false },
            { text: "style", correct: true },
            { text: "font", correct: false },
            { text: "styles", correct: false },
        ]
    },
    {
        question: "What is the correct CSS syntax to make all the <p> elements bold?",
        answers: [
            { text: "p {font-weight: bold;}", correct: true },
            { text: "p {text-size: bold;}", correct: false },
            { text: "p {font-style: bold;}", correct: false },
            { text: "p {text-weight: bold;}", correct: false },
        ]
    },
    {
        question: "How do you insert a comment in a CSS file?",
        answers: [
            { text: "// this is a comment", correct: false },
            { text: "' this is a comment", correct: false },
            { text: "<!-- this is a comment -->", correct: false },
            { text: "/* this is a comment */", correct: true },
        ]
    },
    {
        question: "Which property is used to change the background color?",
        answers: [
            { text: "background-color", correct: true },
            { text: "color", correct: false },
            { text: "bgcolor", correct: false },
            { text: "background", correct: false },
        ]
    },
    {
        question: "How do you add a background color for all <h1> elements?",
        answers: [
            { text: "h1.all {background-color:#FFFFFF;}", correct: false },
            { text: "all.h1 {background-color:#FFFFFF;}", correct: false },
            { text: "h1 {bgcolor:#FFFFFF;}", correct: false },
            { text: "h1 {background-color:#FFFFFF;}", correct: true },
        ]
    },
    {
        question: "Which property is used to change the font of an element?",
        answers: [
            { text: "font-style", correct: false },
            { text: "font-weight", correct: false },
            { text: "font-size", correct: false },
            { text: "font-family", correct: true },
        ]
    },
    {
        question: "How do you make the text bold?",
        answers: [
            { text: "font-style: bold;", correct: false },
            { text: "font: bold;", correct: false },
            { text: "font-weight: bold;", correct: true },
            { text: "text-weight: bold;", correct: false }
        ]
    },
    {
        question: "Which property is used to change the left margin of an element?",
        answers: [
            { text: "padding-left", correct: false },
            { text: "indent-left", correct: false },
            { text: "margin-left", correct: true },
            { text: "margin", correct: false }
        ]
    },
    {
        question: "How do you make a list not display bullet points?",
        answers: [
            { text: "text-decoration: none;", correct: false },
            { text: "list-style-type: none;", correct: true },
            { text: "list-style: no-bullet;", correct: false },
            { text: "display: none;", correct: false }
        ]
    },
    {
        question: "Which HTML element is used for the largest heading?",
        answers: [
            { text: "<heading>", correct: false },
            { text: "<h1>", correct: true },
            { text: "<head>", correct: false },
            { text: "<h6>", correct: false }
        ]
    },
    {
        question: "How can you open a link in a new tab/browser window?",
        answers: [
            { text: '<a href="url" new>', correct: false },
            { text: '<a href="url" target="_blank">', correct: true },
            { text: '<a href="url" target="new">', correct: false },
            { text: '<a href="url" open>', correct: false }
        ]
    },
    {
        question: "What does DOM stand for?",
        answers: [
            { text: "Document Oriented Model", correct: false },
            { text: "Document Object Model", correct: true },
            { text: "Data Object Model", correct: false },
            { text: "Data Oriented Model", correct: false }
        ]
    },
    {
        question: "Which HTML element is used to define important text?",
        answers: [
            { text: "<strong>", correct: true },
            { text: "<b>", correct: false },
            { text: "<important>", correct: false },
            { text: "<i>", correct: false },
        ]
    },
    {
        question: "How can you make an ordered list?",
        answers: [
            { text: "<ul>", correct: false },
            { text: "<li>", correct: false },
            { text: "<list>", correct: false },
            { text: "<ol>", correct: true },
        ]
    },
    {
        question: "Which CSS property controls the text size?",
        answers: [
            { text: "text-size", correct: false },
            { text: "font-style", correct: false },
            { text: "text-style", correct: false },
            { text: "font-size", correct: true },
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            { text: "function:myFunction()", correct: false },
            { text: "function myFunction()", correct: true },
            { text: "function = myFunction()", correct: false },
            { text: "function => myFunction()", correct: false }
        ]
    },
    {
        question: "How do you call a function named 'myFunction'?",
        answers: [
            { text: "call myFunction()", correct: false },
            { text: "call function myFunction()", correct: false },
            { text: "myFunction()", correct: true },
            { text: "Call.myFunction()", correct: false }
        ]
    },
    {
        question: "How do you write an IF statement in JavaScript?",
        answers: [
            { text: "if (i == 5)", correct: true },
            { text: "if i = 5", correct: false },
            { text: "if i == 5 then", correct: false },
            { text: "if (i = 5)", correct: false }
        ]
    },
    {
        question: "How does a FOR loop start?",
        answers: [
            { text: "for (i = 0; i < 5)", correct: false },
            { text: "for (i < 5; i++)", correct: false },
            { text: "for (i = 0; i < 5;)", correct: false },
            { text: "for (let i = 0; i < 5; i++)", correct: true },
        ]
    },
    {
        question: "How do you add a comment in JavaScript?",
        answers: [
            { text: "' This is a comment", correct: false },
            { text: "<!-- This is a comment -->", correct: false },
            { text: "// This is a comment", correct: true },
            { text: "/* This is a comment */", correct: false },
        ]
    },
    {
        question: "How do you declare a JavaScript variable?",
        answers: [
            { text: "variable x", correct: false },
            { text: "var x", correct: false },
            { text: "x var", correct: false },
            { text: "let x", correct: true },
        ]
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        answers: [
            { text: "let colors = 'red', 'green', 'blue'", correct: false },
            { text: "let colors = (1:'red', 2:'green', 3:'blue')", correct: false },
            { text: "let colors = {'red', 'green', 'blue'}", correct: false },
            { text: "let colors = ['red', 'green', 'blue']", correct: true },
        ]
    },
    {
        question: "How do you round the number 7.25 to the nearest integer?",
        answers: [
            { text: "rnd(7.25)", correct: false },
            { text: "Math.rnd(7.25)", correct: false },
            { text: "round(7.25)", correct: false },
            { text: "Math.round(7.25)", correct: true },
        ]
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        answers: [
            { text: "Math.ceil(x, y)", correct: false },
            { text: "Math.high(x, y)", correct: false },
            { text: "Math.max(x, y)", correct: true },
            { text: "Math.maxNum(x, y)", correct: false },
        ]
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: [
            { text: "onchange", correct: false },
            { text: "onmouseover", correct: false },
            { text: "onclick", correct: true },
            { text: "onmouseclick", correct: false },
        ]
    },
    {
        question: "How do you declare a JavaScript variable?",
        answers: [
            { text: "x var", correct: false },
            { text: "let x", correct: true },
            { text: "variable x", correct: false },
            { text: "var x", correct: false },
        ]
    },
    {
        question: "How do you create an array in JavaScript?",
        answers: [
            { text: "let arr = {};", correct: false },
            { text: "let arr = new Array();", correct: false },
            { text: "let arr = ();", correct: false },
            { text: "let arr = [];", correct: true },
        ]
    },
    {
        question: "Which company developed JavaScript?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Google", correct: false },
            { text: "Netscape", correct: true },
            { text: "Sun Microsystems", correct: false },
        ]
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        answers: [
            { text: "<hr>", correct: false },
            { text: "<br>", correct: true },
            { text: "<break>", correct: false },
            { text: "<lb>", correct: false },
        ]
    },
    {
        question: "What is the default value of the position property?",
        answers: [
            { text: "relative", correct: false },
            { text: "absolute", correct: false },
            { text: "static", correct: true },
            { text: "fixed", correct: false },
        ]
    },
    {
        question: "Which property is used to change the text color of an element?",
        answers: [
            { text: "text-color", correct: false },
            { text: "fgcolor", correct: false },
            { text: "color", correct: true },
            { text: "font-color", correct: false },
        ]
    },
    {
        question: "How do you select an element with id 'demo'?",
        answers: [
            { text: "#demo", correct: true },
            { text: ".demo", correct: false },
            { text: "demo", correct: false },
            { text: "*demo", correct: false },
        ]
    },
    {
        question: "Which selector is used to select elements with a specific class?",
        answers: [
            { text: ".classname", correct: true },
            { text: "#classname", correct: false },
            { text: "classname", correct: false },
            { text: "*classname", correct: false }
        ]
    },
    {
        question: "How do you select all <p> elements inside a <div> element?",
        answers: [
            { text: "div p", correct: true },
            { text: "div + p", correct: false },
            { text: "div.p", correct: false },
            { text: "div > p", correct: false }
        ]
    },
    {
        question: "How do you select all <a> elements with a 'target' attribute?",
        answers: [
            { text: "a[target]", correct: true },
            { text: "a>target", correct: false },
            { text: "a.target", correct: false },
            { text: "a#target", correct: false }
        ]
    },
    {
        question: "How do you group selectors?",
        answers: [
            { text: "Separate each selector with a comma", correct: true },
            { text: "Separate each selector with a space", correct: false },
            { text: "Separate each selector with a plus sign", correct: false },
            { text: "Separate each selector with a semicolon", correct: false }
        ]
    },
    {
        question: "Which pseudo-class selects the first child element of a parent?",
        answers: [
            { text: ":first-of-type", correct: false },
            { text: ":first-child", correct: true },
            { text: ":last-child", correct: false },
            { text: ":only-child", correct: false }
        ]
    },
    {
        question: "How do you add a background image?",
        answers: [
            { text: "background: image(image.jpg);", correct: false },
            { text: "background-img: url(image.jpg);", correct: false },
            { text: "background-image: image.jpg;", correct: false },
            { text: "background-image: url(image.jpg);", correct: true },
        ]
    },
    {
        question: "How do you make a border rounded?",
        answers: [
            { text: "border-round: 10px;", correct: false },
            { text: "border-radius: 10px;", correct: true },
            { text: "border: round 10px;", correct: false },
            { text: "border-corner: 10px;", correct: false },
        ]
    },
    {
        question: "How do you display a border with a width of 1px?",
        answers: [
            { text: "border-width: 1px;", correct: false },
            { text: "border-style: solid 1px;", correct: false },
            { text: "border: 1px solid;", correct: true },
            { text: "border-size: 1px solid;", correct: false }
        ]
    },
    {
        question: "Which CSS property is used to change the spacing between lines of text?",
        answers: [
            { text: "line-height", correct: true },
            { text: "letter-spacing", correct: false },
            { text: "word-spacing", correct: false },
            { text: "text-spacing", correct: false }
        ]
    },
    {
        question: "How do you make a flex container?",
        answers: [
            { text: "flex-container: flex;", correct: false },
            { text: "display: flex;", correct: true },
            { text: "container-flex: flex;", correct: false },
            { text: "display: block;", correct: false }
        ]
    },
    {
        question: "Which CSS property aligns flex items along the main axis?",
        answers: [
            { text: "align-items", correct: false },
            { text: "align-content", correct: false },
            { text: "justify-content", correct: true },
            { text: "justify-items", correct: false }
        ]
    },
    {
        question: "How do you create a grid container?",
        answers: [
            { text: "grid-container: grid;", correct: false },
            { text: "container-grid: grid;", correct: false },
            { text: "display: block;", correct: false },
            { text: "display: grid;", correct: true },
        ]
    },
    {
        question: "Which CSS property specifies the size of columns in a grid?",
        answers: [
            { text: "grid-template-rows", correct: false },
            { text: "grid-template", correct: false },
            { text: "grid-columns", correct: false },
            { text: "grid-template-columns", correct: true },
        ]
    },
    {
        question: "Which CSS property specifies the size of rows in a grid?",
        answers: [
            { text: "grid-template", correct: false },
            { text: "grid-template-rows", correct: true },
            { text: "grid-template-columns", correct: false },
            { text: "grid-rows", correct: false }
        ]
    }
];

const startGame = () => {
    console.log("Game Started");
    startBtn.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hide");
    setNextQuestion();
}

const setNextQuestion = () => {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

const showQuestion = (question) => {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

const resetState = () => {
    clearStatusClass(document.body);
    nextBtn.classList.add("hide");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

const selectAnswer = (evt) => {
    const selectButton = evt.target;
    const correct = selectButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true; // Disable all answer buttons
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove("hide");
    } else {
        startBtn.innerText = "Restart";
        startBtn.classList.remove("hide");
    }
}

const setStatusClass = (element, correct) => {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

const clearStatusClass = (element) => {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});
