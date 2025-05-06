document.getElementById('topic-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const topic = document.getElementById('topic').value;
    generateMCQ(topic);
});

function generateMCQ(topic) {
    fetch(`https://api.example.com/generate-mcq?topic=${topic}`)
        .then(response => response.json())
        .then(data => displayMCQ(data))
        .catch(error => console.error('Error fetching MCQ:', error));
}

function displayMCQ(data) {
    const mcqSection = document.getElementById('mcq-section');
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';

    data.questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<p>${index + 1}. ${question.question}</p>`;

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');

        question.options.forEach((option, optionIndex) => {
            const optionLabel = document.createElement('label');
            optionLabel.classList.add('option');
            optionLabel.innerHTML = `
                <input type="radio" name="question${index}" value="${optionIndex}" required>
                ${option}
            `;
            optionsDiv.appendChild(optionLabel);
        });

        questionDiv.appendChild(optionsDiv);
        questionsContainer.appendChild(questionDiv);
    });

    mcqSection.style.display = 'block';
}

document.getElementById('mcq-form').addEventListener('submit', function(event) {
    event.preventDefault();
    gradeMCQ();
});

function gradeMCQ() {
    const data = {
        questions: [
            { correctAnswer: 0 },
            { correctAnswer: 1 },
            { correctAnswer: 2 },
            { correctAnswer: 0 },
            { correctAnswer: 1 }
        ]
    };

    let score = 0;
    data.questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === question.correctAnswer) {
            score++;
        }
    });

    alert(`Your score is ${score} out of ${data.questions.length}`);
}
