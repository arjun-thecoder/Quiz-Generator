document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quizForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    const quizOutput = document.getElementById('quizOutput');
    let questionCount = 0;

    addQuestionBtn.addEventListener('click', () => {
        questionCount++;
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.innerHTML = `
            <h3>Question ${questionCount}</h3>
            <input type="text" placeholder="Question Text" required>
            <select class="questionType">
                <option value="multiple">Multiple Choice</option>
                <option value="text">Text</option>
                <option value="boolean">True/False</option>
            </select>
            <div class="answersContainer"></div>
            <button type="button" class="addAnswerBtn">Add Answer</button>
        `;
        questionsContainer.appendChild(questionItem);

        const addAnswerBtn = questionItem.querySelector('.addAnswerBtn');
        const answersContainer = questionItem.querySelector('.answersContainer');
        const questionType = questionItem.querySelector('.questionType');

        addAnswerBtn.addEventListener('click', () => {
            const answerItem = document.createElement('div');
            answerItem.className = 'answer-item';
            switch (questionType.value) {
                case 'multiple':
                    answerItem.innerHTML = `<input type="text" placeholder="Answer Option" required>`;
                    break;
                case 'text':
                    answerItem.innerHTML = `<textarea placeholder="Answer Text" required></textarea>`;
                    break;
                case 'boolean':
                    answerItem.innerHTML = `
                        <select required>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    `;
                    break;
            }
            answersContainer.appendChild(answerItem);
        });

        questionType.addEventListener('change', () => {
            answersContainer.innerHTML = '';
        });
    });

    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const quizTitle = document.getElementById('quizTitle').value;
        const questions = [];
        const questionItems = document.querySelectorAll('.question-item');

        questionItems.forEach((questionItem, index) => {
            const questionText = questionItem.querySelector('input').value;
            const questionType = questionItem.querySelector('.questionType').value;
            const answersContainer = questionItem.querySelector('.answersContainer');
            const answerItems = answersContainer.querySelectorAll('.answer-item');
            const answers = [];

            answerItems.forEach((answerItem) => {
                const answerValue = answerItem.querySelector('input, textarea, select').value;
                answers.push(answerValue);
            });

            questions.push({
                questionText,
                questionType,
                answers
            });
        });

        generateQuizOutput(quizTitle, questions);
    });

    function generateQuizOutput(title, questions) {
        quizOutput.innerHTML = `<h2>${title}</h2>`;
        questions.forEach((question, index) => {
            quizOutput.innerHTML += `
                <h3>Question ${index + 1}: ${question.questionText}</h3>
                <div>${generateAnswersOutput(question.questionType, question.answers)}</div>
            `;
        });
    }

    function generateAnswersOutput(type, answers) {
        let output = '';
        switch (type) {
            case 'multiple':
                answers.forEach(answer => {
                    output += `<p><input type="radio" name="question${questionCount}"> ${answer}</p>`;
                });
                break;
            case 'text':
                output += `<p><textarea></textarea></p>`;
                break;
            case 'boolean':
                output += `
                    <p><input type="radio" name="question${questionCount}" value="true"> True</p>
                    <p><input type="radio" name="question${questionCount}" value="false"> False</p>
                `;
                break;
        }
        return output;
    }
});
