const submitButton = document.getElementById("llama-submit");
const textInput = document.getElementById("llama-input");
const loaderContainer = document.getElementById("loader-container");
const llamaAnswer = document.getElementById("llama-answer");

function submitQuestion() {
        submitButton.addEventListener("click", () => {
        llamaAnswer.style.display = "none";
        loaderContainer.style.display = "flex";
        if (answerException(textInput.value)) {
            loaderContainer.style.display = "none";
            llamaAnswer.style.display = "block";
            renderApiAnswer("Cet homme est un Dieu dans plusieurs pays, je ne peux rien dire d'autre");
            return;
        }

        fetch("/llamaai-api", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: textInput.value,
            }),
        })
        .then(response => response.json())
        .then(data => {
            loaderContainer.style.display = "none";
            llamaAnswer.style.display = "block";
            renderApiAnswer((data))
        })
        .catch(error => console.error('Frontend - fetch error:', error));
    })
}
submitQuestion();

function renderApiAnswer(data) {
    const llamaAnswer = document.getElementById("llama-answer");
    llamaAnswer.innerHTML = data;
}

function answerException(question) {
    let exception = false;
    const specialWords = "David Dielen";
    if (question.includes(specialWords)) {
        return true;
    }
}

document.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        submitButton.click();
    }
});
